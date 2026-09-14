(() => {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('[data-nav]');
  const backTop = document.getElementById('backTop');
  const yearEl = document.getElementById('year');

  // Footer year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle
  if (navToggle && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    const openMenu = () => {
      navMenu.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900) closeMenu();
    });
  }

  // Navbar background on scroll + back-to-top visibility
  const onScroll = () => {
    const scrolled = window.scrollY > 12;
    navbar && navbar.classList.toggle('is-scrolled', scrolled);
    backTop && backTop.classList.toggle('is-visible', window.scrollY > 480);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Back to top
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active nav link on scroll, via IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => navObserver.observe(section));
  }
})();
