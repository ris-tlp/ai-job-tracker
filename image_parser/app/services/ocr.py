"""OCR service for extracting text from images using Tesseract."""

import io
import logging

import pytesseract
from PIL import Image, UnidentifiedImageError

from app.exceptions import (
	ImageProcessingError,
	OCRServiceError,
	UnsupportedImageError,
)

logger = logging.getLogger(__name__)


class OCRService:
	"""Service for performing OCR on images using Tesseract."""

	def __init__(self, lang: str = "eng"):
		"""
		Args:
            lang: Language code for OCR
		"""
		self.lang = lang
		self.logger = logging.getLogger(f"{__name__}.{self.__class__.__name__}")
		self.logger.info(f"Initialized OCRService with language: {self.lang}")

	async def extract_text(self, image_data: bytes) -> str:
		"""Extract text from image bytes.

		Args:
            image_data: Raw image data as bytes

		Returns:
            Extracted text as a string

		Raises:
            UnsupportedImageError: If the image format is not supported
            ImageProcessingError: If there's an error processing the image
            OCRServiceError: If there's an error during OCR processing
		"""
		self.logger.debug("Starting text extraction from image bytes")
		try:
			if not isinstance(image_data, bytes) or not image_data:
				error_msg = "Image data must be a non-empty bytes object"
				self.logger.error(error_msg)
				raise ValueError(error_msg)

			try:
				image = Image.open(io.BytesIO(image_data))
				self.logger.debug(
					f"Processing image: format={image.format}, size={image.size}, mode={image.mode}"
				)
			except UnidentifiedImageError as e:
				error_msg = "The provided file is not a valid or supported image"
				self.logger.error(f"{error_msg}: {e!s}")
				raise UnsupportedImageError(message=error_msg) from e
			except Exception as e:
				error_msg = f"Failed to load image: {e!s}"
				self.logger.error(error_msg, exc_info=True)
				raise ImageProcessingError(message=error_msg) from e

			try:
				self.logger.debug("Performing OCR on image")
				text = pytesseract.image_to_string(image, lang=self.lang)
				extracted_text = text.strip()
				self.logger.debug(
					f"Successfully extracted {len(extracted_text)} characters"
				)
				if not extracted_text:
					self.logger.warning("No text was extracted from the image")
				return extracted_text
			except Exception as e:
				error_msg = f"OCR processing failed: {e!s}"
				self.logger.error(error_msg, exc_info=True)
				raise OCRServiceError(
					message=error_msg, details={"error": str(e), "lang": self.lang}
				) from e
		except Exception as e:
			if not isinstance(e, OCRServiceError):
				error_msg = f"Unexpected error during OCR processing: {e!s}"
				self.logger.error(error_msg, exc_info=True)
				raise OCRServiceError(
					message=error_msg,
					details={"error": str(e), "type": type(e).__name__},
				) from e
			raise

	async def extract_text_and_save(
		self,
		image_data: bytes,
		image_name: str,
		repository,
	) -> "ParsedImageDTO":
		"""
		Extract text from image and save the result to the database using the repository.

		Args:
            image_data: Raw image data as bytes
            image_name: The filename of the uploaded image
            repository: The repository instance for DB operations

		Returns:
            ParsedImageDTO: The saved parsed image DTO
		"""
		text = await self.extract_text(image_data)
		return await repository.create_parsed_image(
			image_name=image_name, parsed_text=text
		)
