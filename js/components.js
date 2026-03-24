/* ============================================
   HAYU PERKASA — Shared Components JS
   ============================================ */

// ---------- Navbar ----------
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Language toggle
  const langButtons = document.querySelectorAll('.lang-toggle button');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
}

function switchLanguage(lang) {
  document.querySelectorAll('[data-id][data-en]').forEach(el => {
    el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-id');
  });
}

// ---------- WhatsApp Widget ----------
function initWhatsApp(phone, defaultMessage) {
  const wa = document.createElement('a');
  wa.className = 'wa-float';
  wa.href = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Chat WhatsApp');
  wa.innerHTML = `
    <span class="wa-float-label">Chat Kami</span>
    <div class="wa-float-btn">
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.004 0C7.165 0 .003 7.16.003 15.997c0 2.82.737 5.573 2.14 7.998L.01 32l8.22-2.157a15.95 15.95 0 007.774 1.986C24.838 31.83 32 24.67 32 15.997 32 7.16 24.838 0 16.004 0zm0 29.27a13.39 13.39 0 01-6.833-1.87l-.49-.291-5.08 1.332 1.357-4.958-.32-.508a13.38 13.38 0 01-2.058-7.178c0-7.414 6.034-13.44 13.45-13.44 7.415 0 13.44 6.026 13.44 13.44 0 7.415-6.025 13.473-13.466 13.473zm7.37-10.08c-.404-.202-2.39-1.18-2.76-1.315-.37-.134-.64-.202-.91.202s-1.044 1.315-1.28 1.585-.472.303-.876.101c-.404-.202-1.705-.628-3.249-2.003-1.201-1.07-2.012-2.392-2.248-2.796-.236-.404-.025-.623.177-.824.182-.181.404-.472.607-.708.202-.236.27-.404.404-.674.135-.27.068-.506-.034-.708-.101-.202-.91-2.194-1.247-3.003-.328-.788-.661-.681-.91-.694l-.775-.013c-.27 0-.708.101-1.078.506-.37.404-1.416 1.383-1.416 3.375s1.45 3.913 1.652 4.183c.202.27 2.853 4.352 6.914 6.105.966.416 1.72.665 2.308.85.97.309 1.852.265 2.55.161.778-.116 2.39-.977 2.728-1.92.337-.944.337-1.754.236-1.92-.101-.168-.37-.27-.775-.473z"/>
      </svg>
    </div>
  `;
  document.body.appendChild(wa);
}

// ---------- Counter Animation ----------
function initCounterAnimation(selector) {
  const counters = document.querySelectorAll(selector);
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const startTime = performance.now();
  const suffix = el.getAttribute('data-suffix') || '';

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(easeOutQuart(progress) * target);
    el.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

// ---------- Scroll Reveal ----------
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// ---------- Format Rupiah ----------
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number).replace('IDR', 'Rp');
}

// ---------- Generate WA Message ----------
function generateWAMessage(productName, qty, location, name, phone) {
  return `Halo Hayu Perkasa,%0A%0ASaya *${name}* ingin menanyakan produk berikut:%0A%0A📦 Produk: *${productName}*%0A📏 Jumlah: ${qty}%0A📍 Lokasi Pengiriman: ${location}%0A📞 No. HP: ${phone}%0A%0AMohon informasi harga dan ketersediaan. Terima kasih!`;
}

// ---------- FAQ Accordion ----------
function initFAQAccordion(selector) {
  const faqItems = document.querySelectorAll(selector);
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });

      // Open clicked if was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ---------- Modal ----------
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initModals() {
  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        m.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });

  // Close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

// ---------- Smooth scroll for anchor links ----------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---------- WA Inquiry Button Delegation ----------
function initWAInquiry() {
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.wa-inquiry-btn');
    if (!btn) return;
    var product = btn.getAttribute('data-product');
    if (product) {
      var msg = encodeURIComponent('Halo, saya tertarik dengan ' + product + '.');
      window.open('https://wa.me/6281234166771?text=' + msg, '_blank', 'noopener');
    }
  });
}

// ---------- Initialize All ----------
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWhatsApp('6281234166771', 'Halo Hayu Perkasa, saya ingin bertanya tentang produk dan layanan Anda.');
  initScrollReveal();
  initSmoothScroll();
  initModals();
  initWAInquiry();

  // Counter animation if stats exist
  if (document.querySelector('[data-target]')) {
    initCounterAnimation('[data-target]');
  }

  // FAQ accordion if FAQ exists
  if (document.querySelector('.faq-item')) {
    initFAQAccordion('.faq-item');
  }
});
