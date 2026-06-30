document.addEventListener("DOMContentLoaded", () => {
    initMenuMobile();
    initScrollEffects();
    initBackToTop();
    initThemeToggle();
    initStatsCounter();
    initChart();
    initCarousel();
    initQuiz();
    initFormValidation();
});

/* =========================
   MENU MOBILE
========================= */
function initMenuMobile() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");
    const icon = toggle?.querySelector("i");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isActive = menu.classList.toggle("active");
        toggle.setAttribute("aria-expanded", isActive);
        if (icon) {
            icon.className = isActive ? "fas fa-times" : "fas fa-bars";
        }
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            toggle.setAttribute("aria-expanded", "false");
            if (icon) icon.className = "fas fa-bars";
        });
    });
}

/* =========================
   SCROLL ANIMATION
========================= */
function initScrollEffects() {
    const elements = document.querySelectorAll("section, .card, .stat-card, .solution-item, .ods-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => {
        el.classList.add("hidden");
        observer.observe(el);
    });
}

/* =========================
   BOTÃO VOLTAR AO TOPO
========================= */
function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* =========================
   TOGGLE TEMA (DARK MODE)
========================= */
function initThemeToggle() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    const icon = btn.querySelector("i");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        icon.className = "fas fa-sun";
    }

    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

/* =========================
   CONTADOR ANIMADO
========================= */
function initStatsCounter() {
    const counters = document.querySelectorAll(".counter");
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const target = parseInt(card.dataset.target);
                const counter = card.querySelector(".counter");
                animateCounter(counter, target);
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".stat-card").forEach(card => {
        observer.observe(card);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

/* =========================
   GRÁFICO CHART.JS
========================= */
function initChart() {
    const ctx = document.getElementById('agroChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2020', '2022', '2024', '2026'],
            datasets: [
                {
                    label: 'Crescimento do Agro (Índice %)',
                    data: [100, 115, 128, 142],
                    backgroundColor: '#52b788',
                    borderColor: '#2d6a4f',
                    borderWidth: 2,
                    borderRadius: 8
                },
                {
                    label: 'Áreas Preservadas (Índice %)',
                    data: [100, 102, 105, 108],
                    backgroundColor: '#1b4332',
                    borderColor: '#1b4332',
                    borderWidth: 2,
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 20, font: { size: 13 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Evolução Comparativa (%)'
                    }
                }
            }
        }
    });
}

/* =========================
   CARROSSEL COM DOTS
========================= */
function initCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const dotsContainer = document.querySelector(".carousel-dots");

    if (slides.length === 0 || !nextBtn || !prevBtn) return;

    let currentSlide = 0;
    let autoPlayInterval;

    // Criar indicadores (dots)
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = "carousel-dot" + (index === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Ir para slide ${index + 1}`);
        dot.addEventListener("click", () => changeSlide(index));
        dotsContainer?.appendChild(dot);
    });

    const dots = document.querySelectorAll(".carousel-dot");

    function changeSlide(index) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide]?.classList.remove("active");
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
        dots[currentSlide]?.classList.add("active");
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            changeSlide(currentSlide + 1);
        }, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    nextBtn.addEventListener("click", () => {
        changeSlide(currentSlide + 1);
        stopAutoPlay();
        startAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        changeSlide(currentSlide - 1);
        stopAutoPlay();
        startAutoPlay();
    });

    startAutoPlay();
}

/* =========================
   QUIZ COMPLETO
========================= */
function initQuiz() {
    const questions = [
        {
            question: "Qual destas tecnologias foca diretamente na economia de recursos hídricos?",
            options: ["Drones agrícolas", "Irrigação inteligente", "Energia solar fotovoltaica", "Colheitadeiras automatizadas"],
            correct: 1,
            explanation: "A irrigação inteligente usa sensores para aplicar água apenas quando e onde necessário, economizando até 60%."
        },
        {
            question: "O que significa a sigla ILPF?",
            options: [
                "Irrigação Localizada de Precisão Florestal",
                "Integração Lavoura-Pecuária-Floresta",
                "Índice de Lucratividade da Produção Familiar",
                "Inovação Logística Portuária Florestal"
            ],
            correct: 1,
            explanation: "ILPF é um sistema que integra diferentes atividades produtivas na mesma área, promovendo sustentabilidade."
        },
        {
            question: "Qual é a principal vantagem da Agricultura de Precisão?",
            options: [
                "Aumentar o uso de agrotóxicos",
                "Eliminar totalmente a mão de obra",
                "Otimizar o uso de insumos e reduzir desperdícios",
                "Substituir totalmente os tratores"
            ],
            correct: 2,
            explanation: "Agricultura de Precisão aplica insumos de forma localizada, reduzindo custos e impacto ambiental."
        },
        {
            question: "O que é o Plano ABC+?",
            options: [
                "Programa de alfabetização rural",
                "Programa para redução de carbono na agropecuária",
                "Plano de exportação de grãos",
                "Programa de subsídios para máquinas"
            ],
            correct: 1,
            explanation: "O Plano ABC+ é uma política pública brasileira para promover a agricultura de baixa emissão de carbono."
        },
        {
            question: "Qual ODS da ONU está MAIS diretamente ligado à agricultura sustentável?",
            options: [
                "ODS 4 - Educação de Qualidade",
                "ODS 2 - Fome Zero e Agricultura Sustentável",
                "ODS 11 - Cidades Sustentáveis",
                "ODS 14 - Vida na Água"
            ],
            correct: 1,
            explanation: "O ODS 2 visa acabar com a fome e promover agricultura sustentável, sendo central para o tema."
        }
    ];

    const questionEl = document.getElementById("quiz-question");
    const optionsEl = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");
    const nextBtn = document.getElementById("next-question");
    const currentQEl = document.getElementById("current-q");
    const totalQEl = document.getElementById("total-q");
    const progressBar = document.getElementById("progress-bar");
    const resultEl = document.getElementById("quiz-result");
    const finalScoreEl = document.getElementById("final-score");
    const restartBtn = document.getElementById("restart-quiz");
    const quizBox = document.getElementById("quiz-box");

    if (!questionEl || !optionsEl) return;

    let currentIndex = 0;
    let score = 0;
    let answered = false;

    totalQEl.textContent = questions.length;

    function loadQuestion() {
        answered = false;
        const q = questions[currentIndex];
        questionEl.textContent = q.question;
        currentQEl.textContent = currentIndex + 1;
        feedbackEl.textContent = "";
        feedbackEl.style.color = "";
        nextBtn.style.display = "none";
        progressBar.style.width = `${((currentIndex) / questions.length) * 100}%`;
        optionsEl.innerHTML = "";

        q.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.textContent = option;
            btn.addEventListener("click", () => selectAnswer(index, btn));
            optionsEl.appendChild(btn);
        });
    }

    function selectAnswer(selectedIndex, btn) {
        if (answered) return;
        answered = true;

        const q = questions[currentIndex];
        const buttons = optionsEl.querySelectorAll(".btn-option");

        buttons.forEach((b, i) => {
            b.disabled = true;
            if (i === q.correct) b.classList.add("correct");
        });

        if (selectedIndex === q.correct) {
            score++;
            feedbackEl.textContent = `✔ Correto! ${q.explanation}`;
            feedbackEl.style.color = "var(--success-color)";
        } else {
            btn.classList.add("wrong");
            feedbackEl.textContent = `✖ Incorreto. ${q.explanation}`;
            feedbackEl.style.color = "var(--error-color)";
        }

        nextBtn.style.display = "inline-block";
        nextBtn.textContent = currentIndex === questions.length - 1 ? "Ver Resultado" : "Próxima Pergunta →";
    }

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        progressBar.style.width = "100%";
        questionEl.style.display = "none";
        optionsEl.style.display = "none";
        feedbackEl.style.display = "none";
        nextBtn.style.display = "none";
        document.querySelector(".quiz-counter").style.display = "none";
        resultEl.style.display = "block";
        finalScoreEl.textContent = score;

        // Salvar no localStorage
        const bestScore = localStorage.getItem("quizBestScore") || 0;
        if (score > bestScore) {
            localStorage.setItem("quizBestScore", score);
        }
    }

    restartBtn.addEventListener("click", () => {
        currentIndex = 0;
        score = 0;
        questionEl.style.display = "block";
        optionsEl.style.display = "flex";
        feedbackEl.style.display = "block";
        document.querySelector(".quiz-counter").style.display = "block";
        resultEl.style.display = "none";
        loadQuestion();
    });

    loadQuestion();
}

/* =========================
   VALIDAÇÃO DE FORMULÁRIO
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
            showError(nome, "Nome deve ter pelo menos 3 caracteres");
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, "Digite um e-mail válido");
            valid = false;
        }

        if (mensagem.value.trim().length < 10) {
            showError(mensagem, "Mensagem deve ter pelo menos 10 caracteres");
            valid = false;
        }

        if (valid) {
            // Simular envio
            const successDiv = document.getElementById("form-success");
            successDiv.style.display = "block";
            form.reset();

            setTimeout(() => {
                successDiv.style.display = "none";
            }, 4000);
        }
    });
}

function showError(input, message) {
    input.classList.add("error");
    const errorEl = input.parentElement.querySelector(".error-message");
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = "block";
    }
}

function clearError(input) {
    input.classList.remove("error");
    const errorEl = input.parentElement.querySelector(".error-message");
    if (errorEl) {
        errorEl.style.display = "none";
    }
}
