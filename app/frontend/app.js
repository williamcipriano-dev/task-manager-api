const API_URL = "http://127.0.0.1:8000";

// Elementos do login
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const loginCard = document.querySelector(".login-card");

// Elementos do dashboard
const dashboard = document.getElementById("dashboard");
const logoutButton = document.getElementById("logout-button");
const currentUser = document.getElementById("current-user");

// Modo de edição
let editingTaskId = null;

// Elementos do formulário de tarefas
const newTaskButton = document.getElementById("new-task-button");
const taskFormContainer = document.getElementById("task-form-container");
const taskForm = document.getElementById("task-form");
const cancelTaskButton = document.getElementById("cancel-task-button");
const taskMessage = document.getElementById("task-message");
// Elementos da lista de tarefas
const tasksList = document.getElementById("tasks-list");
const emptyState = document.getElementById("empty-state");

// =========================
// CONTROLE DA INTERFACE
// =========================

function showLogin() {
  dashboard.classList.add("hidden");
  loginCard.classList.remove("hidden");
}

function showDashboard() {
  loginCard.classList.add("hidden");
  dashboard.classList.remove("hidden");
}

function checkAuthentication() {
  const token = localStorage.getItem("access_token");
  const username = localStorage.getItem("username");

  if (!token) {
    showLogin();
    return;
  }

  currentUser.textContent = username;
  showDashboard();

  loadTasks();
}

// Verifica a autenticação ao carregar a página
checkAuthentication();

// =========================
// LOGIN
// =========================

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  loginMessage.textContent = "";

  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      loginMessage.style.color = "var(--danger)";
      loginMessage.textContent =
        data.detail || "Não foi possível realizar o login.";
      return;
    }

    // Salva os dados da autenticação
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("username", username);

    // Mostra o usuário no dashboard
    currentUser.textContent = username;

    // Mostra o dashboard
    showDashboard();
    // Carrega as tarefas
    await loadTasks();
  } catch (error) {
    loginMessage.style.color = "var(--danger)";
    loginMessage.textContent = "Não foi possível conectar ao servidor.";

    console.error(error);
  }
});

// =========================
// NOVA TAREFA
// =========================

newTaskButton.addEventListener("click", () => {
  // Mostra o formulário
  taskFormContainer.classList.remove("hidden");

  // Esconde o botão enquanto o formulário estiver aberto
  newTaskButton.classList.add("hidden");

  // Limpa mensagens anteriores
  taskMessage.textContent = "";

  // Coloca o cursor automaticamente no título
  document.getElementById("task-title").focus();
});

// =========================
// CANCELAR NOVA TAREFA
// =========================

cancelTaskButton.addEventListener("click", () => {
  // Limpa os campos
  taskForm.reset();

  // Limpa mensagens
  taskMessage.textContent = "";

  // Esconde o formulário
  taskFormContainer.classList.add("hidden");

  // Mostra novamente o botão
  newTaskButton.classList.remove("hidden");
});

// =========================
// CRIAR NOVA TAREFA
// =========================

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = localStorage.getItem("access_token");

  const taskData = {
    title: document.getElementById("task-title").value,
    description: document.getElementById("task-description").value,
    start_date: document.getElementById("task-start-date").value || null,
    due_date: document.getElementById("task-due-date").value || null,
  };

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();

    if (!response.ok) {
      taskMessage.style.color = "var(--danger)";
      taskMessage.textContent = data.detail || "Erro ao criar tarefa.";
      return;
    }

    taskMessage.style.color = "var(--success)";
    taskMessage.textContent = "Tarefa criada com sucesso!";
  } catch (error) {
    taskMessage.style.color = "var(--danger)";
    taskMessage.textContent = "Não foi possível conectar ao servidor.";

    console.error(error);
  }
});

// =========================
// CARREGAR TAREFAS
// =========================

async function loadTasks() {
  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const tasks = await response.json();

    // Limpa a lista antes de recriar
    tasksList.innerHTML = "";

    // Não existe nenhuma tarefa
    if (tasks.length === 0) {
      emptyState.classList.remove("hidden");
      return;
    }

    // Existem tarefas
    emptyState.classList.add("hidden");

    tasks.forEach((task) => {
      const card = document.createElement("div");

      card.className = "task-card";

      card.innerHTML = `
        <h3>${task.title}</h3>

        <p class="task-description">
          ${task.description || "Sem descrição."}
        </p>

        <div class="task-dates">

          <span>
            📅 <strong>Início:</strong>
            ${task.start_date ?? "--"}
          </span>

          <span>
            ⏰ <strong>Prazo:</strong>
            ${task.due_date ?? "--"}
          </span>

        </div>

        <div class="task-status">

          ${
            task.completed
              ? `<span class="completed">✔ Concluída</span>`
              : `<span class="pending">● Em andamento</span>`
          }

        </div>

        <div class="task-actions">

          <button
            class="secondary-button edit-button"
            data-id="${task.id}"
          >
            ✏ Editar
          </button>

          <button
            class="secondary-button delete-button"
            data-id="${task.id}"
          >
            🗑 Excluir
          </button>

        </div>
      `;

      const editButton = card.querySelector(".edit-button");
      editButton.addEventListener("click", () => {
        editingTaskId = task.id;

        document.getElementById("task-title").value = task.title;

        document.getElementById("task-description").value =
          task.description || "";

        document.getElementById("task-start-date").value =
          task.start_date || "";

        document.getElementById("task-due-date").value = task.due_date || "";

        taskFormContainer.classList.remove("hidden");

        newTaskButton.classList.add("hidden");

        taskMessage.textContent = "";

        document.getElementById("task-title").focus();
      });

      const deleteButton = card.querySelector(".delete-button");

      deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
      });

      tasksList.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
}

// =========================
// EXCLUIR TAREFA
// =========================

async function deleteTask(taskId) {
  const token = localStorage.getItem("access_token");

  if (!confirm("Deseja realmente excluir esta tarefa?")) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      alert("Erro ao excluir a tarefa.");
      return;
    }

    // Atualiza a lista automaticamente
    loadTasks();
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
  }
}
// =========================
// LOGOUT
// =========================

logoutButton.addEventListener("click", () => {
  // Remove os dados de autenticação
  localStorage.removeItem("access_token");
  localStorage.removeItem("username");

  // Limpa e fecha o formulário de tarefas
  taskForm.reset();
  taskMessage.textContent = "";
  taskFormContainer.classList.add("hidden");
  newTaskButton.classList.remove("hidden");

  // Mostra novamente o login
  showLogin();

  // Limpa usuário e senha
  loginForm.reset();

  // Limpa mensagens anteriores
  loginMessage.textContent = "";
});
