from datetime import datetime
from typing import Optional

from sqlalchemy import func
from sqlmodel import Field, SQLModel


class ParsedImage(SQLModel, table=True):
	__tablename__ = "parsed_images"
	id: Optional[int] = Field(default=None, primary_key=True)
	image_name: str
	parsed_text: str
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


class ParsedImageDTO(SQLModel):
	id: int
	image_name: str
	parsed_text: str
	created_at: datetime
	updated_at: datetime

	@classmethod
	def from_dict(cls, data: dict) -> "ParsedImageDTO":
		return cls(
			id=data.get("id", 0),
			image_name=data.get("image_name"),
			parsed_text=data.get("parsed_text"),
			created_at=data.get("created_at", datetime.utcnow()),
			updated_at=data.get("updated_at", datetime.utcnow()),
		)

	def to_orm(self) -> "ParsedImage":
		return ParsedImage(
			image_name=self.image_name,
			parsed_text=self.parsed_text,
		)

	class Config:
		orm_mode = True
