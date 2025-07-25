from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import func
from sqlmodel import Field, SQLModel


class VisaSponsorshipStatus(str, Enum):
	AVAILABLE = "available"
	NOT_AVAILABLE = "not_available"
	UNAVAILABLE = "unavailable"


class AnalyzedImage(SQLModel, table=True):
	__tablename__ = "analyzed_images"

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


class AnalyzedImageDTO(SQLModel):
	id: int
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
	def from_dict(cls, data: dict) -> "AnalyzedImageDTO":
		tech_stack = data.get("tech_stack")
		if isinstance(tech_stack, list):
			tech_stack = ",".join(tech_stack)
		soft_skills = data.get("soft_skills")
		if isinstance(soft_skills, list):
			soft_skills = ",".join(soft_skills)
		visa = data.get("visa_sponsorship")
		if visa == "available":
			visa_enum = VisaSponsorshipStatus.AVAILABLE
		elif visa == "not_available":
			visa_enum = VisaSponsorshipStatus.NOT_AVAILABLE
		else:
			visa_enum = VisaSponsorshipStatus.UNAVAILABLE
		return cls(
			id=data.get("id", 0),
			job_title=data.get("job_title"),
			company_name=data.get("company_name"),
			location=data.get("location"),
			visa_sponsorship=visa_enum,
			tech_stack=tech_stack,
			soft_skills=soft_skills,
			years_experience=data.get("years_experience"),
			created_at=data.get("created_at", None),
			updated_at=data.get("updated_at", None),
		)

	def to_orm(self) -> "AnalyzedImage":
		return AnalyzedImage(
			job_title=self.job_title,
			company_name=self.company_name,
			location=self.location,
			visa_sponsorship=self.visa_sponsorship,
			tech_stack=self.tech_stack,
			soft_skills=self.soft_skills,
			years_experience=self.years_experience,
		)

	class Config:
		orm_mode = True
