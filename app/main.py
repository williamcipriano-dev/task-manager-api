from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from app.database.database import Base, engine, get_db
from app.database.models import Task
from app.schemas import TaskCreate, TaskResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager API",
    description="API REST para gerenciamento de tarefas.",
    version="1.0.0"
)


@app.get("/")
def home():
    return {"message": "Task Manager API funcionando!"}


@app.get("/database")
def test_database(db: Session = Depends(get_db)):
    return {"message": "Conexão com o banco funcionando!"}


@app.post("/tasks", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(
        title=task.title,
        description=task.description
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@app.get("/tasks", response_model=list[TaskResponse])
def list_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()

    return tasks

@app.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Tarefa não encontrada."
        )

    return task