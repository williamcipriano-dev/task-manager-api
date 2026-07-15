# Task Manager API

API REST para gerenciamento de tarefas desenvolvida com **FastAPI**, seguindo boas práticas de organização de código, arquitetura em camadas e desenvolvimento de APIs REST.

Este projeto está sendo desenvolvido para estudo, portfólio e prática de desenvolvimento backend com Python.

---

## 🚀 Tecnologias utilizadas

- Python 3
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn

---

## 📂 Estrutura do projeto

```
task-manager-api/
│
├── app/
│   ├── database/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   └── models.py
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── task.py
│   │
│   ├── __init__.py
│   └── main.py
│
├── tasks.db
├── README.md
├── requirements.txt
└── .gitignore
```

---

## ✅ Funcionalidades implementadas

- Estrutura inicial do projeto
- Configuração do FastAPI
- Banco de dados SQLite
- Integração com SQLAlchemy
- Modelagem da entidade `Task`
- Criação automática do banco de dados
- Documentação automática com Swagger
- Schemas com Pydantic (`TaskCreate`, `TaskUpdate` e `TaskResponse`)
- Criar tarefa (`POST /tasks`)
- Listar tarefas (`GET /tasks`)
- Buscar tarefa por ID (`GET /tasks/{task_id}`)
- Atualizar tarefa (`PUT /tasks/{task_id}`)
- Excluir tarefa (`DELETE /tasks/{task_id}`)

---

## 📖 Documentação

Após iniciar o servidor:

```bash
uvicorn app.main:app --reload
```

A documentação interativa estará disponível em:

```
http://127.0.0.1:8000/docs
```

---

## 🚧 Status do projeto

### ✅ Concluído

- Estrutura do projeto
- Banco de dados SQLite
- Modelagem com SQLAlchemy
- CRUD completo
- Documentação automática com Swagger

### 🔄 Próximas etapas

- Autenticação com JWT
- Sistema de login
- Proteção de rotas
- Front-end para consumir a API

---

## 👨‍💻 Autor

**William Cipriano**

GitHub:
https://github.com/williamcipriano-dev
