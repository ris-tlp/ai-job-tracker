from fastapi import Depends
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session
from app.models import ParsedImageDTO


class ParsedImageRepository:
	def __init__(self, session: AsyncSession):
		self.session = session

	async def create_parsed_image(
		self, dto: ParsedImageDTO
	) -> ParsedImageDTO:
		parsed_image = dto.to_orm()
		self.session.add(parsed_image)
		await self.session.commit()
		await self.session.refresh(parsed_image)
		return parsed_image.to_dto()


