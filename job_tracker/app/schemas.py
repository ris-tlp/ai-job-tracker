from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from .models import VisaSponsorshipStatus


class JobResponse(BaseModel):
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
