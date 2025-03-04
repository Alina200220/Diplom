from celery import Task
from form_report import process_commit_info
from github_api import GitApi

from worker import celery_app


class PredictTask(Task):
    abstract = True

    def __init__(self):
        super().__init__()
        self.api_instance = GitApi()


@celery_app.task(ignore_result=False,
                 bind=True,
                 base=PredictTask,
                 name="git_api")
def predict(self, owner:str, repo:str):
    number_commits, commits_info = self.api_instance.find_commits(owner, repo)
    commits_info = process_commit_info(commits_info)
    return number_commits, commits_info