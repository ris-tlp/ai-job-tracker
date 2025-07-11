"""Main FastAPI application module."""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.api import api_router
from app.core.config import settings
from app.middleware.logging_middleware import LoggingMiddleware


def create_application() -> FastAPI:
	app = FastAPI(
		title=settings.PROJECT_NAME,
		description="API for extracting text from images using OCR",
		version=settings.VERSION,
		openapi_url=f"/{settings.API_V1_STR}/openapi.json",
		docs_url="/docs",
		redoc_url="/redoc",
	)

	app.add_middleware(LoggingMiddleware)

	if settings.BACKEND_CORS_ORIGINS:
		app.add_middleware(
			CORSMiddleware,
			allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
			allow_credentials=True,
			allow_methods=["*"],
			allow_headers=["*"],
		)

	app.include_router(api_router, prefix=f"/api/{settings.API_V1_STR}")

	return app


app = create_application()


if __name__ == "__main__":
	uvicorn.run(
		"main:app",
		host=settings.HOST,
		port=settings.PORT,
		reload=settings.RELOAD,
		log_level=settings.LOG_LEVEL,
	)
