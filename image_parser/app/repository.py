from fastapi import Depends
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session
from app.models import ParsedImage, ParsedImageDTO


class ParsedImageRepository:
	def __init__(self, session: AsyncSession):
		self.session = session

	async def create_parsed_image(
		self, image_name: str, parsed_text: str
	) -> ParsedImageDTO:
		parsed_image = ParsedImage(image_name=image_name, parsed_text=parsed_text)
		self.session.add(parsed_image)
		await self.session.commit()
		await self.session.refresh(parsed_image)
		return ParsedImageDTO.from_orm(parsed_image)

