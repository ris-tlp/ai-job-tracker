from typing import Generator

from fastapi import Depends
from langchain_openai import ChatOpenAI
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import settings
from app.database import get_session
from app.repository import AnalyzedImageRepository


async def get_analyzed_image_repository(
	session: AsyncSession = Depends(get_session),
) -> AnalyzedImageRepository:
	return AnalyzedImageRepository(session)


def get_langchain_openai_client() -> ChatOpenAI:
	"""
	Dependency that provides a LangChain ChatOpenAI client.
	"""
	return ChatOpenAI(openai_api_key=settings.OPENAI_API_KEY, temperature=0)
