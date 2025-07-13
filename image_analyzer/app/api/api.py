from fastapi import APIRouter

from app.api.endpoints import analyze_text, health

api_router = APIRouter()
api_router.include_router(health.router, prefix="/jobs/analyzed-images")
api_router.include_router(analyze_text.router, prefix="/jobs/analyzed-images")
