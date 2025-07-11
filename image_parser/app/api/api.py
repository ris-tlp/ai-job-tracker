from fastapi import APIRouter

from app.api.endpoints import health, parsed_images

api_router = APIRouter()
api_router.include_router(health.router, prefix="/jobs/parsed-images")
api_router.include_router(parsed_images.router, prefix="/jobs/parsed-images")
