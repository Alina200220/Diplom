import asyncio
from celery import Task
from form_report import process_commit_info_users, process_commit_info_dates
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
    commits_info_users = process_commit_info_users(commits_info)
    commits_info_dates = process_commit_info_dates(commits_info)
    pull_requests_closed = asyncio.run(self.api_instance.find_pull_requests_closed(owner, repo))
    pull_requests_opened = asyncio.run(self.api_instance.find_pull_requests_opened(owner, repo))
    number_issues, issues_info, dates_dict = self.api_instance.find_issues(owner, repo)
    return number_commits, commits_info_users, commits_info_dates, pull_requests_closed, pull_requests_opened, dates_dict