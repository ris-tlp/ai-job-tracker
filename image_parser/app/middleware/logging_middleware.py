"""Logging middleware for FastAPI."""
import time
from typing import Callable

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.types import ASGIApp

from app.core.config import settings

class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware for logging HTTP requests and responses."""
    
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        """Log request and response information."""
        start_time = time.time()
        
        response = await call_next(request)
        
        process_time = (time.time() - start_time) * 1000
        process_time = round(process_time, 2)
        
        log_data = {
            "method": request.method,
            "path": request.url.path,
            "status_code": response.status_code,
            "process_time": f"{process_time}ms",
            "client": request.client.host if request.client else "unknown",
        }
        
        if settings.LOG_LEVEL.lower() == "debug":
            print(f"\n{'='*50}")
            print(f"HTTP {log_data['method']} {log_data['path']}")
            print(f"Status: {log_data['status_code']}")
            print(f"Process Time: {log_data['process_time']}")
            print(f"Client: {log_data['client']}")
            print(f"{'='*50}\n")
        
        return response
