from datetime import datetime
from typing import Dict

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

from app.core.config import settings

router = APIRouter(tags=["health"])


@router.get(
	"/health",
	status_code=status.HTTP_200_OK,
	summary="Health check endpoint",
	description="Check if the service is running and healthy.",
	response_description="Service health status",
)
async def health_check() -> Dict[str, str]:
	"""
	Health check endpoint.

	Returns:
	    Dict containing the service status and timestamp
	"""
	return {
		"status": "healthy",
		"timestamp": datetime.utcnow().isoformat(),
		"service": settings.SERVICE_NAME,
	}
