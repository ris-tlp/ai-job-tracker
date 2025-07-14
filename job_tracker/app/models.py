from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import func
from sqlmodel import Field, SQLModel

from .schemas import JobResponse


class VisaSponsorshipStatus(str, Enum):
    AVAILABLE = "available"
    NOT_AVAILABLE = "not_available"
    UNAVAILABLE = "unavailable"

class Job(SQLModel, table=True):
    __tablename__ = "jobs"

    id: Optional[int] = Field(default=None, primary_key=True)
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

    def to_response(self) -> JobResponse:
        return JobResponse(
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
