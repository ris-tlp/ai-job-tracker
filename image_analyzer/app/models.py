from datetime import datetime
from typing import Optional

from sqlalchemy import func
from sqlmodel import Field, SQLModel


class AnalyzedImage(SQLModel, table=True):
	__tablename__ = "analyzed_images"

	id: Optional[int] = Field(default=None, primary_key=True)
	parsed_image_id: int
	analyzed_text: str
	created_at: datetime = Field(
		default_factory=datetime.utcnow,
		nullable=False,
		sa_column_kwargs={"server_default": func.now()},
	)
	updated_at: datetime = Field(
		default_factory=datetime.utcnow,
		nullable=False,
		sa_column_kwargs={"server_default": func.now(), "onupdate": func.now()},
	)


class AnalyzedImageDTO(SQLModel):
	id: int
	parsed_image_id: int
	analyzed_text: str
	created_at: datetime
	updated_at: datetime

	class Config:
		orm_mode = True
