/* ==========================================================================
   ABIL ANANDAN PORTFOLIO — INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Header Scroll & Active Nav State */
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Tracking
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* 2. Mobile Menu Toggle */
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (mainNav.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        if (mobileToggle.querySelector('i')) {
          mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        }
      });
    });
  }

  /* 3. Hero Animated Counter Stats */
  const statNums = document.querySelectorAll('.stat-num');
  let animatedStats = false;

  function runStatsAnimation() {
    statNums.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'), 10);
      let count = 0;
      const increment = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          num.innerText = target;
          clearInterval(timer);
        } else {
          num.innerText = count;
        }
      }, 40);
    });
  }

  // Trigger stats animation when hero is in view
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animatedStats) {
        animatedStats = true;
        runStatsAnimation();
      }
    }, { threshold: 0.3 });
    observer.observe(heroSection);
  }

  /* 4. Skills Matrix Filtering */
  const skillTabs = document.querySelectorAll('#skillTabs .tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  /* 5. Portfolio Works Filtering */
  const workTabs = document.querySelectorAll('#workTabs .tab-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  workTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      workTabs.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-work-filter');
      portfolioCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-work-cat') === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* 6. Brand Lab Swatches - Copy to Clipboard */
  const swatches = document.querySelectorAll('.swatch');
  const copyToast = document.getElementById('copyToast');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-hex');
      navigator.clipboard.writeText(hex).then(() => {
        if (copyToast) {
          copyToast.innerText = `COPIED ${hex} TO CLIPBOARD!`;
          copyToast.style.display = 'block';
          setTimeout(() => {
            copyToast.style.display = 'none';
          }, 2000);
        }
      });
    });
  });

  /* 7. Brand Lab Typography Specimen Tester */
  const typeInput = document.getElementById('typeInput');
  const typePreview = document.getElementById('typePreview');

  if (typeInput && typePreview) {
    typeInput.addEventListener('input', (e) => {
      const text = e.target.value.toUpperCase();
      typePreview.innerText = text || 'ABIL ANANDAN — CODER & BRAND DESIGNER';
    });
  }

  /* 8. Portfolio Modal Case Studies */
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const modalBtns = document.querySelectorAll('.btn-modal-open');

  const projectDetails = {
    '1': {
      title: 'AETHER BRAND IDENTITY & GUIDELINES',
      category: 'BRANDING & VISUAL IDENTITY',
      image: './assets/branding.jpg',
      deliverables: ['Brand Strategy', 'Logo Suite', 'Color System Tokens', 'Brand Guidelines Booklet', 'Stationery Design'],
      overview: 'AETHER required an ultra-clean, tech-forward brand identity built around obsidian dark backgrounds and high-visibility metallic copper/orange accents. The project included comprehensive grid structures, typography rules, and vector asset guidelines.'
    },
    '2': {
      title: 'NIGHTWATCH CYBER MONITOR DASHBOARD',
      category: 'CODING & WEB DEVELOPMENT',
      image: './assets/coding.jpg',
      deliverables: ['HTML5/CSS Architecture', 'Vanilla JS Analytics', 'Responsive Grid UI', 'Performance Optimization'],
      overview: 'NIGHTWATCH is a sleek dark-mode cyber intelligence dashboard built for high visual density and rapid readability. Features dynamic network telemetry charts, live alert status indicators, and modular code widgets.'
    },
    '3': {
      title: 'GRAPHIC DESIGN PORTFOLIO ON BEHANCE',
      category: 'GRAPHIC DESIGN & VISUAL ART',
      image: './assets/graphics.jpg',
      deliverables: ['Behance Portfolio Showcase', 'Brutalist Poster Series', 'Editorial Design', 'Vector Graphic Artwork'],
      overview: 'Direct link to Abil Anandan\'s official Behance graphic design portfolio showcasing brutalist typography, vector graphic artworks, editorial posters, and brand identities.'
    },
    '4': {
      title: 'ALBUM COVER MODELS AND PACKAGES',
      category: 'GRAPHICS & PACKAGING',
      image: './assets/album_cover.jpg',
      deliverables: ['Photobook Albums', 'Premium Photo Packaging', 'Professional Photo Editing', 'Creative Album Art Direction'],
      overview: 'Custom photobook albums, premium photo packaging systems, professional photo editing, and creative album art direction live on Flickr.'
    }
  };

  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project');
      const data = projectDetails[pId];
      if (data) {
        modalBody.innerHTML = `
          <div style="margin-bottom: 20px;">
            <span style="color: var(--orange-primary); font-family: var(--font-heading); font-size: 0.8rem; font-weight: 700;">${data.category}</span>
            <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--text-main); margin-top: 6px; text-transform: uppercase;">${data.title}</h2>
          </div>
          <img src="${data.image}" alt="${data.title}" style="width:100%; border-radius: var(--radius-sm); margin-bottom: 24px; border: 1px solid var(--border-orange);">
          <div style="margin-bottom: 20px;">
            <h4 style="font-family: var(--font-heading); color: var(--orange-primary); margin-bottom: 8px; text-transform: uppercase;">PROJECT OVERVIEW</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${data.overview}</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-heading); color: var(--orange-primary); margin-bottom: 12px; text-transform: uppercase;">KEY DELIVERABLES</h4>
            <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
              ${data.deliverables.map(item => `
                <li style="background: rgba(255, 85, 0, 0.1); padding: 8px 12px; border-radius: 4px; border: 1px solid rgba(255, 85, 0, 0.2); color: var(--text-main); font-size: 0.85rem; font-family: var(--font-heading); font-weight: 600;">
                  <i class="fa-solid fa-check icon-orange" style="margin-right: 6px;"></i> ${item}
                </li>
              `).join('')}
            </ul>
          </div>
        `;
        modal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  /* 10. THREE.JS 3D SCROLL BACKGROUND & PARTICLES ENGINE */
  const canvas3d = document.getElementById('bg3d');
  if (canvas3d && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas3d, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 3D Torus Knot Geometry
    const geometry = new THREE.TorusKnotGeometry(8, 2.5, 120, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.position.set(12, 0, -10);
    scene.add(torusKnot);

    // Create 2nd Geometric 3D Ring Structure
    const ringGeo = new THREE.TorusGeometry(18, 0.4, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff7700,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(-15, -10, -15);
    scene.add(ringMesh);

    // 3D Text "ABIL ANANDAN" Extrusion Setup
    const textGroup3D = new THREE.Group();
    scene.add(textGroup3D);

    function create3DText(font) {
      const textGeo = new THREE.TextGeometry('ABIL ANANDAN', {
        font: font,
        size: 2.6,
        height: 0.9,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.12,
        bevelSize: 0.06,
        bevelSegments: 4
      });
      textGeo.center();

      const matSolid = new THREE.MeshBasicMaterial({
        color: 0xff5500,
        transparent: true,
        opacity: 0.4
      });

      const matWire = new THREE.MeshBasicMaterial({
        color: 0xff8800,
        wireframe: true,
        transparent: true,
        opacity: 0.9
      });

      const meshSolid = new THREE.Mesh(textGeo, matSolid);
      const meshWire = new THREE.Mesh(textGeo, matWire);

      textGroup3D.add(meshSolid);
      textGroup3D.add(meshWire);
      textGroup3D.position.set(0, 3, -10);
    }

    function createFallback3DText() {
      // High-resolution 3D text plane fallback
      const textCanvas = document.createElement('canvas');
      textCanvas.width = 1024;
      textCanvas.height = 256;
      const ctx = textCanvas.getContext('2d');
      ctx.fillStyle = '#ff5500';
      ctx.font = 'bold 72px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#ff5500';
      ctx.shadowBlur = 20;
      ctx.fillText('ABIL ANANDAN', 512, 128);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.strokeText('ABIL ANANDAN', 512, 128);

      const texture = new THREE.CanvasTexture(textCanvas);
      const planeGeo = new THREE.PlaneGeometry(24, 6);
      const planeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      });
      const planeMesh = new THREE.Mesh(planeGeo, planeMat);
      planeMesh.position.set(0, 3, -10);
      textGroup3D.add(planeMesh);
    }

    if (typeof THREE.FontLoader !== 'undefined') {
      const loader = new THREE.FontLoader();
      loader.load(
        'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
        (font) => { create3DText(font); },
        undefined,
        () => { createFallback3DText(); }
      );
    } else {
      createFallback3DText();
    }

    // 3D Floating Orange Particle Field
    const particleCount = 800;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 120;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.35,
      color: 0xff5500,
      transparent: true,
      opacity: 0.55
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    camera.position.z = 25;

    // Scroll-Driven 3D Motion Logic
    let currentScroll = 0;
    let targetScroll = 0;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('scroll', () => {
      targetScroll = window.scrollY;
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function render3D() {
      requestAnimationFrame(render3D);

      // Smooth scroll lerp interpolation
      currentScroll += (targetScroll - currentScroll) * 0.05;
      const scrollFactor = currentScroll * 0.0015;

      // 3D Rotations reactive to scroll & mouse
      torusKnot.rotation.x = scrollFactor * 1.5 + mouseY * 0.2;
      torusKnot.rotation.y = scrollFactor * 2.0 + mouseX * 0.2;
      torusKnot.position.y = Math.sin(scrollFactor) * 4 - (currentScroll * 0.008);

      ringMesh.rotation.x = -scrollFactor * 1.2;
      ringMesh.rotation.z = scrollFactor * 0.8;

      // 3D ABIL ANANDAN Text scroll rotation & depth translation
      if (textGroup3D) {
        textGroup3D.rotation.y = Math.sin(scrollFactor * 0.8) * 0.7 + (mouseX * 0.3);
        textGroup3D.rotation.x = (scrollFactor * 0.6) + (mouseY * 0.2);
        textGroup3D.rotation.z = Math.cos(scrollFactor * 0.5) * 0.15;

        textGroup3D.position.y = 3 - (currentScroll * 0.01) + (Math.sin(scrollFactor * 2) * 1.5);
        textGroup3D.position.z = -10 + (Math.sin(scrollFactor) * 3);
      }

      particleSystem.rotation.y = scrollFactor * 0.5 + mouseX * 0.1;
      particleSystem.rotation.x = scrollFactor * 0.2 + mouseY * 0.1;

      // Camera depth movement along Z and Y
      camera.position.y = -currentScroll * 0.006;
      camera.position.z = 25 + Math.sin(scrollFactor) * 3;

      renderer.render(scene, camera);
    }
    render3D();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* 11. 3D SCROLL REVEAL & INTERACTIVE CARD TILT ENGINE */
  const revealElements = document.querySelectorAll('.section-header, .portfolio-card, .about-card, .pillar-card, .skill-card, .brand-lab-box, .contact-info-card, .contact-form-card');
  revealElements.forEach(el => {
    el.classList.add('scroll-3d-reveal');
  });

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => scrollObserver.observe(el));

  // Magnetic 3D Cursor Card Tilt
  const tiltCards = document.querySelectorAll('.portfolio-card, .about-card, .pillar-card, .skill-card');
  tiltCards.forEach(card => {
    card.classList.add('tilt-3d');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / (rect.height / 2)) * -10;
      const tiltY = (x / (rect.width / 2)) * 10;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(12px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    });
  });

});

/* 9. Contact Form Submission */
function handleFormSubmit() {
  const formFeedback = document.getElementById('formFeedback');
  const name = document.getElementById('name').value;
  
  if (formFeedback) {
    formFeedback.innerHTML = `<span style="color: var(--orange-primary);">SENDING MESSAGE...</span>`;
    
    setTimeout(() => {
      formFeedback.innerHTML = `
        <span style="color: #00ff88; background: rgba(0, 255, 136, 0.1); padding: 10px 16px; border-radius: 6px; border: 1px solid #00ff88; display: inline-block;">
          <i class="fa-solid fa-circle-check"></i> THANK YOU, ${name.toUpperCase()}! YOUR MESSAGE HAS BEEN SENT SUCCESSFULLY.
        </span>
      `;
      document.getElementById('contactForm').reset();
    }, 1200);
  }
}
