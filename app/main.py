from fastapi import FastAPI

from app.database.database import Base, engine
from app.database.models import Task

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager API",
    description="API REST para gerenciamento de tarefas.",
    version="1.0.0"
)


@app.get("/")
def home():
    return {"message": "Task Manager API funcionando!"}