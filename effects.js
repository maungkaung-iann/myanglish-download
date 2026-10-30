(() => {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll('.section-title, .feature, .download-card, .release-card, .myanglish-message-glass');
  let observer;
  function configure() {
    if (observer) observer.disconnect();
    targets.forEach(el => el.classList.remove('fx-arrive'));
    if (motion.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fx-arrive');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    targets.forEach(el => observer.observe(el));
  }
  configure();
  motion.addEventListener?.('change', configure);
  const nav = document.querySelector('nav');
  let pending = false;
  function updateNav() {
    nav?.classList.toggle('fx-scrolled', window.scrollY > 24);
    pending = false;
  }
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(updateNav); }
  }, { passive: true });
  updateNav();
})();
