const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }));
}

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const roleWord = document.querySelector('.flip-word');
const roles = ['Web Developer', 'WordPress Expert', 'Website Designer', 'WooCommerce Specialist'];
let roleIndex = 0;
if (roleWord && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => {
    roleWord.classList.remove('flip-in');
    roleWord.classList.add('flip-out');
    window.setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleWord.textContent = roles[roleIndex];
      roleWord.setAttribute('aria-label', roles[roleIndex]);
      roleWord.classList.remove('flip-out');
      roleWord.classList.add('flip-in');
    }, 260);
  }, 2600);
}

const header = document.querySelector('.site-header');
const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealTargets = document.querySelectorAll(
  '.section-heading,.section-intro,.detail-card,.skill-card,.service-card,.project-card,.contact-panel,.tech-strip'
);
revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 75}ms`;
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(element => observer.observe(element));
} else {
  revealTargets.forEach(element => element.classList.add('is-visible'));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
