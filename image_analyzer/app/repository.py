from fastapi import Depends
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session
from app.models import AnalyzedImage, AnalyzedImageDTO


class AnalyzedImageRepository:
	def __init__(self, session: AsyncSession):
		self.session = session

	async def create_analyzed_image(
		self, parsed_image_id: int, analyzed_text: str
	) -> AnalyzedImageDTO:
		analyzed_image = AnalyzedImage(
			parsed_image_id=parsed_image_id, analyzed_text=analyzed_text
		)
		self.session.add(analyzed_image)
		await self.session.commit()
		await self.session.refresh(analyzed_image)
		return AnalyzedImageDTO.model_validate(analyzed_image)

	async def get_analyzed_image(
		self, analyzed_image_id: int
	) -> AnalyzedImageDTO | None:
		result = await self.session.exec(
			select(AnalyzedImage).where(AnalyzedImage.id == analyzed_image_id)
		)
		analyzed_image = result.first()
		return (
			AnalyzedImageDTO.model_validate(analyzed_image) if analyzed_image else None
		)

