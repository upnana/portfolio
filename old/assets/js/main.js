(() => {
  const header = document.querySelector('#siteHeader');
  const progress = document.querySelector('#scrollProgress');
  const menuButton = document.querySelector('#menuToggle');
  const nav = document.querySelector('#siteNav');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateScrollUI = () => {
    const top = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    header.classList.toggle('is-scrolled', top > 18);
    progress.style.width = `${Math.min(100, (top / max) * 100)}%`;
  };

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  menuButton.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  const videos = [...document.querySelectorAll('video')];
  videos.forEach((video) => {
    video.addEventListener('play', () => {
      videos.forEach((other) => {
        if (other !== video && !other.muted) other.pause();
      });
    });
  });

  const filterButtons = document.querySelectorAll('.filter-button');
  const demoCards = document.querySelectorAll('.demo-card');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      demoCards.forEach((card) => {
        const categories = card.dataset.category.split(' ');
        card.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
      });
    });
  });

  const dialog = document.querySelector('#videoDialog');
  const dialogVideo = document.querySelector('#dialogVideo');
  const dialogTitle = document.querySelector('#dialogTitle');
  const dialogDescription = document.querySelector('#dialogDescription');
  const dialogClose = document.querySelector('#dialogClose');

  const closeDialog = () => {
    dialogVideo.pause();
    dialogVideo.removeAttribute('src');
    dialogVideo.load();
    if (dialog.open) dialog.close();
  };

  demoCards.forEach((card) => {
    card.addEventListener('click', () => {
      dialogTitle.textContent = card.dataset.title;
      dialogDescription.textContent = card.dataset.description;
      dialogVideo.src = card.dataset.video;
      dialog.showModal();
      dialogVideo.play().catch(() => {});
    });
  });

  dialogClose.addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeDialog();
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
