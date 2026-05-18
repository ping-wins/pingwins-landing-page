// =============================================
// PINGWINS — Script principal
// =============================================

// --- Header: efeito ao rolar ---
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- Menu mobile ---
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  const isOpen = nav.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Fecha menu ao clicar num link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// --- Preenche avatares com iniciais ---
document.querySelectorAll('.avatar, .team-avatar').forEach(el => {
  const initials = el.dataset.initials;
  if (initials) el.textContent = initials;
});

// --- Animações de scroll (Intersection Observer) ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// --- Formulário CTA ---
const ctaForm = document.getElementById('ctaForm');
const toast = document.getElementById('toast');

ctaForm.addEventListener('submit', () => {
  setTimeout(() => {
    showToast();
    ctaForm.reset();
  }, 500);
});

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// --- Smooth scroll para links internos ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// --- Destaque do link ativo no nav ao rolar ---
const sections = document.querySelectorAll('section[id]');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        nav.querySelectorAll('a').forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => activeObserver.observe(s));
