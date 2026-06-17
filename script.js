document.addEventListener("DOMContentLoaded", () => {
  initMenuMobile();
  initCardsInteraction();
  initQuiz();
  initFormValidation();
  initScrollEffects();
});

/* =========================
   MENU MOBILE
========================= */
function initMenuMobile() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}

/* =========================
   CARDS INTERATIVOS
========================= */
function initCardsInteraction() {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });
}

/* =========================
   QUIZ
========================= */
function initQuiz() {
  const feedback = document.getElementById("quiz-feedback");
  const options = document.querySelectorAll(".btn-option");

  if (!feedback || options.length === 0) return;

  options.forEach(button => {
    button.addEventListener("click", () => {
      const isCorrect = button.dataset.correct === "true";

      if (isCorrect) {
        feedback.textContent = "✔ Correto! Irrigação inteligente economiza água.";
        feedback.style.color = "#2ecc71";
      } else {
        feedback.textContent = "✖ Errado! Tente novamente.";
        feedback.style.color = "#e74c3c";
      }

      options.forEach(btn => btn.disabled = true);

      setTimeout(() => {
        options.forEach(btn => btn.disabled = false);
      }, 1500);
    });
  });
}

/* =========================
   FORMULÁRIO
========================= */
function initFormValidation() {
  const form = document.getElementById("contact-form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    let valid = true;

    clearError(nome);
    clearError(email);
    clearError(mensagem);

    if (nome.value.trim().length < 3) {
      showError(nome, "Nome inválido");
      valid = false;
    }

    if (!email.value.includes("@")) {
      showError(email, "E-mail inválido");
      valid = false;
    }

    if (mensagem.value.trim().length < 10) {
      showError(mensagem, "Mensagem muito curta");
      valid = false;
    }

    if (valid) {
      form.reset();
      alert("Mensagem enviada com sucesso!");
    }
  });
}

/* =========================
   ERROS FORMULÁRIO
========================= */
function showError(input, message) {
  const group = input.parentElement;

  const error = document.createElement("small");
  error.className = "error-message";
  error.textContent = message;
  error.style.color = "red";

  group.appendChild(error);
  input.style.borderColor = "red";
}

function clearError(input) {
  const group = input.parentElement;
  const error = group.querySelector(".error-message");

  if (error) error.remove();

  input.style.borderColor = "";
}

/* =========================
   SCROLL ANIMATION
========================= */
function initScrollEffects() {
  const elements = document.querySelectorAll("section, .card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });
}
