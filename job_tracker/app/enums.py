from enum import Enum


class VisaSponsorshipStatus(str, Enum):
	AVAILABLE = "available"
	NOT_AVAILABLE = "not_available"
	UNAVAILABLE = "unavailable"
