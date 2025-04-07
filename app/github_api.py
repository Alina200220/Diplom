import asyncio
import json

import aiohttp
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
    
    @staticmethod
    async def fetch_page(session, url):
        headers = {
                "Authorization": f"Bearer {settings.GIT_API_KEY}"
            }
        async with session.get(url=url, headers=headers) as response:
            return await response.json()

    @staticmethod
    async def fetch_all_pages(base_url):
        async with aiohttp.ClientSession() as session:
            data = await GitApi.fetch_page(session, base_url)
            print(f"fetched data from {base_url}")
            return len(data)
        
    @staticmethod
    async def find_pull_requests_closed(owner:str, repo:str) -> None:
        base_url = f"https://api.github.com/repos/{owner}/{repo}/pulls?state=closed"  # Замените на ваш базовый URL
        result = 0
        i = 1
        results = [1]
        while sum(results) > 0:
            results.pop()
            tasks = [asyncio.create_task(GitApi.fetch_all_pages(f"{base_url}&page={i}")) for i in range(i, i+10)]
            results = await asyncio.gather(*tasks)
            for num in results:
                result += num
            i += 10
        return str(result)





