from typing import Generator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel

from app.core.config import settings

# Create async engine
engine = create_async_engine(
	settings.database_url,
	echo=True,
	future=True,
	pool_pre_ping=True,
	pool_size=20,
	max_overflow=10,
)

# Create async session factory
async_session_factory = sessionmaker(
	bind=engine,
	class_=AsyncSession,
	expire_on_commit=False,
	autoflush=False,
)


async def get_session() -> Generator[AsyncSession, None, None]:
	"""Dependency for getting async DB session."""
	async with async_session_factory() as session:
		try:
			yield session
			await session.commit()
		except Exception:
			await session.rollback()
			raise


async def create_db_and_tables():
	"""Create all database tables."""
	async with engine.begin() as conn:
		await conn.run_sync(SQLModel.metadata.create_all)


async def init_db():
	"""Initialize database connection and create tables."""
	await create_db_and_tables()
