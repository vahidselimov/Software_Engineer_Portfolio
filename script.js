/**
 * VAHID SƏLİMOV — SOFTWARE ENGINEER & FOUNDER PORTFOLIO
 * High-Tech 3D Interactive Engine:
 * 1. Three.js 3D Cybernetic Polyhedron & Starfield
 * 2. 3D Perspective Tilt Card Engine with Specular Glare
 * 3. Magnetic Sliding Pill Navbar & ScrollSpy
 * 4. Mobile Navigation Drawer
 * 5. ocaq.dev Global Edge Latency Radar Simulation
 * 6. Code Lab with Copy Code & Interactive Cloud Terminal
 * 7. Live Tech Stack Search & Category Filter
 * 8. Animated Metric Counters
 * 9. Precision Developer Cursor
 * 10. CV Modal & Exit Confirmation Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. THREE.JS 3D CYBERNETIC POLYHEDRON & QUANTUM STARFIELD
  // =========================================================================
  const init3DScene = () => {
    const canvas = document.getElementById('webglCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Outer Wireframe Polyhedron (Metallic Titanium - #dee2e6 / #6c757d)
    const polyGeometry = new THREE.IcosahedronGeometry(2.5, 1);
    const polyMaterial = new THREE.MeshBasicMaterial({
      color: 0xdee2e6,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const polyhedron = new THREE.Mesh(polyGeometry, polyMaterial);
    scene.add(polyhedron);

    // Inner Glowing Core (Points Matrix - #f8f9fa)
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMaterial = new THREE.PointsMaterial({
      color: 0xf8f9fa,
      size: 0.045,
      transparent: true,
      opacity: 0.75
    });
    const corePoints = new THREE.Points(coreGeometry, coreMaterial);
    scene.add(corePoints);

    // Ambient Floating Particles Cloud (220 particles - #adb5bd & #ced4da)
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xced4da,
      size: 0.035,
      transparent: true,
      opacity: 0.5
    });
    const starField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starField);

    // Mouse Tracking for 3D Camera Orbit & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // Scroll Reactive Offset
    let scrollY = 0;
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY || window.pageYOffset;
    }, { passive: true });

    // Window Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }, { passive: true });

    // Animation Loop
    let isRendering = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isRendering) return;
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth dampening towards mouse position (LERP)
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Polyhedron Rotations
      polyhedron.rotation.x = elapsedTime * 0.12 + targetY * 0.6;
      polyhedron.rotation.y = elapsedTime * 0.18 + targetX * 0.8;

      corePoints.rotation.x = -elapsedTime * 0.15 + targetY * 0.4;
      corePoints.rotation.y = -elapsedTime * 0.22 + targetX * 0.5;

      starField.rotation.y = elapsedTime * 0.02;

      // Camera parallax
      camera.position.x = targetX * 0.8;
      camera.position.y = -targetY * 0.8 - (scrollY * 0.001);

      renderer.render(scene, camera);
    };

    animate();

    // Pause rendering when tab is hidden to save battery & GPU
    document.addEventListener('visibilitychange', () => {
      isRendering = !document.hidden;
      if (isRendering) animate();
    });
  };

  init3DScene();

  // =========================================================================
  // 2. REFINED AMBIENT CARD SPOTLIGHT (NO WOBBLY 3D TILT - SMOOTH ELEVATION)
  // =========================================================================
  const initCardSpotlight = () => {
    // Elegant Apple/Linear/Vercel spotlight glare that tracks cursor smoothly without tilting or wobbling
    const cards = document.querySelectorAll(
      '.tech-card, .bento-card, .pillar-card, .service-box, .stat-bento-cell, .contact-item-card, .ide-window-frame, .ocaq-mockup-frame, [data-tilt], [data-spotlight]'
    );

    cards.forEach(card => {
      // Remove any lingering inline transforms from previous tilt scripts
      card.style.transform = '';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--spot-x', `${x}px`);
        card.style.setProperty('--spot-y', `${y}px`);
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        // Reset to center smoothly
        card.style.setProperty('--spot-x', '50%');
        card.style.setProperty('--spot-y', '50%');
      });
    });
  };

  initCardSpotlight();

  // =========================================================================
  // 3. MAGNETIC SLIDING PILL NAVBAR & ANTI-FLICKER SCROLLSPY
  // =========================================================================
  const pillMenu = document.getElementById('pillMenu');
  const navIndicator = document.getElementById('navIndicator');
  const pillItems = pillMenu ? pillMenu.querySelectorAll('.pill-item') : [];

  let currentActiveItem = null;
  let isUserClickingNav = false;
  let navClickTimer = null;

  const updateIndicatorPosition = (targetEl) => {
    if (!navIndicator || !targetEl || !pillMenu) return;
    // Guard: pillMenu is hidden on mobile screens
    if (pillMenu.offsetParent === null) {
      navIndicator.style.opacity = '0';
      return;
    }

    const menuRect = pillMenu.getBoundingClientRect();
    const itemRect = targetEl.getBoundingClientRect();

    if (itemRect.width === 0) return;

    const left = itemRect.left - menuRect.left;
    const width = itemRect.width;

    navIndicator.style.transform = `translateX(${left}px)`;
    navIndicator.style.width = `${width}px`;
    navIndicator.style.opacity = '1';
  };

  if (pillItems.length > 0 && navIndicator) {
    currentActiveItem = pillMenu.querySelector('.pill-item.active') || pillItems[0];
    
    // Initial placement
    updateIndicatorPosition(currentActiveItem);

    // Re-check after web fonts and layout settle
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const active = pillMenu.querySelector('.pill-item.active') || currentActiveItem;
        updateIndicatorPosition(active);
      });
    }

    window.addEventListener('load', () => {
      const active = pillMenu.querySelector('.pill-item.active') || currentActiveItem;
      updateIndicatorPosition(active);
    });

    pillItems.forEach(item => {
      item.addEventListener('mouseenter', () => updateIndicatorPosition(item));
      item.addEventListener('focus', () => updateIndicatorPosition(item));

      item.addEventListener('click', () => {
        isUserClickingNav = true;
        clearTimeout(navClickTimer);

        pillItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentActiveItem = item;
        updateIndicatorPosition(currentActiveItem);

        // Keep indicator locked on clicked target while smooth scroll executes
        navClickTimer = setTimeout(() => {
          isUserClickingNav = false;
        }, 850);
      });
    });

    pillMenu.addEventListener('mouseleave', () => {
      const active = pillMenu.querySelector('.pill-item.active') || currentActiveItem;
      updateIndicatorPosition(active);
    });

    window.addEventListener('resize', () => {
      const active = pillMenu.querySelector('.pill-item.active') || currentActiveItem;
      updateIndicatorPosition(active);
    }, { passive: true });

    // Anti-Flicker ScrollSpy
    const sections = document.querySelectorAll('section[id]');
    let scrollRafId = null;

    window.addEventListener('scroll', () => {
      if (isUserClickingNav) return;

      if (!scrollRafId) {
        scrollRafId = requestAnimationFrame(() => {
          scrollRafId = null;
          if (pillMenu.offsetParent === null) return;

          const scrollPos = window.scrollY + 220;
          const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

          if (isAtBottom) {
            const contactLink = pillMenu.querySelector('a[href="#contact"]');
            if (contactLink && !contactLink.classList.contains('active')) {
              pillItems.forEach(i => i.classList.remove('active'));
              contactLink.classList.add('active');
              currentActiveItem = contactLink;
              updateIndicatorPosition(contactLink);
            }
            return;
          }

          sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
              const matchLink = pillMenu.querySelector(`a[href="#${id}"]`);
              if (matchLink && !matchLink.classList.contains('active')) {
                pillItems.forEach(i => i.classList.remove('active'));
                matchLink.classList.add('active');
                currentActiveItem = matchLink;
                updateIndicatorPosition(matchLink);
              }
            }
          });
        });
      }
    }, { passive: true });
  }

  // =========================================================================
  // 4. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerCvBtn = document.getElementById('drawerCvBtn');

  const openMobileDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileToggle) mobileToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileToggle) mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileDrawer);

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeMobileDrawer();
    });

    mobileDrawer.querySelectorAll('.drawer-item').forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });
  }

  // =========================================================================
  // 5. OCAQ.DEV GLOBAL EDGE LATENCY RADAR SIMULATION
  // =========================================================================
  const edgeNodes = document.querySelectorAll('.edge-node-pill');
  const activeRouteText = document.getElementById('activeRouteText');
  const activePingBadge = document.getElementById('activePingBadge');
  const mockupPingText = document.getElementById('mockupPingText');

  const edgeRouteData = {
    baku: {
      route: 'client → baku-edge-01.ocaq.dev (TLS 1.3 · HTTP/3)',
      ms: 12,
      tier: 'ULTRA-FAST'
    },
    fra: {
      route: 'client → fra-mesh-04.ocaq.dev (Frankfurt Hub · BGP Anycast)',
      ms: 31,
      tier: 'LOW LATENCY'
    },
    lon: {
      route: 'client → lon-edge-02.ocaq.dev (London Docklands IXP)',
      ms: 38,
      tier: 'EXCELLENT'
    },
    sin: {
      route: 'client → sin-mesh-01.ocaq.dev (Singapore Equinix SG1)',
      ms: 84,
      tier: 'OPTIMIZED'
    },
    nyc: {
      route: 'client → nyc-edge-03.ocaq.dev (New York Metro Edge)',
      ms: 92,
      tier: 'GLOBAL ROUTE'
    }
  };

  edgeNodes.forEach(pill => {
    pill.addEventListener('click', () => {
      edgeNodes.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const region = pill.getAttribute('data-region');
      const data = edgeRouteData[region] || edgeRouteData['baku'];

      // Add small realistic ping jitter (± 1-2 ms)
      const jitter = Math.floor(Math.random() * 3) - 1;
      const actualMs = Math.max(8, data.ms + jitter);

      if (activeRouteText) activeRouteText.textContent = data.route;
      if (activePingBadge) activePingBadge.textContent = `${actualMs}ms · ${data.tier}`;
      if (mockupPingText) mockupPingText.textContent = `LATENCY: ${actualMs}ms`;
    });
  });

  // =========================================================================
  // 6. CODE LAB: COPY CODE & INTERACTIVE CLOUD TERMINAL
  // =========================================================================
  const editorTabs = document.querySelectorAll('.editor-tab');
  const codePanels = document.querySelectorAll('.code-panel');
  const editorLangTag = document.querySelector('.editor-lang-tag');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const copyCodeText = document.getElementById('copyCodeText');

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

  // Copy Code Button
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const activePanel = document.querySelector('.code-panel.active');
      if (!activePanel) return;

      const codeToCopy = activePanel.textContent;
      navigator.clipboard.writeText(codeToCopy).then(() => {
        if (copyCodeText) copyCodeText.textContent = 'Kopyalandı!';
        copyCodeBtn.classList.add('active');
        showToast('Kod panoya kopyalandı');

        setTimeout(() => {
          if (copyCodeText) copyCodeText.textContent = 'Kodu Kopyala';
          copyCodeBtn.classList.remove('active');
        }, 2200);
      }).catch(() => {
        showToast('Kopyalanarkən xəta baş verdi');
      });
    });
  }

  // Interactive Cloud Terminal Prompt
  const terminalInput = document.getElementById('terminalInput');
  const termRunBtn = document.getElementById('termRunBtn');
  const terminalLog = document.getElementById('terminalLog');
  const termChips = document.querySelectorAll('.term-chip');

  const appendTerminalLog = (type, message) => {
    if (!terminalLog) return;
    const now = new Date();
    const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;

    const line = document.createElement('div');
    line.className = 'log-line';

    let colorClass = 'log-info';
    if (type === 'success') colorClass = 'log-success';
    if (type === 'warn') colorClass = 'log-warn';

    line.innerHTML = `<span class="log-time">${timeStr}</span> <span class="${colorClass}">${message}</span>`;
    terminalLog.appendChild(line);
    terminalLog.scrollTop = terminalLog.scrollHeight;
  };

  const executeTerminalCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    appendTerminalLog('info', `&gt; vahid@ocaq-cloud:~$ ${rawCmd}`);

    if (cmd === 'clear') {
      if (terminalLog) terminalLog.innerHTML = '';
      return;
    }

    if (cmd === 'help') {
      appendTerminalLog('info', 'Mövcud əmrlər:');
      appendTerminalLog('success', '• deploy  — ocaq.dev bulud platformasında avtomatik CI/CD testini başladır');
      appendTerminalLog('success', '• status  — Aktiv mikroxidmətlər və cluster vəziyyətini yoxlayır');
      appendTerminalLog('success', '• nodes   — 35+ qlobal edge server marşrutlarını siyahıya alır');
      appendTerminalLog('success', '• about   — Vahid Səlimov haqqında qısa mühəndis profili');
      appendTerminalLog('success', '• clear   — Terminal loglarını təmizləyir');
      return;
    }

    if (cmd.includes('deploy')) {
      appendTerminalLog('warn', 'Starting automated Git push webhook deployment...');
      setTimeout(() => {
        appendTerminalLog('info', 'Cloning commit: feat(edge): integrate HTTP/3 Brotli compression');
        appendTerminalLog('info', 'Building Docker image: ocaqdev/core-api:2.4.0');
        appendTerminalLog('success', '✓ Build succeeded. Image size: 84.2MB');
        appendTerminalLog('success', '✓ Artifact propagated to 35 Global Edge Regions in 1.42s');
        appendTerminalLog('success', '✓ HealthCheck passed: https://vahid.ocaq.dev (Latency: 12ms)');
      }, 350);
      return;
    }

    if (cmd.includes('status')) {
      appendTerminalLog('success', 'Cluster Status: 100% HEALTHY');
      appendTerminalLog('info', 'Active Pods: 36 | CPU: 14% | RAM: 28% | Up-Time: 99.99%');
      appendTerminalLog('info', 'Regions: Baku, Frankfurt, London, Singapore, New York');
      return;
    }

    if (cmd.includes('node') || cmd.includes('nodes')) {
      appendTerminalLog('info', 'Mesh Node Registry:');
      appendTerminalLog('success', '• Baku-Edge-01    (40.4093° N, 49.8671° E)  — 12ms');
      appendTerminalLog('success', '• Frankfurt-Central (50.1109° N, 8.6821° E)   — 31ms');
      appendTerminalLog('success', '• London-Docklands  (51.5074° N, 0.1278° W)   — 38ms');
      appendTerminalLog('success', '• Singapore-SG1     (1.3521° N, 103.8198° E)  — 84ms');
      appendTerminalLog('success', '• NYC-Metro         (40.7128° N, 74.0060° W)  — 92ms');
      return;
    }

    if (cmd.includes('about')) {
      appendTerminalLog('success', 'Vahid Səlimov — Software Engineer & Founder @ ocaq.dev');
      appendTerminalLog('info', 'Stack: C#, .NET 9, React, Next.js, Docker, PostgreSQL');
      return;
    }

    appendTerminalLog('warn', `Əmr tapılmadı: "${rawCmd}". Mövcud əmrləri görmək üçün "help" yazın.`);
  };

  if (termRunBtn && terminalInput) {
    termRunBtn.addEventListener('click', () => {
      executeTerminalCommand(terminalInput.value);
      terminalInput.value = '';
    });

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeTerminalCommand(terminalInput.value);
        terminalInput.value = '';
      }
    });
  }

  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) executeTerminalCommand(cmd);
    });
  });

  // =========================================================================
  // 7. REAL-TIME TECH SEARCH & CATEGORY FILTER
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const techCards = document.querySelectorAll('.tech-card');
  const techSearchInput = document.getElementById('techSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchResultsInfo = document.getElementById('searchResultsInfo');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  const applySkillsFilter = () => {
    let visibleCount = 0;

    techCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchesCategory = (currentCategory === 'all' || cat === currentCategory);
      const matchesSearch = (!currentSearchQuery || text.includes(currentSearchQuery));

      if (matchesCategory && matchesSearch) {
        card.classList.remove('filtered-out');
        visibleCount++;
      } else {
        card.classList.add('filtered-out');
      }
    });

    if (searchResultsInfo) {
      if (currentSearchQuery) {
        searchResultsInfo.textContent = `${visibleCount} texnologiya tapıldı (axtarış: "${currentSearchQuery}")`;
      } else {
        searchResultsInfo.textContent = '';
      }
    }
  };

  // Category counts
  const counts = {
    all: techCards.length,
    frontend: 0,
    backend: 0,
    database: 0,
    devops: 0
  };

  techCards.forEach(card => {
    const cat = card.getAttribute('data-category');
    if (counts[cat] !== undefined) counts[cat]++;
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
      currentCategory = btn.getAttribute('data-filter') || 'all';
      applySkillsFilter();
    });
  });

  if (techSearchInput) {
    techSearchInput.addEventListener('input', () => {
      currentSearchQuery = techSearchInput.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = currentSearchQuery ? 'block' : 'none';
      }
      applySkillsFilter();
    });
  }

  if (clearSearchBtn && techSearchInput) {
    clearSearchBtn.addEventListener('click', () => {
      techSearchInput.value = '';
      currentSearchQuery = '';
      clearSearchBtn.style.display = 'none';
      applySkillsFilter();
    });
  }

  // =========================================================================
  // 8. TOAST NOTIFICATIONS & CLIPBOARD QUICK COPY
  // =========================================================================
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

  // =========================================================================
  // 9. CONTACT FORM HANDLERS
  // =========================================================================
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

  // =========================================================================
  // 10. PRECISION CROSSHAIR CURSOR
  // =========================================================================
  const cursorCrosshair = document.getElementById('cursorCrosshair');
  const cursorDot = document.getElementById('cursorDot');

  if (cursorCrosshair && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let curMouseX = window.innerWidth / 2;
    let curMouseY = window.innerHeight / 2;
    let crosshairX = curMouseX;
    let crosshairY = curMouseY;

    window.addEventListener('mousemove', (e) => {
      curMouseX = e.clientX;
      curMouseY = e.clientY;
      cursorDot.style.left = `${curMouseX}px`;
      cursorDot.style.top = `${curMouseY}px`;
    }, { passive: true });

    const updateCrosshair = () => {
      crosshairX += (curMouseX - crosshairX) * 0.2;
      crosshairY += (curMouseY - crosshairY) * 0.2;
      cursorCrosshair.style.left = `${crosshairX}px`;
      cursorCrosshair.style.top = `${crosshairY}px`;
      requestAnimationFrame(updateCrosshair);
    };
    requestAnimationFrame(updateCrosshair);

    const interactives = document.querySelectorAll('a, button, input, textarea, select, [data-tilt], .pill-item, .edge-node-pill');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // =========================================================================
  // 11. REVEAL ON SCROLL & DYNAMIC COPYRIGHT YEAR
  // =========================================================================
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

  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================================================================
  // 12. CV MODAL & EXIT CONFIRMATION ENGINE
  // =========================================================================
  const cvModal = document.getElementById('cvModal');
  const cvExitConfirmModal = document.getElementById('cvExitConfirmModal');
  const cvIframe = document.getElementById('cvIframe');
  const cvFileNameDisplay = document.getElementById('cvFileNameDisplay');
  const cvStatusText = document.getElementById('cvStatusText');
  const cvOpenTabBtn = document.getElementById('cvOpenTabBtn');
  const cvFallbackDownloadBtn = document.getElementById('cvFallbackDownloadBtn');
  const exitLangName = document.getElementById('exitLangName');

  const openCvBtn = document.getElementById('openCvBtn');
  const navCvQuickBtn = document.getElementById('navCvQuickBtn');
  const heroCvBtn = document.getElementById('heroCvBtn');
  const cvCloseBtn = document.getElementById('cvCloseBtn');
  const cvDotClose = document.getElementById('cvDotClose');
  const cvDownloadBtn = document.getElementById('cvDownloadBtn');
  const cvLangAzBtn = document.getElementById('cvLangAzBtn');
  const cvLangEnBtn = document.getElementById('cvLangEnBtn');

  const confirmDownloadAndExit = document.getElementById('confirmDownloadAndExit');
  const confirmJustExit = document.getElementById('confirmJustExit');
  const cancelExit = document.getElementById('cancelExit');

  let currentCvLang = 'az';
  let hasDownloadedCv = false;

  const cvData = {
    az: {
      url: 'assets/cv/Vahid_Salimov_Resume_AZ.pdf',
      fileName: 'Vahid_Salimov_Resume_AZ.pdf',
      langLabel: 'Azərbaycan',
      status: 'Hazırda baxılır: Azərbaycan dili (AZ) · PDF formatı'
    },
    en: {
      url: 'assets/cv/Vahid_Salimov_Resume_EN.pdf',
      fileName: 'Vahid_Salimov_Resume_EN.pdf',
      langLabel: 'İngilis (EN)',
      status: 'Currently viewing: English (EN) · PDF format'
    }
  };

  const switchCvLanguage = (lang) => {
    if (!cvData[lang]) return;
    currentCvLang = lang;

    if (lang === 'az') {
      if (cvLangAzBtn) cvLangAzBtn.classList.add('active');
      if (cvLangEnBtn) cvLangEnBtn.classList.remove('active');
    } else {
      if (cvLangEnBtn) cvLangEnBtn.classList.add('active');
      if (cvLangAzBtn) cvLangAzBtn.classList.remove('active');
    }

    const data = cvData[lang];
    if (cvIframe) cvIframe.src = `${data.url}#toolbar=0`;
    if (cvFileNameDisplay) cvFileNameDisplay.textContent = data.fileName;
    if (cvStatusText) cvStatusText.textContent = data.status;
    if (cvOpenTabBtn) cvOpenTabBtn.href = data.url;
    if (cvFallbackDownloadBtn) {
      cvFallbackDownloadBtn.href = data.url;
      cvFallbackDownloadBtn.setAttribute('download', data.fileName);
    }
    if (exitLangName) exitLangName.textContent = data.langLabel;
  };

  const downloadCurrentCv = () => {
    const data = cvData[currentCvLang];
    const link = document.createElement('a');
    link.href = data.url;
    link.download = data.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    hasDownloadedCv = true;
    showToast(`Vahid Səlimovun CV-si (${data.langLabel}) yükləndi!`);
  };

  const openCvModal = () => {
    hasDownloadedCv = false;
    switchCvLanguage('az');
    if (cvModal) cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const attemptCloseCv = () => {
    if (hasDownloadedCv) {
      forceCloseAllCvModals();
    } else {
      if (cvExitConfirmModal) cvExitConfirmModal.classList.add('active');
    }
  };

  const forceCloseAllCvModals = () => {
    if (cvExitConfirmModal) cvExitConfirmModal.classList.remove('active');
    if (cvModal) cvModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (openCvBtn) openCvBtn.addEventListener('click', openCvModal);
  if (navCvQuickBtn) navCvQuickBtn.addEventListener('click', openCvModal);
  if (heroCvBtn) heroCvBtn.addEventListener('click', openCvModal);
  if (drawerCvBtn) drawerCvBtn.addEventListener('click', () => {
    closeMobileDrawer();
    openCvModal();
  });

  if (cvLangAzBtn) cvLangAzBtn.addEventListener('click', () => switchCvLanguage('az'));
  if (cvLangEnBtn) cvLangEnBtn.addEventListener('click', () => switchCvLanguage('en'));

  if (cvDownloadBtn) cvDownloadBtn.addEventListener('click', downloadCurrentCv);
  if (cvCloseBtn) cvCloseBtn.addEventListener('click', attemptCloseCv);
  if (cvDotClose) cvDotClose.addEventListener('click', attemptCloseCv);

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) attemptCloseCv();
    });
  }

  if (confirmDownloadAndExit) {
    confirmDownloadAndExit.addEventListener('click', () => {
      downloadCurrentCv();
      forceCloseAllCvModals();
      showToast('CV yükləndi və pəncərə bağlandı');
    });
  }

  if (confirmJustExit) confirmJustExit.addEventListener('click', forceCloseAllCvModals);
  if (cancelExit) cancelExit.addEventListener('click', () => {
    if (cvExitConfirmModal) cvExitConfirmModal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cvExitConfirmModal && cvExitConfirmModal.classList.contains('active')) {
        cvExitConfirmModal.classList.remove('active');
      } else if (cvModal && cvModal.classList.contains('active')) {
        attemptCloseCv();
      }
    }
  });

});
