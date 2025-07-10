"""Application configuration settings."""

from typing import List, Optional

from pydantic import AnyHttpUrl, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
	"""Application settings."""

	PROJECT_NAME: str = "Image Parser API"
	SERVICE_NAME: str = "image_parser"
	VERSION: str = "0.1.0"
	API_V1_STR: str = "/api/v1"

	HOST: str = "0.0.0.0"
	PORT: int = 8000
	RELOAD: bool = True

	BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
		"http://localhost:3000",  # Default React dev server
		"http://localhost:8000",  # Default FastAPI dev server
		"http://localhost:5173",
	]

	LOG_LEVEL: str = "info"

	model_config = SettingsConfigDict(
		env_file=".env",
		env_file_encoding="utf-8",
		case_sensitive=True,
	)


settings = Settings()
