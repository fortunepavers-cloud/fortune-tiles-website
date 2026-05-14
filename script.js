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

// ===== PRODUCT ORBIT =====
const orbitProducts = [
  { src: 'images/Vibro Unipaver.png',                alt: 'Vibro Unipaver' },
  { src: 'images/Vibro Brick Paver.png',             alt: 'Vibro Brick Paver' },
  { src: 'images/Vibro Square 150 x 150 x 60MM.png', alt: 'Vibro Square 150mm' },
  { src: 'images/Vibro Square 200 x 200 x 60MM.png', alt: 'Vibro Square 200mm' },
  { src: 'images/Rubbermould Square.png',            alt: 'Rubbermould Square 150×150' },
  { src: 'images/Rubbermould Unipaver.png',          alt: 'Rubbermould Unipaver' },
  { src: 'images/Rubbermould Square 200x200.png',    alt: 'Rubbermould 200×200' },
  { src: 'images/Hollow Blocks.png',                 alt: 'Hollow Block' },
  { src: 'images/Solid Block.png',                   alt: 'Solid Block' },
  { src: 'images/Flyash Bricks.png',                 alt: 'Fly Ash Bricks' },
  { src: 'images/Curb Stone.png',                    alt: 'Kerbstone' },
  { src: 'images/Grass Pavers.png',                  alt: 'Grass Pavers' },
];

const orbitContainer = document.getElementById('productOrbit');
const orbitCenterImg = document.getElementById('orbitCenterImg');
const ORBIT_RADIUS   = 158;
const ORBIT_SIZE     = 400;
let activeOrbit = 0;

const orbitItemEls = orbitProducts.map((p, i) => {
  const item = document.createElement('div');
  item.className = 'orbit-item';
  item.innerHTML = `<img src="${p.src}" alt="${p.alt}">`;
  const angle = (i / orbitProducts.length) * 2 * Math.PI - Math.PI / 2;
  item.style.left = (ORBIT_SIZE / 2 + ORBIT_RADIUS * Math.cos(angle)) + 'px';
  item.style.top  = (ORBIT_SIZE / 2 + ORBIT_RADIUS * Math.sin(angle)) + 'px';
  item.addEventListener('click', () => {
    clearInterval(orbitTimer);
    setOrbitActive(i);
    orbitTimer = setInterval(orbitNext, 2000);
  });
  orbitContainer.appendChild(item);
  return item;
});

function setOrbitActive(idx) {
  orbitItemEls[activeOrbit].classList.remove('active');
  activeOrbit = idx;
  orbitItemEls[activeOrbit].classList.add('active');
  orbitCenterImg.style.opacity = '0';
  setTimeout(() => {
    orbitCenterImg.src = orbitProducts[activeOrbit].src;
    orbitCenterImg.alt = orbitProducts[activeOrbit].alt;
    orbitCenterImg.style.opacity = '1';
  }, 180);
}

function orbitNext() {
  setOrbitActive((activeOrbit + 1) % orbitProducts.length);
}

setOrbitActive(0);
let orbitTimer = setInterval(orbitNext, 2000);

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
