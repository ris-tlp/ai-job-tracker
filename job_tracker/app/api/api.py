from fastapi import APIRouter

from app.api.endpoints import health, jobs

api_router = APIRouter()
api_router.include_router(health.router, prefix="/jobs")
api_router.include_router(jobs.router, prefix="/jobs")
