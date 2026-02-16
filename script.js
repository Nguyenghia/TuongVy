// ===== PERSONAL NAME =====
const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "Bạn đặc biệt";
document.getElementById("personalName").innerText =
    `🧧 Lì xì dành riêng cho ${name} 💖`;

// ===== COUNTDOWN =====
let timeLeft = 10;
const countdownEl = document.getElementById("countdown");
const hero = document.querySelector(".hero");
const envelopeSection = document.querySelector(".envelope-section");
const envelope = document.getElementById("envelope");
const music = document.getElementById("bgMusic");

let countdown = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(countdown);
        hero.style.display = "none";
        envelopeSection.classList.remove("hidden");
    }
}, 1000);

if (envelope) {
    envelope.addEventListener("click", () => {
        envelope.classList.add("open");

        if (music && typeof music.play === "function") {
            // Bọc play() để tránh lỗi Promise bị reject trên một số trình duyệt
            const playPromise = music.play();
            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {});
            }
        }

        launchFirework();
    });
}

// =====================
// 🔥 3D FIREWORK SYSTEM
// =====================

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const gravity = 0.05;

function randomColor() {
    const colors = ["#ffcc00", "#ff4d4d", "#00ffff", "#ff66ff", "#ffffff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function launchFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;

    for (let i = 0; i < 120; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;

        particles.push({
            x,
            y,
            z: Math.random() * 200,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            vz: (Math.random() - 0.5) * 4,
            alpha: 1,
            color: randomColor()
        });
    }
}

function updateFireworks() {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.vy += gravity;
        p.alpha -= 0.01;

        const scale = 300 / (300 + p.z);

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(
            p.x * scale,
            p.y * scale,
            3 * scale,
            0,
            Math.PI * 2
        );
        ctx.fill();

        if (p.alpha <= 0) {
            particles.splice(i, 1);
        }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(updateFireworks);
}

updateFireworks();
setInterval(launchFirework, 1500);

// ===== GOLD SPARKLE =====
const sparkleCanvas = document.getElementById("sparkle");
const sctx = sparkleCanvas.getContext("2d");
sparkleCanvas.width = window.innerWidth;
sparkleCanvas.height = window.innerHeight;

let sparkles = Array.from({length: 100}, () => ({
    x: Math.random() * sparkleCanvas.width,
    y: Math.random() * sparkleCanvas.height,
    size: Math.random() * 2,
    alpha: Math.random()
}));

function drawSparkles() {
    sctx.clearRect(0,0,sparkleCanvas.width,sparkleCanvas.height);
    sparkles.forEach(s => {
        s.alpha += (Math.random() - 0.5) * 0.05;
        s.alpha = Math.max(0, Math.min(1, s.alpha));
        sctx.fillStyle = `rgba(255,215,0,${s.alpha})`;
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
        sctx.fill();
    });
    requestAnimationFrame(drawSparkles);
}
drawSparkles();

// ===== SVG PEACH BLOSSOMS =====
const flowerCanvas = document.getElementById("flowers");
const fctx = flowerCanvas.getContext("2d");
flowerCanvas.width = window.innerWidth;
flowerCanvas.height = window.innerHeight;

function resizeCanvases() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
    sparkleCanvas.width = width;
    sparkleCanvas.height = height;
    flowerCanvas.width = width;
    flowerCanvas.height = height;
}

resizeCanvases();
window.addEventListener("resize", resizeCanvases);

let petals = Array.from({length: 40}, () => ({
    x: Math.random() * flowerCanvas.width,
    y: Math.random() * flowerCanvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() + 0.5,
    angle: Math.random() * 360
}));

function drawPetals() {
    fctx.clearRect(0,0,flowerCanvas.width,flowerCanvas.height);

    petals.forEach(p => {
        p.y += p.speed;
        p.angle += 1;

        if (p.y > flowerCanvas.height) {
            p.y = -20;
            p.x = Math.random() * flowerCanvas.width;
        }

        fctx.save();
        fctx.translate(p.x, p.y);
        fctx.rotate(p.angle * Math.PI/180);

        fctx.fillStyle = "#ff99cc";
        fctx.beginPath();
        fctx.moveTo(0,0);
        fctx.bezierCurveTo(10,-10, 20,10, 0,20);
        fctx.bezierCurveTo(-20,10, -10,-10, 0,0);
        fctx.fill();

        fctx.restore();
    });

    requestAnimationFrame(drawPetals);
}
drawPetals();
