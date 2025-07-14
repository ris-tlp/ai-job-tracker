from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from .models import Job, JobDTO


class JobRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_job_from_dto(self, dto: JobDTO) -> JobDTO:
        job = dto.to_orm()
        self.session.add(job)
        await self.session.commit()
        await self.session.refresh(job)
        return JobDTO.model_validate(job)

    async def get_job(self, job_id: int) -> JobDTO | None:
        result = await self.session.exec(
            select(Job).where(Job.id == job_id)
        )
        job = result.first()
        return JobDTO.model_validate(job) if job else None

    async def get_all_jobs(self) -> list[JobDTO]:
        result = await self.session.exec(select(Job))
        jobs = result.all()
        return [JobDTO.model_validate(job) for job in jobs]
