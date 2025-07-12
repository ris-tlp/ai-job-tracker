from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
	HOST: str = Field(..., description="Server host")
	PORT: int = Field(..., description="Server port")
	RELOAD: bool = Field(..., description="Enable auto-reload")
	PROJECT_NAME: str = Field(..., description="Project name")
	SERVICE_NAME: str = Field(..., description="Service name")
	VERSION: str = Field(..., description="Project version")
	API_V1_STR: str = Field(..., description="API v1 prefix")

	BACKEND_CORS_ORIGINS: str = Field(
		..., description="Comma-separated list of allowed CORS origins"
	)

	LOG_LEVEL: str = Field(..., description="Logging level")

	POSTGRES_USER: str = Field(..., description="PostgreSQL username")
	POSTGRES_PASSWORD: str = Field(..., description="PostgreSQL password")
	POSTGRES_SERVER: str = Field(..., description="PostgreSQL server host")
	POSTGRES_PORT: str = Field(..., description="PostgreSQL server port")
	POSTGRES_DB: str = Field(..., description="PostgreSQL database name")

	@property
	def database_url(self) -> str:
		return (
			f"postgresql+asyncpg://"
			f"{self.POSTGRES_USER}:"
			f"{self.POSTGRES_PASSWORD}@"
			f"{self.POSTGRES_SERVER}:"
			f"{self.POSTGRES_PORT}/"
			f"{self.POSTGRES_DB}"
		)

	model_config = SettingsConfigDict(
		env_file=[".env", ".env.db"],
		env_file_encoding="utf-8",
		case_sensitive=True,
		extra="forbid",
	)


settings = Settings()
