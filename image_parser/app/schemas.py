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
