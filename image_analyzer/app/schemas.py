from typing import List, Optional

from pydantic import BaseModel

from app.models import VisaSponsorshipStatus


class AnalyzedJob(BaseModel):
	job_title: str
	company_name: Optional[str] = None
	location: Optional[str] = None
	visa_sponsorship: VisaSponsorshipStatus = VisaSponsorshipStatus.UNAVAILABLE
	tech_stack: List[str] = []
	soft_skills: List[str] = []
	years_experience: Optional[str] = None

	@classmethod
	def from_dto(cls, dto) -> "AnalyzedJob":
		return cls(
			job_title=dto.job_title,
			company_name=dto.company_name,
			location=dto.location,
			visa_sponsorship=dto.visa_sponsorship,
			tech_stack=dto.tech_stack.split(",") if dto.tech_stack else [],
			soft_skills=dto.soft_skills.split(",") if dto.soft_skills else [],
			years_experience=dto.years_experience,
		)


class TextPayload(BaseModel):
	text: str
