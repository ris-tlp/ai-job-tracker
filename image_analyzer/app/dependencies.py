from typing import Generator

from fastapi import Depends
from openai import AsyncOpenAI
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import settings
from app.database import get_session
from app.repository import AnalyzedImageRepository


async def get_analyzed_image_repository(
	session: AsyncSession = Depends(get_session),
) -> AnalyzedImageRepository:
	return AnalyzedImageRepository(session)

async def get_openai_client() -> Generator[AsyncOpenAI, None, None]:
	"""
	Dependency that provides an async OpenAI client.
	The client is properly closed after the request is finished.

	Yields:
	AsyncOpenAI: An async OpenAI client instance
	"""
	client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
	try:
		yield client
	finally:
		await client.close()
