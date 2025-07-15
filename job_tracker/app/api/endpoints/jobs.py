from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from app.dependencies import get_job_repository
from app.models import JobDTO
from app.schemas import (
	ErrorResponse,
	JobListResponseSchema,
	JobRequestSchema,
	JobResponseSchema,
)

router = APIRouter()


def create_error_response(
	error: Exception,
	status_code: int,
	error_type: str,
	include_details: bool = False,
) -> JSONResponse:
	error_data = {
		"type": error_type,
		"message": str(error),
	}

	if include_details:
		error_data["details"] = {
			"exception_type": error.__class__.__name__,
			"args": list(error.args) if hasattr(error, "args") else None,
		}
		if isinstance(error, ValidationError):
			error_data["details"]["errors"] = error.errors()

	return JSONResponse(status_code=status_code, content={"error": error_data})


@router.get(
	"",
	response_model=JobListResponseSchema,
	status_code=status.HTTP_200_OK,
	responses={
		500: {"model": ErrorResponse},
	},
)
async def get_all_jobs(
	job_repository: Any = Depends(get_job_repository),
) -> JobListResponseSchema:
	try:
		jobs = await job_repository.get_all_jobs()
		jobs_data = [jsonable_encoder(job) for job in jobs]
		return JobListResponseSchema(jobs=jobs_data)
	except Exception as e:
		return create_error_response(
			e,
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			error_type="database_error",
			include_details=True,
		)


@router.post(
	"",
	response_model=JobResponseSchema,
	status_code=status.HTTP_201_CREATED,
	responses={
		400: {"model": ErrorResponse},
		409: {"model": ErrorResponse},
		500: {"model": ErrorResponse},
	},
)
async def create_job(
	job_request: JobRequestSchema, repository=Depends(get_job_repository)
):
	try:
		job_dto = JobDTO.from_request(job_request)
		created_job = await repository.create_job_from_dto(job_dto)
		return created_job.to_response()

	except ValidationError as e:
		return create_error_response(
			error=e,
			status_code=status.HTTP_400_BAD_REQUEST,
			error_type="validation_error",
			include_details=True,
		)

	except IntegrityError as e:
		return create_error_response(
			error=e,
			status_code=status.HTTP_409_CONFLICT,
			error_type="duplicate_entry",
			include_details=True,
		)

	except SQLAlchemyError as e:
		return create_error_response(
			error=e,
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			error_type="database_error",
			include_details=True,
		)

	except Exception as e:
		return create_error_response(
			error=e,
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			error_type="internal_server_error",
			include_details=True,
		)
