// ===== LOGO PROCESSING =====
function removeWhiteBg(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = id.data;
  const w = canvas.width, h = canvas.height;

  // Flood-fill from edges to mark background white pixels → transparent
  const visited = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) {
    for (const y of [0, h - 1]) {
      const p = y * w + x;
      if (!visited[p] && d[p*4] > 220 && d[p*4+1] > 220 && d[p*4+2] > 220) { visited[p] = 1; stack.push(p); }
    }
  }
  for (let y = 0; y < h; y++) {
    for (const x of [0, w - 1]) {
      const p = y * w + x;
      if (!visited[p] && d[p*4] > 220 && d[p*4+1] > 220 && d[p*4+2] > 220) { visited[p] = 1; stack.push(p); }
    }
  }
  while (stack.length) {
    const p = stack.pop();
    d[p*4+3] = 0;
    const x = p % w, y = Math.floor(p / w);
    for (const [nx, ny] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const np = ny * w + nx;
        if (!visited[np] && d[np*4] > 220 && d[np*4+1] > 220 && d[np*4+2] > 220) { visited[np] = 1; stack.push(np); }
      }
    }
  }

  // In text area (right 72% of image): convert dark pixels to white
  for (let y = 0; y < h; y++) {
    for (let x = Math.floor(w * 0.28); x < w; x++) {
      const i = (y * w + x) * 4;
      if (d[i+3] === 0) continue;
      const max = Math.max(d[i], d[i+1], d[i+2]);
      const sat = max === 0 ? 0 : (max - Math.min(d[i], d[i+1], d[i+2])) / max;
      if (max < 160 && sat < 0.2) d[i] = d[i+1] = d[i+2] = 255;
    }
  }

  ctx.putImageData(id, 0, 0);
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
