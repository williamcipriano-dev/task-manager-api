const API_URL = "http://127.0.0.1:8000";

// Elementos do login
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const loginCard = document.querySelector(".login-card");

// Elementos do dashboard
const dashboard = document.getElementById("dashboard");
const logoutButton = document.getElementById("logout-button");
const currentUser = document.getElementById("current-user");

// LOGIN
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

    // Esconde o login
    loginCard.classList.add("hidden");

    // Mostra o dashboard
    dashboard.classList.remove("hidden");
  } catch (error) {
    loginMessage.style.color = "var(--danger)";
    loginMessage.textContent = "Não foi possível conectar ao servidor.";

    console.error(error);
  }
});

// LOGOUT
logoutButton.addEventListener("click", () => {
  // Remove os dados de autenticação
  localStorage.removeItem("access_token");
  localStorage.removeItem("username");

  // Esconde o dashboard
  dashboard.classList.add("hidden");

  // Mostra novamente o login
  loginCard.classList.remove("hidden");

  // Limpa usuário e senha
  loginForm.reset();

  // Limpa mensagens anteriores
  loginMessage.textContent = "";
});
