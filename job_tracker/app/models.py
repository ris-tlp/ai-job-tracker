from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import func
from sqlmodel import Field, SQLModel

from .enums import VisaSponsorshipStatus
from .schemas import JobRequestSchema, JobResponseSchema


class Job(SQLModel, table=True):
    __tablename__ = "jobs"

    id: int = Field(default=None, primary_key=True)
    job_title: str
    company_name: Optional[str] = None
    location: Optional[str] = None
    visa_sponsorship: VisaSponsorshipStatus = Field(
        default=VisaSponsorshipStatus.UNAVAILABLE
    )
    tech_stack: Optional[str] = None
    soft_skills: Optional[str] = None
    years_experience: Optional[str] = None
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"server_default": func.now()},
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"server_default": func.now(), "onupdate": func.now()},
    )

class JobDTO(SQLModel):
    id: Optional[int] = None
    job_title: str
    company_name: Optional[str] = None
    location: Optional[str] = None
    visa_sponsorship: VisaSponsorshipStatus = VisaSponsorshipStatus.UNAVAILABLE
    tech_stack: Optional[str] = None
    soft_skills: Optional[str] = None
    years_experience: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    @classmethod
    def from_request(cls, job_request: "JobRequestSchema") -> "JobDTO":
        return JobDTO(
            job_title=job_request.job_title,
            company_name=job_request.company_name,
            location=job_request.location,
            visa_sponsorship=job_request.visa_sponsorship,
            tech_stack=job_request.tech_stack,
            soft_skills=job_request.soft_skills,
            years_experience=job_request.years_experience,
        )

    def to_response(self) -> JobResponseSchema:
        return JobResponseSchema(
            id=self.id,
            job_title=self.job_title,
            company_name=self.company_name,
            location=self.location,
            visa_sponsorship=self.visa_sponsorship,
            tech_stack=self.tech_stack,
            soft_skills=self.soft_skills,
            years_experience=self.years_experience,
            created_at=self.created_at,
            updated_at=self.updated_at,
        )

    def to_orm(self) -> "Job":
        return Job(
            id=None,  # DB generates key
            job_title=self.job_title,
            company_name=self.company_name,
            location=self.location,
            visa_sponsorship=self.visa_sponsorship,
            tech_stack=self.tech_stack,
            soft_skills=self.soft_skills,
            years_experience=self.years_experience,
            created_at=self.created_at,
            updated_at=self.updated_at,
        )
