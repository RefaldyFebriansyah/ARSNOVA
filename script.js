document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. ANIMATED CANVAS PARTICLES (NEON VIOLET)
    // ==========================================
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 65);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.alpha = Math.random() * 0.6 + 0.2;
            this.color = Math.random() > 0.5 ? "168, 85, 247" : "217, 70, 239";
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = `rgba(${this.color}, 0.8)`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        // Connecting lines between close particles
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 - dist / 1300})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach((p) => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // ==========================================
    // 2. CURSOR AURA TRAIL FX
    // ==========================================
    const cursorAura = document.getElementById("cursorAura");
    window.addEventListener("mousemove", (e) => {
        cursorAura.style.left = `${e.clientX}px`;
        cursorAura.style.top = `${e.clientY}px`;
    });

    // ==========================================
    // 3. NAVBAR MOBILE TOGGLE & SCROLL FX
    // ==========================================
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");
    const navbar = document.getElementById("navbar");

    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // ==========================================
    // 4. INTERSECTION OBSERVER (SCROLL ANIMATION)
    // ==========================================
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.12 }
    );

    sections.forEach((sec) => observer.observe(sec));

    // ==========================================
    // 5. 3D TILT EFFECT FOR GLASS CARDS
    // ==========================================
    const tiltCards = document.querySelectorAll(".tilt-card");

    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // ==========================================
    // 6. FILOSOFI LOGO INTERACTIVE TABS
    // ==========================================
    const phCards = document.querySelectorAll(".philosophy-card");
    const logoBigText = document.getElementById("logoBigText");
    const logoTagline = document.getElementById("logoTagline");
    const logoGlow = document.getElementById("logoGlow");

    phCards.forEach((card) => {
        card.addEventListener("click", () => {
            phCards.forEach((c) => c.classList.remove("active"));
            card.classList.add("active");

            const letter = card.dataset.letter;
            const title = card.dataset.title;
            const glowColor = card.dataset.glow;

            logoBigText.textContent = letter;
            logoTagline.textContent = title;
            logoGlow.style.background = glowColor;

            logoBigText.style.transform = "scale(1.15)";
            setTimeout(() => {
                logoBigText.style.transform = "scale(1)";
            }, 200);
        });
    });

    // ==========================================
    // 7. PORTFOLIO FILTER & MODAL LIGHTBOX
    // ==========================================
    const filterBtns = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;

            portfolioItems.forEach((item) => {
                if (filter === "all" || item.dataset.category === filter) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });
        });
    });

    // Modal Lightbox
    const modal = document.getElementById("previewModal");
    const modalClose = document.getElementById("modalClose");
    const modalBox = document.getElementById("modalBox");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");

    portfolioItems.forEach((item) => {
        item.addEventListener("click", () => {
            const title = item.dataset.title;
            const desc = item.dataset.desc;
            const thumbClass = item.querySelector(".portfolio-thumb").classList[1];

            modalTitle.textContent = title;
            modalDesc.textContent = desc;

            modalBox.className = "modal-preview-box " + thumbClass;
            modal.classList.add("active");
        });
    });

    modalClose.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});