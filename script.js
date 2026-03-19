// --- MATRIX BACKGROUND EFFECT ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Hacker characters (Katakana + Latin)
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン'.split('');

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 5, 0, 0.05)'; // Translucent black to create trail
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41'; // Neon green text
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);

// Handle resize for Matrix
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// --- CAROUSEL/SLIDER LOGIC (WITH AUTO-SLIDE) ---
const buttons = document.querySelectorAll("[data-carousel-button]");
const carousels = document.querySelectorAll("[data-carousel]");

// Slide change karne ka function
function advanceSlide(carousel, offset = 1) {
    const slides = carousel.querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    
    // Agar aakhri image par hai to wapas pehli par chala jaye
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
}

// 1. Manual button click
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const carousel = button.closest("[data-carousel]");
        advanceSlide(carousel, offset);
    });
});

// 2. Auto-slide logic (Every 4 seconds)
carousels.forEach(carousel => {
    // Check karega ke slider mein 1 se zyada images hain
    const slideCount = carousel.querySelectorAll(".slide").length;
    if (slideCount > 1) {
        setInterval(() => {
            advanceSlide(carousel, 1); // 1 ka matlab 'next' image
        }, 4000); // 4000 = 4 seconds
    }
});


// --- IMAGE MODAL LOGIC FOR ACHIEVEMENTS ---
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("expandedImg");
const closeBtn = document.getElementsByClassName("close")[0];

// Get all certificate images
const certImages = document.querySelectorAll('.cert-img');

certImages.forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    });
});

// Close modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close when clicking outside the image
modal.onclick = function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}