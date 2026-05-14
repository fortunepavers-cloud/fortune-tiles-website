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


// ===== SHOWCASE CARD =====
const showcaseData = [
  { src: 'images/Vibro Unipaver.png',                name: 'Vibro Unipaver',             cat: 'Vibro Compaction' },
  { src: 'images/Vibro Brick Paver.png',             name: 'Vibro Brick Paver',           cat: 'Vibro Compaction' },
  { src: 'images/Vibro Square 150 x 150 x 60MM.png', name: 'Vibro Square 150×150',        cat: 'Vibro Compaction' },
  { src: 'images/Vibro Square 200 x 200 x 60MM.png', name: 'Vibro Square 200×200',        cat: 'Vibro Compaction' },
  { src: 'images/Rubbermould Square.png',            name: 'Rubbermould Square 150×150',  cat: 'Rubbermould' },
  { src: 'images/Rubbermould Unipaver.png',          name: 'Rubbermould Unipaver',         cat: 'Rubbermould' },
  { src: 'images/Rubbermould Square 200x200.png',    name: 'Rubbermould Square 200×200',  cat: 'Rubbermould' },
  { src: 'images/Hollow Blocks.png',                 name: 'Hollow Block',                cat: 'Blocks' },
  { src: 'images/Solid Block.png',                   name: 'Solid Block',                 cat: 'Blocks' },
  { src: 'images/Flyash Bricks.png',                 name: 'Fly Ash Bricks',              cat: 'Eco Bricks' },
  { src: 'images/Curb Stone.png',                    name: 'Kerbstone',                   cat: 'Kerbs' },
  { src: 'images/Grass Pavers.png',                  name: 'Grass Pavers',                cat: 'Specialty' },
];

const showcaseWrap  = document.getElementById('showcaseWrap');
const showcaseCard  = document.getElementById('showcaseCardInner');
const showcaseImg   = document.getElementById('showcaseImg');
const showcaseName  = document.getElementById('showcaseName');
const showcaseCat   = document.getElementById('showcaseCat');
const showcaseShine = document.getElementById('showcaseShine');
const dotsContainer = document.getElementById('showcaseDots');
let activeShowcase  = 0;

const scDots = showcaseData.map((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'sc-dot';
  dot.addEventListener('click', () => {
    clearInterval(showcaseTimer);
    setShowcase(i);
    showcaseTimer = setInterval(showcaseNext, 3000);
  });
  dotsContainer.appendChild(dot);
  return dot;
});

showcaseWrap.addEventListener('mousemove', (e) => {
  const rect = showcaseCard.getBoundingClientRect();
  const dx = (e.clientX - rect.left - rect.width / 2)  / (rect.width / 2);
  const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
  showcaseCard.style.transform = `rotateY(${dx * 14}deg) rotateX(${-dy * 12}deg)`;
  const px = ((e.clientX - rect.left) / rect.width) * 100;
  const py = ((e.clientY - rect.top)  / rect.height) * 100;
  showcaseShine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.2) 0%, transparent 55%)`;
});

showcaseWrap.addEventListener('mouseleave', () => {
  showcaseCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
  showcaseShine.style.background = 'radial-gradient(circle at 50% -20%, rgba(255,255,255,0.18) 0%, transparent 55%)';
});

function setShowcase(idx) {
  scDots[activeShowcase].classList.remove('active');
  activeShowcase = ((idx % showcaseData.length) + showcaseData.length) % showcaseData.length;
  scDots[activeShowcase].classList.add('active');
  const p = showcaseData[activeShowcase];
  showcaseImg.style.opacity = '0';
  showcaseImg.style.transform = 'translateY(10px) scale(0.95)';
  setTimeout(() => {
    showcaseImg.src = p.src;
    showcaseImg.alt = p.name;
    showcaseName.textContent = p.name;
    showcaseCat.textContent = p.cat;
    showcaseImg.style.opacity = '1';
    showcaseImg.style.transform = 'translateY(0) scale(1)';
  }, 200);
}

function showcaseNext() { setShowcase(activeShowcase + 1); }

setShowcase(0);
let showcaseTimer = setInterval(showcaseNext, 3000);

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
