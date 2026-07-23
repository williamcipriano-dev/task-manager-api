from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from app.database.database import Base, engine, get_db
from app.database.models import Task, User
from app.schemas import TaskCreate, TaskUpdate, TaskResponse
from app.auth.auth import router as auth_router
from app.auth.security import get_current_user
from app.routers.tasks import router as task_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager API",
    description="API REST para gerenciamento de tarefas.",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(task_router)


@app.get("/")
def home():
    return {"message": "Task Manager API funcionando!"}


@app.get("/database")
def test_database(db: Session = Depends(get_db)):
    return {"message": "Conexão com o banco funcionando!"}


