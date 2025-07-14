from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

from app.dependencies import get_job_repository
from app.models import JobDTO
from app.schemas import JobRequestSchema, JobResponseSchema

router = APIRouter()

@router.post("/", response_model=JobResponseSchema, status_code=status.HTTP_201_CREATED)
async def create_job(
    job_request: JobRequestSchema,
    repository = Depends(get_job_repository)
):
    job_dto = JobDTO.from_request(job_request)
    created_job = await repository.create_job_from_dto(job_dto)
    return created_job.to_response()
