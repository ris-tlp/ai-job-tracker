from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session
from app.repository import AnalyzedImageRepository


async def get_analyzed_image_repository(
	session: AsyncSession = Depends(get_session),
) -> AnalyzedImageRepository:
	return AnalyzedImageRepository(session)

