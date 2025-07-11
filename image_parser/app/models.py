from typing import Optional

from sqlmodel import Field, SQLModel


class ParsedImage(SQLModel, table=True):
    __tablename__ = "parsed_images"
    id: Optional[int] = Field(default=None, primary_key=True)
    image_name: str
    parsed_text: str

class ParsedImageDTO(SQLModel):
    id: int
    image_name: str
    parsed_text: str

    class Config:
        orm_mode = True
