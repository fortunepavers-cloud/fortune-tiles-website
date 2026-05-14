// ===== LOGO WHITE BACKGROUND REMOVAL =====
function removeWhiteBg(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < d.data.length; i += 4) {
    const r = d.data[i], g = d.data[i+1], b = d.data[i+2];
    const max = Math.max(r, g, b);
    const sat = max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
    if (r > 220 && g > 220 && b > 220) {
      d.data[i+3] = 0;                                        // white → transparent
    } else if (max < 80 && sat < 0.2) {
      d.data[i] = d.data[i+1] = d.data[i+2] = 255;          // black/dark → white
    }
  }
  ctx.putImageData(d, 0, 0);
  img.src = canvas.toDataURL();
}
document.querySelectorAll('.logo-full-img').forEach(img => {
  img.complete ? removeWhiteBg(img) : img.addEventListener('load', () => removeWhiteBg(img));
});

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

// ===== CONTACT FORM — WHATSAPP =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = this.querySelector('[name="from_name"]').value.trim();
  const phone   = this.querySelector('[name="phone"]').value.trim();
  const email   = this.querySelector('[name="from_email"]').value.trim();
  const product = this.querySelector('[name="product"]').value.trim();
  const message = this.querySelector('[name="message"]').value.trim();

  let text = `Hello, I am interested in Fortune Tiles & Pavers products.\n\n`;
  text += `*Name:* ${name}\n`;
  text += `*Phone:* ${phone}\n`;
  if (email) text += `*Email:* ${email}\n`;
  if (product) text += `*Product:* ${product}\n`;
  text += `*Message:* ${message}`;

  window.open(`https://wa.me/917228999995?text=${encodeURIComponent(text)}`, '_blank');
  this.reset();
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
  const btn = document.createElement('a');
  btn.className = 'product-quote-btn';
  btn.innerHTML = 'View Details <i class="fa-solid fa-arrow-right"></i>';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const href = card.getAttribute('onclick').match(/'([^']+)'/)[1];
    location.href = href;
  });
  card.appendChild(btn);
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
