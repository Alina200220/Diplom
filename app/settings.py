from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):             
    REDIS_HOST: str               # Хост Redis-сервера
    GIT_API_KEY: str = ""
    BASE_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    CELERY_BROKER_URL: str
    CELERY_RESULT_BACKEND: str
    # Указание файла с переменными окружения
    model_config = SettingsConfigDict(env_file=f"{BASE_DIR}/.env")

   
settings = Settings()

