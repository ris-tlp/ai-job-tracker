from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session
from app.repository import ParsedImageRepository


async def get_parsed_image_repository(
	session: AsyncSession = Depends(get_session),
) -> ParsedImageRepository:
	return ParsedImageRepository(session)
