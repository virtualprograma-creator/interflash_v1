// ===== INTERSECTION OBSERVER (Animaciones al hacer scroll) =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            // Cerrar menú móvil al navegar
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });
});

// ===== MENÚ HAMBURGUESA (Móvil) =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});


// ===== FAQ ACORDEONES =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = btn.classList.contains('open');

        // Cerrar todos
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('open');
            q.nextElementSibling.style.maxHeight = null;
        });

        // Abrir el seleccionado si no estaba abierto
        if (!isOpen) {
            btn.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ===== FORMULARIO DE CONTACTO → WHATSAPP =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const colonia = document.getElementById('colonia').value.trim();
    const plan = document.getElementById('plan').options[document.getElementById('plan').selectedIndex].text;

    const mensaje = `Hola! Me interesa contratar InterFlash 🚀%0A%0A👤 *Nombre:* ${encodeURIComponent(nombre)}%0A📱 *Teléfono:* ${encodeURIComponent(telefono)}%0A📍 *Colonia:* ${encodeURIComponent(colonia)}%0A📦 *Plan:* ${encodeURIComponent(plan)}`;

    window.open(`https://wa.me/527444956564?text=${mensaje}`, '_blank');
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255,255,255,0.98)';
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
    } else {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// ===== CUSTOM CURSOR PRO =====
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

// Smooth follower logic
function animateFollower() {
    // Delays follow by 10% each frame for laggy feel
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    if (follower) {
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover interactions
document.querySelectorAll('a, button, .plan-card, .inst-card, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('active'));
    el.addEventListener('mouseleave', () => follower.classList.remove('active'));
});

// Hide cursor on touch devices
if ('ontouchstart' in window) {
    if (cursor) cursor.style.display = 'none';
    if (follower) follower.style.display = 'none';
}
