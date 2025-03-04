import json
from fastapi import FastAPI
from starlette.requests import Request
from celery.result import AsyncResult
from fastapi.responses import JSONResponse
from models import ContentRequest, ContentResponse, Task
from celery_tasks import predict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello Embeddings"}


@app.post("/analyze", response_model=Task, status_code=202)
async def predict_endpoint(request: Request, content_request: ContentRequest):

    task_id = predict.delay(owner=content_request.owner, repo=content_request.repo)

    return {"task_id": str(task_id), "status": "Processing"}


@app.get("/result/{task_id}", response_model=ContentResponse, status_code=200)
async def predict_result(task_id):
    task = AsyncResult(task_id)
    if not task.ready():
        return JSONResponse(status_code=202, content={"task_id": str(task_id), "status": "Processing"})
    number_commits, commits_info_users, commits_info_dates = task.get()
    return {"task_id": task_id, "status": "Success", "number_commits": number_commits, "commits_info_users":commits_info_users, "commits_info_dates":commits_info_dates}