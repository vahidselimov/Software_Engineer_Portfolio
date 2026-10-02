/**
 * VAHID SƏLIMOV — SOFTWARE ENGINEER PORTFOLIO SCRIPT
 * Features:
 * - Precision Developer Cursor
 * - Interactive Code Lab Tabs
 * - MotionSites Pill Filter with Dynamic Count
 * - Clipboard Quick Copy with Toast Feedback
 * - WhatsApp & Email Message Composer
 * - Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Precision Crosshair Cursor ---
  const cursorCrosshair = document.getElementById('cursorCrosshair');
  const cursorDot = document.getElementById('cursorDot');

  if (cursorCrosshair && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let crosshairX = mouseX;
    let crosshairY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const updateCrosshair = () => {
      crosshairX += (mouseX - crosshairX) * 0.2;
      crosshairY += (mouseY - crosshairY) * 0.2;
      cursorCrosshair.style.left = `${crosshairX}px`;
      cursorCrosshair.style.top = `${crosshairY}px`;
      requestAnimationFrame(updateCrosshair);
    };
    requestAnimationFrame(updateCrosshair);

    const interactives = document.querySelectorAll('a, button, input, textarea, select, .tech-card, .bento-card, .service-box, .pillar-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // --- 2. Interactive Code Lab Tabs ---
  const editorTabs = document.querySelectorAll('.editor-tab');
  const codePanels = document.querySelectorAll('.code-panel');
  const editorLangTag = document.querySelector('.editor-lang-tag');

  const langMap = {
    'tab-csharp': 'C# 13 · ASP.NET Core API',
    'tab-ts': 'TypeScript · Next.js Edge Proxy',
    'tab-docker': 'Docker Compose · PaaS Container'
  };

  editorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      editorTabs.forEach(t => t.classList.remove('active'));
      codePanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      if (editorLangTag && langMap[targetId]) {
        editorLangTag.textContent = langMap[targetId];
      }
    });
  });

  // --- 3. MotionSites Filter System ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const techCards = document.querySelectorAll('.tech-card');

  // Count items per category
  const counts = {
    all: techCards.length,
    frontend: 0,
    backend: 0,
    database: 0,
    devops: 0
  };

  techCards.forEach(card => {
    const cat = card.getAttribute('data-category');
    if (counts[cat] !== undefined) {
      counts[cat]++;
    }
  });

  const countAll = document.getElementById('count-all');
  const countFrontend = document.getElementById('count-frontend');
  const countBackend = document.getElementById('count-backend');
  const countDatabase = document.getElementById('count-database');
  const countDevops = document.getElementById('count-devops');

  if (countAll) countAll.textContent = counts.all;
  if (countFrontend) countFrontend.textContent = counts.frontend;
  if (countBackend) countBackend.textContent = counts.backend;
  if (countDatabase) countDatabase.textContent = counts.database;
  if (countDevops) countDevops.textContent = counts.devops;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      techCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // --- 4. Toast Notifications ---
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  const showToast = (msg) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  };

  // Quick Copy Buttons
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const quickCopyEmailBtn = document.getElementById('quickCopyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');

  const copyEmail = () => {
    navigator.clipboard.writeText('Vahidslimov01@gmail.com').then(() => {
      showToast('Email kopyalandı: Vahidslimov01@gmail.com');
    }).catch(() => {
      showToast('Kopyalanarkən xəta baş verdi');
    });
  };

  if (copyEmailBtn) copyEmailBtn.addEventListener('click', copyEmail);
  if (quickCopyEmailBtn) quickCopyEmailBtn.addEventListener('click', copyEmail);

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+994509621210').then(() => {
        showToast('Nömrə kopyalandı: +994 50 962 12 10');
      }).catch(() => {
        showToast('Kopyalanarkən xəta baş verdi');
      });
    });
  }

  // --- 5. Contact Form Handlers ---
  const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');
  const contactForm = document.getElementById('contactForm');

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const name = document.getElementById('userName').value.trim();
      const contact = document.getElementById('userContact').value.trim();
      const subject = document.getElementById('userSubject').value;
      const message = document.getElementById('userMessage').value.trim();

      if (!name || !message) {
        showToast('Zəhmət olmasa ad və mesajınızı qeyd edin');
        return;
      }

      const text = `Salam Vahid bəy! Mən ${name}.${contact ? ` Əlaqə: ${contact}.` : ''}%0A%0AMövzu: ${subject}%0A%0AMesaj: ${message}`;
      const url = `https://wa.me/994509621210?text=${text}`;
      window.open(url, '_blank');
      showToast('WhatsApp açılır...');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('userName').value.trim();
      const contact = document.getElementById('userContact').value.trim();
      const subject = document.getElementById('userSubject').value;
      const message = document.getElementById('userMessage').value.trim();

      const mailSubject = encodeURIComponent(`Portfolio Müraciəti: ${subject} - ${name}`);
      const mailBody = encodeURIComponent(`Ad və Soyad: ${name}\nƏlaqə: ${contact}\nMövzu: ${subject}\n\nMesaj:\n${message}`);

      window.location.href = `mailto:Vahidslimov01@gmail.com?subject=${mailSubject}&body=${mailBody}`;
      showToast('Email proqramı açılır...');
    });
  }

  // --- 6. Mobile Navigation ---
  const mobileToggle = document.getElementById('mobileToggle');
  const pillMenu = document.getElementById('pillMenu');

  if (mobileToggle && pillMenu) {
    mobileToggle.addEventListener('click', () => {
      pillMenu.classList.toggle('open');
    });

    pillMenu.querySelectorAll('.pill-item').forEach(link => {
      link.addEventListener('click', () => {
        pillMenu.classList.remove('open');
      });
    });
  }

  // --- 7. Reveal on Scroll ---
  const revealElements = document.querySelectorAll('.fade-in, .section-title, .section-desc, .tech-card, .bento-card, .service-box');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach(el => observer.observe(el));

  // --- 8. Dynamic Copyright Year ---
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
