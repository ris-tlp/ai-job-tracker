import asyncio
import json
import logging

from openai import AsyncOpenAI, OpenAIError

from app.exceptions import JobAnalysisError
from app.models import AnalyzedImageDTO
from app.repository import AnalyzedImageRepository
from app.schemas import AnalyzedJob

logger = logging.getLogger("image_analyzer")

SYSTEM_PROMPT = """
    You are an expert job description analyzer. Given a block of text, extract the following information as JSON:
    - job_title (string)
    - company_name (string, optional)
    - location (string, optional)
    - visa_sponsorship (string, required): one of 'available', 'not_available', or 'unavailable'. Use 'available' if sponsorship is explicitly offered, 'not_available' if explicitly denied, and 'unavailable' if not mentioned or unclear.
    - tech_stack (list of strings)
    - soft_skills (list of strings)
    - years_experience (string, optional)
    If a field is not present, return null or an empty list as appropriate.
    """

OPENAI_TIMEOUT = 20
OPENAI_MAX_RETRIES = 2


def validate_input(text: str) -> None:
	if not isinstance(text, str):
		raise JobAnalysisError("Input text must be a string.")
	if not text.strip():
		raise JobAnalysisError("Input text cannot be empty.")


async def analyze_text_with_llm(
	text: str, client: AsyncOpenAI, repo: AnalyzedImageRepository
) -> AnalyzedJob:
	validate_input(text)
	user_prompt = f"""
    Analyze the following job description and extract the required fields in JSON:
    ---
    {text}
    """

	last_exception = None
	for attempt in range(OPENAI_MAX_RETRIES + 1):
		try:
			response = await asyncio.wait_for(
				client.chat.completions.create(
					model="gpt-3.5-turbo",
					messages=[
						{"role": "system", "content": SYSTEM_PROMPT},
						{"role": "user", "content": user_prompt},
					],
					response_format={"type": "json_object"},
					max_tokens=512,
				),
				timeout=OPENAI_TIMEOUT,
			)
			content = response.choices[0].message.content
			try:
				data = json.loads(content)
				dto = AnalyzedImageDTO.from_dict(data)
				print(dto, "LMAO")
				db_obj = await repo.create_analyzed_image_from_dto(dto)
				return AnalyzedJob.from_dto(db_obj)
			except Exception as e:
				logger.error(f"Failed to parse LLM response: {content}")
				raise JobAnalysisError("Failed to parse LLM response.") from e
		except (asyncio.TimeoutError, OpenAIError) as e:
			logger.warning(f"OpenAI API call failed (attempt {attempt + 1}): {e}")
			last_exception = e
			await asyncio.sleep(1)
		except Exception as e:
			logger.exception("Unexpected error in analyze_text_with_llm")
			raise JobAnalysisError("Unexpected error during analysis.") from e
	raise JobAnalysisError(
		f"OpenAI API call failed after {OPENAI_MAX_RETRIES + 1} attempts: {last_exception}"
	)
