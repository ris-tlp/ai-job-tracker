import logging

from fastapi import APIRouter, File, HTTPException, UploadFile, status
from fastapi.responses import JSONResponse

from app.exceptions import (
	ImageProcessingError,
	OCRServiceError,
	UnsupportedImageError,
)
from app.schemas import ErrorResponse, TextResponse
from app.services.ocr import OCRService

logger = logging.getLogger(__name__)

router = APIRouter(tags=["parsed-images"])
ocr_service = OCRService()


def create_error_response(
	error: Exception, status_code: int, error_type: str, include_details: bool = False
) -> JSONResponse:
	"""Create a standardized error response.

	Args:
		error: The exception that was raised
		status_code: HTTP status code
		error_type: Type of error for client-side handling
		include_details: Whether to include error details in the response

	Returns:
		JSONResponse with error details
	"""
	error_data = {"error": str(error), "type": error_type}

	if include_details and hasattr(error, "details"):
		error_data["details"] = getattr(error, "details", {})

	return JSONResponse(status_code=status_code, content=error_data)


@router.post(
	"",
	response_model=TextResponse,
	status_code=status.HTTP_200_OK,
	summary="Extract text from an image",
	description="Extract text from an uploaded image using OCR.",
	responses={
		200: {
			"description": "Text successfully extracted from image",
			"model": TextResponse,
		},
		400: {
			"description": "Invalid request or unsupported file format",
			"model": ErrorResponse,
		},
		422: {
			"description": "Unprocessable entity - could not process the image",
			"model": ErrorResponse,
		},
		500: {"description": "Internal server error", "model": ErrorResponse},
	},
)
async def extract_text(
	file: UploadFile = File(..., description="Image file to process"),
) -> TextResponse:
	"""Extract text from an uploaded image.

	Args:
		file: The image file to process (supports common formats like PNG, JPEG, etc.)

	Returns:
		TextResponse containing the extracted text and metadata

	Raises:
		HTTPException: With appropriate status code and error details
	"""
	logger.info(f"Received request to process file: {file.filename}")

	# Check file type
	if not file.content_type or not file.content_type.startswith("image/"):
		error_msg = (
			f"Unsupported file type: {file.content_type}. Please upload an image file."
		)
		logger.warning(error_msg)
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail={
				"error": error_msg,
				"type": "unsupported_file_type",
				"received_type": file.content_type,
			},
		)

	try:
		image_data = await file.read()

		if not image_data:
			error_msg = "Uploaded file is empty"
			logger.warning(error_msg)
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail={"error": error_msg, "type": "empty_file"},
			)

		logger.debug(
			f"Processing file: filename={file.filename}, "
			f"size={len(image_data)} bytes, "
			f"content_type={file.content_type}"
		)

		try:
			text = await ocr_service.extract_text(image_data)
			logger.info("Successfully extracted text from image")

			return TextResponse(
				text=text,
				metadata={
					"filename": file.filename,
					"content_type": file.content_type,
					"content_length": len(image_data),
				},
			)

		except UnsupportedImageError as e:
			logger.warning(f"Unsupported image: {e!s}")
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail={
					"error": str(e),
					"type": "unsupported_image",
					**getattr(e, "details", {}),
				},
			)

		except ImageProcessingError as e:
			logger.error(f"Image processing error: {e!s}", exc_info=True)
			raise HTTPException(
				status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
				detail={
					"error": str(e),
					"type": "image_processing_error",
					**getattr(e, "details", {}),
				},
			)

		except OCRServiceError as e:
			logger.error(f"OCR service error: {e!s}", exc_info=True)
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail={
					"error": "An error occurred during OCR processing",
					"type": "ocr_processing_error",
					**getattr(e, "details", {}),
				},
			)

	except HTTPException:
		# Re-raise HTTP exceptions as-is
		raise

	except Exception as e:
		# For unexpected errors
		logger.critical(f"Unexpected error processing request: {e!s}", exc_info=True)
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail={
				"error": "An unexpected error occurred",
				"type": "internal_server_error",
			},
		)

	finally:
		try:
			await file.close()
			logger.debug("Closed uploaded file")
		except Exception as e:
			logger.error(f"Error closing file: {e!s}", exc_info=True)
