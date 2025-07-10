from typing import Any, Dict, Optional

from pydantic import BaseModel, Field


class TextResponse(BaseModel):
	"""Response model for text extraction."""

	text: str
	metadata: Optional[Dict[str, Any]] = Field(
		default_factory=dict, description="Additional metadata about the OCR process"
	)


class ErrorResponse(BaseModel):
	"""Error response model."""

	error: str
	details: Optional[Dict[str, Any]] = None
	type: str
