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


// ===== CARD DECK =====
const deckProducts = [
  { src: 'images/Vibro Unipaver.png',                name: 'Vibro Unipaver',            cat: 'Vibro Compaction' },
  { src: 'images/Vibro Brick Paver.png',             name: 'Vibro Brick Paver',          cat: 'Vibro Compaction' },
  { src: 'images/Vibro Square 150 x 150 x 60MM.png', name: 'Vibro Square 150×150',       cat: 'Vibro Compaction' },
  { src: 'images/Vibro Square 200 x 200 x 60MM.png', name: 'Vibro Square 200×200',       cat: 'Vibro Compaction' },
  { src: 'images/Rubbermould Square.png',            name: 'Rubbermould Square 150×150', cat: 'Rubbermould' },
  { src: 'images/Rubbermould Unipaver.png',          name: 'Rubbermould Unipaver',        cat: 'Rubbermould' },
  { src: 'images/Rubbermould Square 200x200.png',    name: 'Rubbermould Square 200×200', cat: 'Rubbermould' },
  { src: 'images/Hollow Blocks.png',                 name: 'Hollow Block',               cat: 'Blocks' },
  { src: 'images/Solid Block.png',                   name: 'Solid Block',                cat: 'Blocks' },
  { src: 'images/Flyash Bricks.png',                 name: 'Fly Ash Bricks',             cat: 'Eco Bricks' },
  { src: 'images/Curb Stone.png',                    name: 'Kerbstone',                  cat: 'Kerbs' },
  { src: 'images/Grass Pavers.png',                  name: 'Grass Pavers',               cat: 'Specialty' },
];

const deckEl = document.getElementById('cardDeck');
let deckHead = 0;
let deckBusy = false;

// Build 3 card elements; each tracks its current slot
const deckCards = [0, 1, 2].map(slot => {
  const el = document.createElement('div');
  el.className = 'deck-card';
  el.dataset.slot = String(slot);
  el.innerHTML = `<img src="" alt=""><div class="card-footer"><div class="card-name"></div><div class="card-cat"></div></div>`;
  deckEl.appendChild(el);
  return { el, slot };
});

function fillCard(c) {
  const p = deckProducts[(deckHead + c.slot) % deckProducts.length];
  c.el.querySelector('img').src = p.src;
  c.el.querySelector('img').alt = p.name;
  c.el.querySelector('.card-name').textContent = p.name;
  c.el.querySelector('.card-cat').textContent = p.cat;
}

deckCards.forEach(fillCard);

function advanceDeck() {
  if (deckBusy) return;
  deckBusy = true;

  const top = deckCards.find(c => c.slot === 0);

  // Fly out the front card; immediately shift the others forward
  top.el.classList.add('fly-out');
  deckCards.forEach(c => {
    if (c.slot > 0) { c.slot--; c.el.dataset.slot = String(c.slot); }
  });

  setTimeout(() => {
    // Instantly reposition the flew-out card to the back (slot 2)
    top.el.style.transition = 'none';
    top.el.classList.remove('fly-out');
    top.slot = 2;
    top.el.dataset.slot = '2';

    // Advance product head and load new product onto back card
    deckHead = (deckHead + 1) % deckProducts.length;
    fillCard(top);

    // Re-enable transitions after paint
    requestAnimationFrame(() => requestAnimationFrame(() => {
      top.el.style.transition = '';
      deckBusy = false;
    }));
  }, 560);
}

// Click front card to advance
deckEl.addEventListener('click', () => {
  clearInterval(deckTimer);
  advanceDeck();
  deckTimer = setInterval(advanceDeck, 3000);
});

let deckTimer = setInterval(advanceDeck, 3000);

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
