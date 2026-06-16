const heroName = document.querySelector('.hero-name');
const heroStats = document.querySelectorAll('.stat-value');
const revealElements = document.querySelectorAll('.reveal');
const skillFills = document.querySelectorAll('.skill-fill');
const sectionLinks = document.querySelectorAll('.site-nav a, .mobile-nav a');
const sections = document.querySelectorAll('main section');
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const mobileNav = document.querySelector('.mobile-nav');
const contactForm = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');
const heroSection = document.getElementById('hero');
const profilePhoto = document.querySelector('.profile-photo');

function typewriterEffect() {
  const text = heroName.dataset.text.trim();
  heroName.textContent = '';
  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    heroName.appendChild(span);
    setTimeout(() => {
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';
    }, index * 80);
  });
}

function easeOutQuad(t) {
  return t * (2 - t);
}

function animateCounter(element, target) {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(easeOutQuad(progress) * target);
    element.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initSkillBars() {
  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillFills.forEach((fill) => {
            fill.style.width = `${fill.dataset.target}%`;
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillsObserver.observe(skillsSection);
}

function initSectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = document.querySelector(`.site-nav a[href="#${id}"], .mobile-nav a[href="#${id}"]`);
        if (entry.isIntersecting && link) {
          sectionLinks.forEach((item) => item.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initScrollEffects() {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.3;
    heroSection.style.setProperty('--hero-grid-offset', `${offset}px`);
    heroSection.style.backgroundPosition = `center calc(50% + ${offset}px)`;
  });
}

function initNav() {
  navToggle.addEventListener('click', () => {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
  });

  navClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
  });

  sectionLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}

function initContactForm() {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.textContent = '';
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (!name || !email || !message || !email.includes('@')) {
      formStatus.textContent = 'Please complete all fields with a valid email.';
      return;
    }

    const button = contactForm.querySelector('button');
    button.disabled = true;
    button.textContent = 'Sending...';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        formStatus.textContent = 'Message received ✓';
        contactForm.reset();
      } else {
        formStatus.textContent = 'Something went wrong — try LinkedIn instead.';
      }
    } catch (error) {
      formStatus.textContent = 'Something went wrong — try LinkedIn instead.';
    } finally {
      button.disabled = false;
      button.textContent = 'Send Message →';
    }
  });
}

function initCounters() {
  const statsSection = document.getElementById('hero-stats');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroStats.forEach((stat) => animateCounter(stat, Number(stat.dataset.target)));
          obs.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  if (statsSection) observer.observe(statsSection);
}

function initTimelineDelays() {
  const nodes = document.querySelectorAll('.timeline-node');
  nodes.forEach((node, index) => {
    node.style.transitionDelay = `${index * 0.1}s`;
  });
}

function initProfilePhotoFallback() {
  if (!profilePhoto) return;

  const markPhotoMissing = () => {
    profilePhoto.closest('.profile-photo-frame').classList.add('is-missing');
  };

  profilePhoto.addEventListener('error', markPhotoMissing);
  if (profilePhoto.complete && profilePhoto.naturalWidth === 0) markPhotoMissing();
}

window.addEventListener('DOMContentLoaded', () => {
  typewriterEffect();
  initRevealObserver();
  initSkillBars();
  initSectionObserver();
  initNav();
  initContactForm();
  initCounters();
  initTimelineDelays();
  initScrollEffects();
  initProfilePhotoFallback();
});
