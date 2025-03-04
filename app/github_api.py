import json
from settings import settings
import httpx


class GitApi:

    @staticmethod
    def find_commits(owner:str, repo:str) -> tuple[int,list[dict]]:
        url = f"https://api.github.com/repos/{owner}/{repo}/commits"
        headers = {
            "Authorization": f"Bearer {settings.GIT_API_KEY}"
        }
        response = httpx.get(url=url,headers=headers)
        response.raise_for_status
        response_json = json.loads(response.text)
        number_commits = len(response_json)
        commits_info = []
        for one_dict in response_json:
            commits_info.append({"author_name":one_dict["commit"]["author"]["name"],
                                        "date_iso":one_dict["commit"]["author"]["date"]})
        return number_commits, commits_info


