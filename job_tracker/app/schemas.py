from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, Field

from .enums import VisaSponsorshipStatus


class JobResponseSchema(BaseModel):
	id: Optional[int]
	job_title: str
	company_name: Optional[str] = None
	location: Optional[str] = None
	visa_sponsorship: VisaSponsorshipStatus = VisaSponsorshipStatus.UNAVAILABLE
	tech_stack: Optional[str] = None
	soft_skills: Optional[str] = None
	years_experience: Optional[str] = None
	created_at: Optional[datetime] = None
	updated_at: Optional[datetime] = None

	class Config:
		orm_mode = True


class JobRequestSchema(BaseModel):
	job_title: str
	company_name: Optional[str] = None
	location: Optional[str] = None
	visa_sponsorship: VisaSponsorshipStatus
	tech_stack: Optional[str] = None
	soft_skills: Optional[str] = None
	years_experience: Optional[str] = None


class JobListResponseSchema(BaseModel):
	jobs: list[JobResponseSchema] = Field(..., description="List of job postings")


class ErrorResponse(BaseModel):
	detail: Any = Field(..., description="Error details, can be a string or dict.")
	type: Optional[str] = Field(
		None, description="Type of error for client-side handling."
	)
