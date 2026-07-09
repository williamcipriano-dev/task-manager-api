# Task Manager API

API REST para gerenciamento de tarefas desenvolvida com **FastAPI**, com foco em boas práticas de desenvolvimento, organização de código e arquitetura para aplicações backend.

> 🚧 **Status:** Em desenvolvimento.

---

## Objetivo

Desenvolver uma API REST completa utilizando Python, implementando:

- CRUD de tarefas
- Banco de dados SQLite
- SQLAlchemy (ORM)
- Autenticação JWT
- Documentação automática com Swagger
- Front-end simples consumindo a API

---

## Tecnologias

- Python 3
- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn

---

## Estrutura do projeto

```text
task-manager-api/
│
├── app/
│   ├── database/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   └── models.py
│   │
│   ├── __init__.py
│   └── main.py
│
├── README.md
├── requirements.txt
└── .gitignore
```

---

## Funcionalidades

### ✅ Concluído

- Estrutura inicial do projeto
- Configuração do FastAPI
- Banco de dados SQLite
- Integração com SQLAlchemy
- Modelo `Task`
- Criação automática do banco de dados
- Documentação automática com Swagger
- Schemas com Pydantic (`TaskCreate` e `TaskResponse`)
- Criação de tarefas (`POST /tasks`)

### 🚧 Em desenvolvimento

- CRUD de tarefas
- Autenticação JWT
- Front-end para consumo da API
- Testes finais
- Integração ao Portfólio

---

## Como executar

Clone o repositório:

```bash
git clone https://github.com/williamcipriano-dev/task-manager-api.git
```

Acesse a pasta:

```bash
cd task-manager-api
```

Crie o ambiente virtual:

```bash
python -m venv venv
```

Ative o ambiente virtual.

Windows:

```powershell
.\venv\Scripts\activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Execute a aplicação:

```bash
uvicorn app.main:app --reload
```

---

## Documentação

Swagger:

```
http://127.0.0.1:8000/docs
```

ReDoc:

```
http://127.0.0.1:8000/redoc
```

---

## Versionamento

Este projeto está sendo desenvolvido utilizando **Git** e **GitHub**, com commits organizados seguindo o padrão **Conventional Commits**.

---

## Autor

William Cipriano

Projeto desenvolvido para estudos, prática de desenvolvimento backend e composição de portfólio.
