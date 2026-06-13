/* ═══════════════════════════════════════════════
   Kamaleshkumar M — Portfolio JS
   ═══════════════════════════════════════════════ */

/* ── NAV SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── MOBILE MENU ── */
const hamburger = document.getElementById('hamburger');

// Create mobile menu dynamically
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
  <a href="#about" class="mm-link">About</a>
  <a href="#experience" class="mm-link">Experience</a>
  <a href="#projects" class="mm-link">Projects</a>
  <a href="#skills" class="mm-link">Skills</a>
  <a href="#contact" class="mm-link">Hire Me</a>
`;
document.body.appendChild(mobileMenu);

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

mobileMenu.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within the same parent
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach((el, i) => {
  // Add stagger delay to sibling reveals
  const siblings = el.parentElement?.querySelectorAll('.reveal');
  if (siblings) {
    const idx = Array.from(siblings).indexOf(el);
    el.dataset.delay = idx * 80;
  }
  revealObserver.observe(el);
});

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── TERMINAL TYPEWRITER ── */
function typewriterTerminal() {
  const outputLine = document.querySelector('.t-output');
  if (!outputLine) return;

  const finalText = outputLine.innerHTML;
  outputLine.innerHTML = '';
  outputLine.style.display = 'none';

  // Show after a delay
  setTimeout(() => {
    outputLine.style.display = 'block';
    const text = outputLine.textContent;
    const html = finalText;
    outputLine.innerHTML = '';

    let i = 0;
    const chars = html.split('');
    const timer = setInterval(() => {
      outputLine.innerHTML += chars[i];
      i++;
      if (i >= chars.length) clearInterval(timer);
    }, 18);
  }, 2200);
}

// Only run when terminal is visible
const terminal = document.querySelector('.terminal');
if (terminal) {
  const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typewriterTerminal();
        terminalObserver.unobserve(terminal);
      }
    });
  }, { threshold: 0.5 });
  terminalObserver.observe(terminal);
}

/* ── SMOOTH ANCHOR SCROLL (offset for fixed nav) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── SKILL ITEMS HOVER GLOW ── */
document.querySelectorAll('.sg-items span').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.boxShadow = '0 0 12px rgba(99,102,241,0.25)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.boxShadow = '';
  });
});

/* ── ACTIVE NAV STYLE ── */
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--text); background: rgba(99,102,241,0.1); }`;
document.head.appendChild(style);

/* ── YEAR IN FOOTER ── */
const copyEl = document.querySelector('.footer-copy');
if (copyEl) {
  copyEl.textContent = copyEl.textContent.replace('2024', new Date().getFullYear());
}
