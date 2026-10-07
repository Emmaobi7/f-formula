/**
 * The Flirt Blueprint / F-Formula
 * Core Interaction Script
 */

import { initFrameworkSection } from './framework.js';
import { initFaqAccordion } from './faq.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initVideoPlayerModal();
  initScrollReveal();
  initFrameworkSection();
  initFaqAccordion();
});

/**
 * Scroll Reveal Observer for Editorial Sections
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
}

/**
 * Header subtle sticky shadow & height compression on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer & Accessibility Controls
 */
function initMobileNav() {
  const menuBtn = document.querySelector('.menu-toggle-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');
  
  if (!menuBtn || !drawer) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    drawer.classList.toggle('is-open', isOpen);
    drawer.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const firstLink = drawer.querySelector('a, button');
      if (firstLink) firstLink.focus();
    } else {
      document.body.style.overflow = '';
      menuBtn.focus();
    }
  };

  menuBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
    }
  });

  // Close drawer if resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900 && menuBtn.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
    }
  }, { passive: true });
}

/**
 * Cinematic Video Player Modal & Custom Controls
 */
function initVideoPlayerModal() {
  const playTriggers = document.querySelectorAll('[data-action="play-video"]');
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('closeVideoModal');
  const videoEl = document.getElementById('mainVideoElement');
  const playPauseBtn = document.getElementById('modalPlayPause');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const muteBtn = document.getElementById('modalMuteToggle');
  const muteIcon = document.getElementById('muteIcon');
  const timeline = document.getElementById('videoTimeline');
  const timeCurrent = document.getElementById('timeCurrent');
  const timeDuration = document.getElementById('timeDuration');

  if (!modal || !videoEl) return;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const openModal = () => {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    videoEl.currentTime = 0;
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => updatePlayIcon(true))
        .catch(() => updatePlayIcon(false));
    }
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    videoEl.pause();
    updatePlayIcon(false);
  };

  const updatePlayIcon = (isPlaying) => {
    if (!playPauseIcon) return;
    if (isPlaying) {
      playPauseIcon.innerHTML = `
        <rect x="6" y="4" width="4" height="16" fill="currentColor"></rect>
        <rect x="14" y="4" width="4" height="16" fill="currentColor"></rect>
      `;
      playPauseBtn.setAttribute('aria-label', 'Pause video');
    } else {
      playPauseIcon.innerHTML = `
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>
      `;
      playPauseBtn.setAttribute('aria-label', 'Play video');
    }
  };

  playTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Backdrop click closes modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      if (videoEl.paused) {
        videoEl.play();
        updatePlayIcon(true);
      } else {
        videoEl.pause();
        updatePlayIcon(false);
      }
    }
  });

  // Play/Pause toggle
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (videoEl.paused) {
        videoEl.play();
        updatePlayIcon(true);
      } else {
        videoEl.pause();
        updatePlayIcon(false);
      }
    });
  }

  // Mute / Unmute
  if (muteBtn && muteIcon) {
    muteBtn.addEventListener('click', () => {
      videoEl.muted = !videoEl.muted;
      if (videoEl.muted) {
        muteIcon.innerHTML = `
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke="currentColor" stroke-width="2"></polygon>
          <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2"></line>
          <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2"></line>
        `;
        muteBtn.setAttribute('aria-label', 'Unmute audio');
      } else {
        muteIcon.innerHTML = `
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke="currentColor" stroke-width="2"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" stroke-width="2"></path>
        `;
        muteBtn.setAttribute('aria-label', 'Mute audio');
      }
    });
  }

  // Progress Bar Timeline Sync
  if (videoEl && timeline) {
    videoEl.addEventListener('loadedmetadata', () => {
      timeline.max = Math.floor(videoEl.duration || 100);
      if (timeDuration) timeDuration.textContent = formatTime(videoEl.duration || 0);
    });

    videoEl.addEventListener('timeupdate', () => {
      timeline.value = Math.floor(videoEl.currentTime);
      if (timeCurrent) timeCurrent.textContent = formatTime(videoEl.currentTime);
    });

    timeline.addEventListener('input', () => {
      videoEl.currentTime = Number(timeline.value);
    });

    videoEl.addEventListener('ended', () => {
      updatePlayIcon(false);
    });
  }
}
