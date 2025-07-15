from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session
from app.repository import JobRepository


async def get_job_repository(
	session: AsyncSession = Depends(get_session),
) -> JobRepository:
	return JobRepository(session)
