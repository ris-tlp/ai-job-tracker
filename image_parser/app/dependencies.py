from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import ParsedImageRepository, get_session


async def get_parsed_image_repository(
	session: AsyncSession = Depends(get_session),
) -> ParsedImageRepository:
	return ParsedImageRepository(session)
