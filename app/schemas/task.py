from datetime import date

from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    start_date: date | None = None
    due_date: date | None = None


class TaskUpdate(BaseModel):
    title: str
    description: str | None = None
    completed: bool
    start_date: date | None = None
    due_date: date | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    completed: bool
    start_date: date | None = None
    due_date: date | None = None

    class Config:
        from_attributes = True