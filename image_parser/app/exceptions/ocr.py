from typing import Any, Dict, Optional, Union


class OCRServiceError(Exception):
	"""Base exception for OCR service errors."""

	def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
		self.message = message
		self.details = details or {}
		super().__init__(self.message)


class ImageProcessingError(OCRServiceError):
	"""Raised when there's an error processing the image."""

	pass


class UnsupportedImageError(OCRServiceError):
	"""Raised when an unsupported image format is provided."""

	pass
