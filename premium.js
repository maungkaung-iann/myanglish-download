(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        if (!reduced.matches) entry.target.classList.add('reveal-now');
        observer.unobserve(entry.target);
      }
    }, {threshold: .12});
    document.querySelectorAll('.section-title,.demo,.scroll-demo,.download-card,.release-card,.myanglish-message-glass').forEach(el => observer.observe(el));
  }
  const button = document.getElementById('media-toggle');
  const videos = [...document.querySelectorAll('video')];
  let paused = false;
  button.addEventListener('click', () => {
    paused = !paused;
    videos.forEach(video => {
      video.dataset.userPaused = String(paused);
      if (paused) video.pause(); else video.play().catch(() => {});
    });
    button.textContent = paused ? 'Play videos' : 'Pause videos';
    button.setAttribute('aria-pressed', String(paused));
  });
})();
