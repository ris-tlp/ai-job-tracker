from typing import List, Optional

from pydantic import BaseModel


class JobAnalysis(BaseModel):
	job_title: str
	company_name: Optional[str] = None
	location: Optional[str] = None
	visa_sponsorship: Optional[bool] = None
	tech_stack: List[str] = []
	soft_skills: List[str] = []
	years_experience: Optional[str] = None
