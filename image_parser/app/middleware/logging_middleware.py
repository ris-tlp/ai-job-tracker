"""Logging middleware for FastAPI."""
import logging
import time
from typing import Any, Dict

from fastapi import Request, Response, status
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint

from app.core.config import settings

# Configure logger
logger = logging.getLogger(__name__)
logger.setLevel(settings.LOG_LEVEL.upper())

class LoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware for logging HTTP requests and responses with error handling.
    Uses the existing uvicorn logger for consistency.
    """
    
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        """
        Process the request and log the details.
        
        Args:
            request: The incoming request
            call_next: Next middleware or endpoint handler
            
        Returns:
            Response: The response to be sent back
        """
        # Skip logging for health checks to reduce noise
        if request.url.path == f"{settings.API_V1_STR}/health":
            return await call_next(request)
            
        client_host = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("user-agent", "unknown")
        
        # Log request
        logger.info(
            f"Request: {request.method} {request.url.path} from {client_host}"
        )
        
        start_time = time.time()
        response = None
        
        try:
            # Process the request
            response = await call_next(request)
            return response
            
        except Exception as e:
            # Log the exception with traceback
            logger.error(
                f"Unhandled exception: {str(e)}",
                exc_info=True,
                extra={
                    "path": request.url.path,
                    "method": request.method,
                    "client": client_host,
                    "user_agent": user_agent,
                },
            )
            # Re-raise the exception to be handled by FastAPI's exception handlers
            raise
            
        finally:
            # Calculate processing time
            process_time = (time.time() - start_time) * 1000
            process_time = round(process_time, 2)
            
            # Only log if we have a response (might be None if exception occurred)
            if response is not None:
                # Log response with appropriate level based on status code
                log_message = (
                    f"Response: {request.method} {request.url.path} - "
                    f"{response.status_code} in {process_time}ms"
                )
                
                if response.status_code >= 500:
                    logger.error(
                        log_message,
                        extra={
                            "status_code": response.status_code,
                            "process_time_ms": process_time,
                        },
                    )
                elif response.status_code >= 400:
                    logger.warning(
                        log_message,
                        extra={
                            "status_code": response.status_code,
                            "process_time_ms": process_time,
                        },
                    )
                else:
                    logger.info(
                        log_message,
                        extra={
                            "status_code": response.status_code,
                            "process_time_ms": process_time,
                        },
                    )