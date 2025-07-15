import asyncio
import json
import logging

from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_openai import ChatOpenAI

from app.exceptions import JobAnalysisError
from app.models import AnalyzedImageDTO
from app.repository import AnalyzedImageRepository

logger = logging.getLogger("image_analyzer")

SYSTEM_PROMPT = """
You are an expert job description analyzer. Given a block of text, extract the following information as JSON:
- job_title (string)
- company_name (string, optional)
- location (string, optional): only get the City and US state and not the country.
- visa_sponsorship (string, required): one of 'available', 'not_available', or 'unavailable'.
- tech_stack (list of strings)
- soft_skills (list of strings)
- years_experience (string, optional)
If a field is not present, return null or an empty list as appropriate.

For the visa_sponsorship variable specifically, analyze the language of the job post and apply the following rules with decisions:

- If the job post **explicitly states that visa sponsorship is offered**, or says phrases like:
    - “visa sponsorship available”
    - “we sponsor H-1B”
    - “willing to sponsor”
    - “sponsorship can be provided”
  → Then set `visa_sponsorship = "available"`

- If the job post **explicitly states that visa sponsorship is not offered** or anything along the lines of it, or includes disqualifying criteria such as:
    - “we do not sponsor visas”
    - “no sponsorship available”
    - “must not require sponsorship”
    - “must be authorized to work in the U.S. without sponsorship”
    - “must work without sponsorship assistance from company”
    - “must be legally allowed to work in job location without sponsorship”
    - “a student who requires sponsorship (now or in the future) is not eligible”
    - disqualifies candidates on F1, OPT, CPT, STEM-OPT, EAD, or H1-B visas or immigration status
    - mentions **security clearance**, **U.S. citizenship**, **green card only**, **polygraph**, or **background investigation**
  → Then set `visa_sponsorship = "not_available"`
"""


OPENAI_TIMEOUT = 20
OPENAI_MAX_RETRIES = 2


def validate_input(text: str) -> None:
	if not isinstance(text, str):
		raise JobAnalysisError("Input text must be a string.")
	if not text.strip():
		raise JobAnalysisError("Input text cannot be empty.")


async def analyze_text_with_llm(
    text: str, client: ChatOpenAI, repo: AnalyzedImageRepository
) -> AnalyzedImageDTO:
    validate_input(text)
    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        ("user", "Analyze the following job description and extract the required fields in JSON:\n---\n{text}")
    ])
    parser = JsonOutputParser()
    chain = prompt | client | parser
    try:
        data = await chain.ainvoke({"text": text})
    except Exception as e:
        logger.error(f"Failed to parse LLM response: {e}")
        raise JobAnalysisError("Failed to parse LLM response.") from e

    dto = AnalyzedImageDTO.from_dict(data)
    dto = await repo.create_analyzed_image_from_dto(dto)
    print(dto)
    return dto
