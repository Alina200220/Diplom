from pydantic import BaseModel
from typing import List


class Task(BaseModel):
    """
    Celery task representation
    """
    task_id: str
    status: str


class ContentResponse(BaseModel):
    """
    Content Response
    """
    task_id: str
    status: str
    number_commits: int
    commits_info: dict


class ContentRequest(BaseModel):
    """
    Request body
    """
    owner: str
    repo: str