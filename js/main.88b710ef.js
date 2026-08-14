/**
 * Garibaldi Restaurante - Interactive Experience Script
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Header scroll state
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Navigation
  const burgerBtn = document.getElementById('burgerBtn');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (burgerBtn) burgerBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Menu Category Tab Switcher
  const catBtns = document.querySelectorAll('.cat-btn');
  const categoryBlocks = document.querySelectorAll('.menu-category-block');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update Active Tab Button
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show Corresponding Category Block
      categoryBlocks.forEach(block => {
        if (block.id === `cat-${targetId}`) {
          block.classList.add('active');
        } else {
          block.classList.remove('active');
        }
      });
    });
  });

  // 4. Scroll Reveal Animations (Touch & Performance Friendly)
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // 5. Smooth Scroll for internal anchor links with offset adjustment
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});