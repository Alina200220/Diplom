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
    commits_info_users: dict
    commits_info_dates: dict
    pull_requests_closed: str
    pull_requests_opened: str
    issues: dict


class ContentRequest(BaseModel):
    """
    Request body
    """
    owner: str
    repo: str