// Mobile nav toggle
const navToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

// Gallery filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentIndex = -1;

function getVisibleItems() {
  return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
}

function openLightbox(index) {
  const visible = getVisibleItems();
  if (index < 0 || index >= visible.length) return;

  currentIndex = index;
  const item = visible[index];
  const img = item.querySelector('img');

  lightboxImg.src = item.dataset.full || img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  const single = visible.length === 1;
  lightboxPrev.style.display = single ? 'none' : '';
  lightboxNext.style.display = single ? 'none' : '';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  currentIndex = -1;
}

function navigateLightbox(direction) {
  const visible = getVisibleItems();
  let newIndex = currentIndex + direction;
  if (newIndex < 0) newIndex = visible.length - 1;
  if (newIndex >= visible.length) newIndex = 0;
  openLightbox(newIndex);
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const visible = getVisibleItems();
    const index = visible.indexOf(item);
    if (index !== -1) openLightbox(index);
  });
});

if (lightbox) {
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
  document.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href*="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    if (hash.startsWith('#')) {
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
