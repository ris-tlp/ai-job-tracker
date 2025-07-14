from typing import Any, Dict, Optional

from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
	detail: Any = Field(..., description="Error details, can be a string or dict.")
	type: Optional[str] = Field(
		None, description="Type of error for client-side handling."
	)


class TextResponse(BaseModel):
	text: str = Field(..., description="Extracted text from the image.")
	metadata: Dict[str, Any] = Field(
		...,
		description="Metadata about the processed image, such as filename and content_type.",
	)


class ParsedImageResponse(BaseModel):
	image_name: str
	parsed_text: str

	@classmethod
	def from_dto(cls, dto) -> "ParsedImageResponse":
		return cls(
			image_name=dto.image_name,
			parsed_text=dto.parsed_text,
		)
