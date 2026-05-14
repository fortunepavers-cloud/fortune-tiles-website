// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PRODUCT TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tab = btn.dataset.tab;
    productCards.forEach(card => {
      if (tab === 'all' || card.dataset.category === tab) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== EMAILJS INIT =====
emailjs.init('YOUR_PUBLIC_KEY');

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    .then(() => {
      success.classList.add('show');
      this.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Inquiry';
      setTimeout(() => success.classList.remove('show'), 5000);
    })
    .catch(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Inquiry';
      alert('Failed to send. Please call us directly at +91 72289 99995.');
    });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .info-card, .app-card, .person-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ===== PRODUCT QUOTE BUTTONS =====
document.querySelectorAll('.product-card').forEach(card => {
  const body = card.querySelector('.product-card-body');
  if (!body) return;
  const btn = document.createElement('a');
  btn.className = 'product-quote-btn';
  btn.innerHTML = 'View Details <i class="fa-solid fa-arrow-right"></i>';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const href = card.getAttribute('onclick').match(/'([^']+)'/)[1];
    location.href = href;
  });
  body.appendChild(btn);
});

// ===== PRODUCT SLIDER =====
const slides = document.querySelectorAll('.slide');
const sDots = document.querySelectorAll('.s-dot');
let activeSlide = 0;

function gotoSlide(idx) {
  slides[activeSlide].classList.remove('active');
  sDots[activeSlide].classList.remove('active');
  activeSlide = (idx + slides.length) % slides.length;
  slides[activeSlide].classList.add('active');
  sDots[activeSlide].classList.add('active');
}

let sliderTimer = setInterval(() => gotoSlide(activeSlide + 1), 2000);

sDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(sliderTimer);
    gotoSlide(i);
    sliderTimer = setInterval(() => gotoSlide(activeSlide + 1), 2000);
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = (scrollY >= top && scrollY < top + height) ? '#ffffff' : '';
    }
  });
});
