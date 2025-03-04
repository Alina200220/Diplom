from datetime import datetime
from collections import Counter

commits_info = [{'author_name': 'Alina200220', 'date_iso': '2023-06-22T08:34:16Z'}, 
 {'author_name': 'Alina200220', 'date_iso': '2023-06-05T17:46:25Z'}, 
 {'author_name': 'Alina200220', 'date_iso': '2023-06-05T17:45:16Z'}, 
 {'author_name': 'Alina200220', 'date_iso': '2023-06-05T17:43:28Z'}]

def process_commit_info_users(commits_info:list[dict]):
    users = [i["author_name"] for i in commits_info]
    data_users = dict(Counter(users))
    return data_users

def process_commit_info_dates(commits_info:list[dict]):
    dates = [datetime.strptime(i["date_iso"], '%Y-%m-%dT%H:%M:%SZ').date().strftime("%d-%m-%Y") for i in commits_info]
    data_dates = dict(Counter(dates))
    return data_dates

process_commit_info_users(commits_info)