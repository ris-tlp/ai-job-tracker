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

	class Config:
		orm_mode = True
