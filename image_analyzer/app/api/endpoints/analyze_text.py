import logging

from fastapi import APIRouter, Depends, HTTPException, Request
from langchain_openai import ChatOpenAI

from app.dependencies import get_analyzed_image_repository, get_langchain_openai_client
from app.exceptions import JobAnalysisError
from app.models import AnalyzedImageDTO
from app.repository import AnalyzedImageRepository
from app.schemas import TextPayload
from app.services.image_analyzer import analyze_text_with_llm

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("", response_model=AnalyzedImageDTO)
async def analyze_text(
	payload: TextPayload,
	request: Request,
	client: ChatOpenAI = Depends(get_langchain_openai_client),
	repo: AnalyzedImageRepository = Depends(get_analyzed_image_repository),
):
	try:
		return await analyze_text_with_llm(payload.text, client, repo)
	except JobAnalysisError as e:
		logger.error(f"Job analysis error: {e}")
		raise HTTPException(status_code=400, detail=str(e))
	except Exception as e:
		logger.exception("Unexpected server error")
		raise HTTPException(status_code=500, detail="Internal server error.")
