from settings import settings
from celery import Celery


celery_app = Celery(
    "celery_app",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=["celery_tasks"]
)
