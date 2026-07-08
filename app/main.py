from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from app.database.database import Base, engine, get_db
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


@app.get("/database")
def test_database(db: Session = Depends(get_db)):
    return {"message": "Conexão com o banco funcionando!"}
    