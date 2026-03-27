// Typewriter Effect Variables
const nameText = "عبد العزيز محمد المحافيظ";
const titleText = "محاسب و ملم بالأنظمة المحاسبية";
const nameElement = document.getElementById("typewriter-name");
const titleElement = document.getElementById("typewriter-title");

let nameIndex = 0;
let titleIndex = 0;

function typeWriterName() {
  if (nameIndex < nameText.length) {
    nameElement.innerHTML += nameText.charAt(nameIndex);
    nameIndex++;
    setTimeout(typeWriterName, 100);
  } else {
    nameElement.style.borderRight = "none"; // remove cursor
    setTimeout(typeWriterTitle, 300); // Start title
  }
}

function typeWriterTitle() {
  if (titleIndex < titleText.length) {
    titleElement.innerHTML += titleText.charAt(titleIndex);
    titleIndex++;
    setTimeout(typeWriterTitle, 75);
  } else {
    titleElement.style.borderRight = "none";
  }
}

// Fade-in Animation on Scroll
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // If it's a progress bar, animate width
      if (entry.target.classList.contains('skill-box')) {
        const progressBar = entry.target.querySelector('.progress-bar');
        const targetWidth = progressBar.getAttribute('data-width');
        progressBar.style.width = targetWidth;
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Accordion Functionality
function initAccordions() {
  const accHeaders = document.querySelectorAll(".accordion-header");
  accHeaders.forEach(header => {
    header.addEventListener("click", function () {
      // Toggle active class
      this.classList.toggle("active");

      // Control panel opening/closing
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 40 + "px"; // +40 for padding
      }
    });
  });
}

// Service Worker Registration & PWA Logic
let deferredPrompt;

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Register our new service-worker.js
      navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful:', registration.scope);
          
          // Monitor for updates
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New update available!
                showUpdateToast();
              }
            };
          };
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
}

// Show Toast Notification for updates
function showUpdateToast() {
  const toast = document.createElement('div');
  toast.id = 'pwa-update-toast';
  toast.innerHTML = `
    <div class="toast-content">
      <span>تحديث جديد متوفر في سيرة عبد العزيز!</span>
      <button id="pwa-refresh-btn">تحديث الآن</button>
    </div>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);

  document.getElementById('pwa-refresh-btn').onclick = () => {
    window.location.reload();
  };
}

// GitHub Version Check (Mock or simplified version check)
// Since we are on GitHub Pages, we can check a version file or headers
async function checkForGitHubUpdates() {
    try {
        // You can fetch a specific file like manifest.json or a version.json
        // to check headers or content.
        const response = await fetch('manifest.json', { cache: 'no-store' });
        const lastModified = response.headers.get('last-modified');
        const storedLastModified = localStorage.getItem('pwa-last-modified');

        if (storedLastModified && lastModified && lastModified !== storedLastModified) {
            console.log('New update detected on GitHub!');
            showUpdateToast();
        }
        
        if (lastModified) {
            localStorage.setItem('pwa-last-modified', lastModified);
        }
    } catch (e) {
        console.log('Update check failed', e);
    }
}

// Custom Install Prompt Logic
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  
  // Show custom install UI on first visit or if not installed
  if (!localStorage.getItem('pwa-installed')) {
    showInstallPrompt();
  }
});

function showInstallPrompt() {
  const prompt = document.createElement('div');
  prompt.id = 'pwa-install-prompt';
  prompt.dir = 'rtl';
  prompt.innerHTML = `
    <div class="prompt-card glass-card">
      <div class="prompt-header">
        <img src="assets/primary_image/profile.png" alt="Abdulaziz" class="prompt-icon">
        <h3>أضف السيرة الذاتية لشاشة الجوال</h3>
      </div>
      <p>للوصول السريع لخبراتي ودوراتي المحاسبية والتقنية في أي وقت، حتى بدون إنترنت!</p>
      <div class="prompt-actions">
        <button id="pwa-install-btn" class="install-main">إضافة الآن</button>
        <button id="pwa-close-btn" class="install-close">لاحقاً</button>
      </div>
    </div>
  `;
  document.body.appendChild(prompt);
  
  setTimeout(() => prompt.classList.add('show'), 500);

  document.getElementById('pwa-install-btn').onclick = () => {
    prompt.classList.remove('show');
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
        localStorage.setItem('pwa-installed', 'true');
      }
      deferredPrompt = null;
      setTimeout(() => prompt.remove(), 500);
    });
  };

  document.getElementById('pwa-close-btn').onclick = () => {
    prompt.classList.remove('show');
    setTimeout(() => prompt.remove(), 500);
  };
}

window.addEventListener('appinstalled', () => {
  localStorage.setItem('pwa-installed', 'true');
  console.log('PWA was installed');
});

// Initialization on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  // ── Courses Orbit Overlay Logic ──
  const coursesDockBtn = document.querySelector('.bubble-item[data-section="courses"] a');
  const orbitOverlay = document.getElementById('courses-orbit-overlay');

  if (coursesDockBtn && orbitOverlay) {
    // Open Overlay
    coursesDockBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      orbitOverlay.classList.add('active');
    });

    // Close Overlay Function
    const closeOrbitOverlay = () => {
      orbitOverlay.classList.remove('active');
    };

    // Close on clicking outside the orbit system
    orbitOverlay.addEventListener('click', (e) => {
      if (e.target === orbitOverlay) {
        closeOrbitOverlay();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && orbitOverlay.classList.contains('active')) {
        closeOrbitOverlay();
      }
    });

    // Handle clicking on a course square category item
    const courseSquares = orbitOverlay.querySelectorAll('.course-square');
    courseSquares.forEach(square => {
      square.addEventListener('click', () => {
        const targetId = square.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);

        // Visual feedback: Highlight clicked square and dim others
        courseSquares.forEach(other => {
          if (other !== square) {
            other.style.opacity = '0.2';
            other.style.transform = 'scale(0.9)';
            other.style.filter = 'blur(4px)';
          } else {
            square.style.transform = 'scale(1.05) translateY(-10px)';
            square.style.borderColor = 'var(--square-clr)';
            square.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
          }
        });

        // Transition to section
        setTimeout(() => {
          closeOrbitOverlay();

          // Reset styles after the overlay closes
          setTimeout(() => {
            courseSquares.forEach(s => {
              s.style.opacity = '';
              s.style.transform = '';
              s.style.filter = '';
              s.style.borderColor = '';
              s.style.boxShadow = '';
            });
          }, 600);

          // Smooth scroll to the requested section
          if (targetEl) {
            const yOffset = -20; // Slight offset for better visibility
            const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 400);
      });
    });
  }

  // Start Typewriter
  setTimeout(typeWriterName, 500);

  // Initialize Observers
  const fadeElements = document.querySelectorAll(".fade-in, .skill-box");
  fadeElements.forEach(el => fadeObserver.observe(el));

  // Initialize Accordions
  initAccordions();

  // Register PWA Service Worker
  registerServiceWorker();

  // Start Update Monitoring
  checkForGitHubUpdates();


  // Smooth Scroll for Navbar Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // â”€â”€ FreeCodeCamp Section: Progress Bars â”€â”€
  const fccProgressBars = document.querySelectorAll('.fcc-progress-bar[data-fcc-width]');
  const fccProgressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-fcc-width');
        if (targetWidth) {
          setTimeout(() => { bar.style.width = targetWidth; }, 400);
        }
        observer.unobserve(bar);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.1 });
  fccProgressBars.forEach(bar => fccProgressObserver.observe(bar));

  // â”€â”€ FreeCodeCamp Section: Stats Counter Animation â”€â”€
  const fccCounters = document.querySelectorAll('.fcc-stat-num[data-fcc-count]');
  const fccCounterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-fcc-count'), 10);
        const duration = 1800;
        const startTime = performance.now();

        function updateFccCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + '+';
          if (progress < 1) {
            requestAnimationFrame(updateFccCounter);
          }
        }
        requestAnimationFrame(updateFccCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  fccCounters.forEach(c => fccCounterObserver.observe(c));

  // â”€â”€ Edraak Section: Progress Bars â”€â”€
  const edrProgressBars = document.querySelectorAll('.edr-progress-bar[data-edr-width]');
  const edrProgressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-edr-width');
        if (targetWidth) {
          setTimeout(() => { bar.style.width = targetWidth; }, 400);
        }
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });
  edrProgressBars.forEach(bar => edrProgressObserver.observe(bar));

  // â”€â”€ Edraak Section: Stats Counter Animation â”€â”€
  const edrCounters = document.querySelectorAll('.edr-stat-num[data-edr-count]');
  const edrCounterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-edr-count'), 10);
        const duration = 1800;
        const startTime = performance.now();

        function updateEdrCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + '+';
          if (progress < 1) {
            requestAnimationFrame(updateEdrCounter);
          }
        }
        requestAnimationFrame(updateEdrCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  edrCounters.forEach(c => edrCounterObserver.observe(c));

  // â”€â”€ Coursera Section: Progress Bars â”€â”€
  const courProgressBars = document.querySelectorAll('.cour-progress-bar[data-cour-width]');
  const courProgressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-cour-width');
        if (targetWidth) {
          setTimeout(() => { bar.style.width = targetWidth; }, 400);
        }
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });
  courProgressBars.forEach(bar => courProgressObserver.observe(bar));

  // â”€â”€ Coursera Section: Stats Counter Animation â”€â”€
  const courCounters = document.querySelectorAll('.cour-stat-num[data-cour-count]');
  const courCounterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-cour-count'), 10);
        const duration = 1800;
        const startTime = performance.now();

        function updateCourCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.round(target * eased);
          el.textContent = (target > 10 ? '+' : '') + currentVal;
          if (progress < 1) {
            requestAnimationFrame(updateCourCounter);
          }
        }
        requestAnimationFrame(updateCourCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  courCounters.forEach(c => courCounterObserver.observe(c));

  // â”€â”€ Certificates Carousel: Toggle Logic â”€â”€
  const carousels = document.querySelectorAll('.cert-carousel');
  carousels.forEach(carousel => {
    carousel.addEventListener('click', (e) => {
      // If clicking the link (Luminous), don't trigger slide switch
      if (e.target.closest('.certificate-link')) return;

      const slides = carousel.querySelectorAll('.cert-slide');
      const dots = carousel.querySelectorAll('.dot');
      let activeIndex = Array.from(slides).findIndex(s => s.classList.contains('active'));

      // Toggle index
      slides[activeIndex].classList.remove('active');
      dots[activeIndex].classList.remove('active');

      activeIndex = (activeIndex + 1) % slides.length;

      slides[activeIndex].classList.add('active');
      dots[activeIndex].classList.add('active');
    });
  });

  // â”€â”€ Certificates Gallery: Luminous Lightbox Initialization â”€â”€
  const certificateLinks = document.querySelectorAll('.certificate-link');
  if (certificateLinks.length > 0) {
    certificateLinks.forEach(link => {
      new Luminous(link, {
        caption: (trigger) => {
          return trigger.getAttribute('data-title');
        }
      });
    });
  }


  // ── Floating Dock: Active Section Tracking ──
  const dockItems = document.querySelectorAll('#bubble-dock-container .bubble-item');
  const sections = document.querySelectorAll('section, header');

  const dockObserverOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px', // Detect section when it's in the middle of the viewport
    threshold: 0
  };

  const dockObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        // Remove active class from all
        dockItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('data-section') === id) {
            item.classList.add('active');
          }
        });
      }
    });
  }, dockObserverOptions);

  sections.forEach(section => {
    if (section.id) dockObserver.observe(section);
  });
});

/* ══════════════════════════════════════════════════════════════════════════════
   Dynamic Certificate Modal Logic
   ══════════════════════════════════════════════════════════════════════════════ */

const certificateIssuers = {
  hadhramout: {
    name: "جامعة حضرموت",
    title: "Hadhramout University",
    badge: "صرح أكاديمي رائد",
    description: "تعد جامعة حضرموت صرحاً أكاديمياً رائعاً في الجمهورية اليمنية، تأسست عام 1993 في مدينة المكلا. تعتبر الجامعة من المؤسسات التعليمية الرائدة التي تلتزم بتقديم برامج بكالوريوس ودراسات عليا معتمدة في تخصصات الهندسة، الحاسوب، والطب. تركز الجامعة على ربط المناهج العلمية باحتياجات سوق العمل والتنمية المستدامة، وهي الجهة التي صقلت خلفيتي العلمية والتقنية.",
    logo: "assets/organization_logos/hadhramout_university_logo_result.webp",
    fullLogo: true,
    officialLink: "https://hu.edu.ye",
    btnText: "زيارة الموقع الرسمي للجامعة",
    mainColor: "#007bff", // Standard Blue
    address: "جامعة حضرموت - Hadhramout University"
  },
  mukalla_model: {
    name: "ثانوية المكلا النموذجية",
    title: "Mukalla Model Secondary School",
    badge: "نخبة الطلاب المتفوقين",
    description: "ثانوية المكلا النموذجية هي صرح تعليمي رائد متخصص في رعاية وتأهيل الطلاب المتفوقين في حضرموت. تأسست بمبادرة نوعية من مجموعة من رجال الأعمال الداعمين للعلم، وفي مقدمتهم الشيخ المهندس عبدالله أحمد بقشان عبر مؤسسة حضرموت للتنمية البشرية. تهدف المدرسة إلى صناعة جيل قيادي متسلح بالعلم والابتكار، وتعتبر من أكثر المدارس تنافسية على مستوى الوطن.",
    logo: "assets/organization_logos/mukalla_model_boys_secondary_logo.png.jpg",
    fullLogo: true,
    officialLink: "https://hadhramout-foundation.org",
    btnText: "زيارة الموقع الرسمي للمؤسسة الراعية",
    mainColor: "#A67B5B", // Light Brown / Cinnamon
    address: "ثانوية المكلا النموذجية - Mukalla Model Secondary School",
    social: [
      { icon: "fab fa-facebook", link: "https://www.facebook.com/mmss.mukalla" }
    ]
  },
  google: {
    name: "Google",
    title: "Google Career Certificates",
    badge: "احترافية عالمية",
    description: "برامج تدريبية احترافية مصممة من قبل خبراء جوجل لتزويد المتعلمين بالمهارات المطلوبة في مجالات التكنولوجيا الصاعدة.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    officialLink: "https://grow.google/certificates/",
    btnText: "عرض تفاصيل شهادات جوجل",
    mainColor: "#4285F4", // Google Blue
    address: "Google LLC - Mountain View, CA"
  },
  microsoft: {
    name: "Microsoft",
    title: "Microsoft Certified Professional",
    badge: "خبرات تقنية معتمدة",
    description: "شهادات مايكروسوفت تثبت الكفاءة في استخدام وتطبيق تقنيات الحوسبة السحابية، تطوير البرمجيات، وإدارة البيانات.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    officialLink: "https://learn.microsoft.com/en-us/credentials/",
    btnText: "استكشاف مسارات مايكروسوفت",
    mainColor: "#00a4ef", // Microsoft Blue
    address: "Microsoft Corporation - Redmond, WA"
  }
};

const modalOverlay = document.getElementById('cert-modal');
const modalSlider = document.getElementById('modal-slider');

function openCertModal(issuerKey, certSrc, certTitle, startAtIssuer = false) {
  const issuer = certificateIssuers[issuerKey];
  if (!issuer) return;

  // Set Theme Color
  document.documentElement.style.setProperty('--issuer-main-color', issuer.mainColor);

  // Inject Content
  document.getElementById('modal-issuer-name').textContent = issuer.name;
  document.getElementById('modal-badge').textContent = issuer.badge;
  document.getElementById('modal-cert-img').src = certSrc;

  // Update internal button text
  const internalAboutBtn = document.getElementById('btn-show-issuer');
  if (internalAboutBtn) {
    internalAboutBtn.innerHTML = `<i class="fas fa-scroll"></i> ${issuer.name}`;
  }

  const logoImg = document.getElementById('modal-issuer-logo');
  const logoWrapper = logoImg.parentElement;
  logoImg.src = issuer.logo;

  if (issuer.fullLogo) {
    logoWrapper.classList.add('full-width-logo');
  } else {
    logoWrapper.classList.remove('full-width-logo');
  }

  document.getElementById('modal-issuer-title').textContent = issuer.title;
  document.getElementById('modal-issuer-desc').textContent = issuer.description;
  document.getElementById('modal-issuer-address').textContent = issuer.address;

  const officialBtn = document.getElementById('modal-official-link');
  officialBtn.href = issuer.officialLink;
  officialBtn.onclick = (e) => {
    e.preventDefault();
    window.open(issuer.officialLink, '_blank');
  };
  officialBtn.querySelector('span').textContent = issuer.btnText;

  // Handle Social Links
  const socialContainer = document.getElementById('modal-social-links');
  socialContainer.innerHTML = '';
  if (issuer.social) {
    issuer.social.forEach(s => {
      const link = document.createElement('a');
      link.href = s.link;
      link.target = "_blank";
      link.innerHTML = `<i class="${s.icon}"></i>`;
      socialContainer.appendChild(link);
    });
  }

  // Handle Visibility Logic (Internal Button)
  if (issuerKey === 'mukalla_model' || issuerKey === 'hadhramout') {
    modalOverlay.classList.add('hide-internal-about');
  } else {
    modalOverlay.classList.remove('hide-internal-about');
  }

  // Set Slide Position
  if (startAtIssuer) {
    // Small delay to ensure the modal is 'active' before sliding
    setTimeout(() => {
      modalSlider.classList.add('show-issuer');
    }, 10);
  } else {
    modalSlider.classList.remove('show-issuer');
  }

  // Show Modal
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeCertModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Restore scroll
}

// Event Listeners for Slider Toggle
document.getElementById('btn-show-issuer').addEventListener('click', () => {
  modalSlider.classList.add('show-issuer');
});

document.getElementById('btn-back-to-cert').addEventListener('click', () => {
  modalSlider.classList.remove('show-issuer');
});

// Close modal on overlay click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeCertModal();
});

// Update Certificate Link Click Handler
document.addEventListener('click', (e) => {
  const certLink = e.target.closest('.certificate-link');
  if (certLink && certLink.hasAttribute('data-issuer')) {
    e.preventDefault();
    const issuerKey = certLink.getAttribute('data-issuer');
    const certSrc = certLink.getAttribute('href');
    const certTitle = certLink.getAttribute('data-title');
    openCertModal(issuerKey, certSrc, certTitle);
    return;
  }

  // External 'About Issuer' Button Handler
  const externalBtn = e.target.closest('.btn-open-issuer');
  if (externalBtn) {
    e.preventDefault();
    const issuerKey = externalBtn.getAttribute('data-issuer');
    const certSrc = externalBtn.getAttribute('data-src');
    const certTitle = externalBtn.getAttribute('data-title');
    openCertModal(issuerKey, certSrc, certTitle, true); // true = start at issuer slide
  }
});

// Function to Toggle Satar UX/UI Path
function toggleSatarPath() {
  const path = document.getElementById('satar-uxui-path');
  if (!path) return;
  
  if (path.style.display === 'none' || path.style.display === '') {
    path.style.display = 'block';
    // Use a tiny timeout to ensure the browser registers the display change before animating
    setTimeout(() => {
      path.style.opacity = '1';
      path.style.transform = 'translateY(0)';
    }, 50);
    
    // Optional: Scroll into view
    setTimeout(() => {
      path.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  } else {
    path.style.opacity = '0';
    path.style.transform = 'translateY(20px)';
    // Wait for transition (0.5s) to complete before setting display to none
    setTimeout(() => {
      path.style.display = 'none';
    }, 500);
  }
}

// Function to Toggle Satar Training Courses
function toggleSatarCourses() {
  const path = document.getElementById('satar-courses-path');
  if (!path) return;
  
  if (path.style.display === 'none' || path.style.display === '') {
    path.style.display = 'block';
    setTimeout(() => {
      path.style.opacity = '1';
      path.style.transform = 'translateY(0)';
    }, 50);
    
    setTimeout(() => {
      path.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  } else {
    path.style.opacity = '0';
    path.style.transform = 'translateY(20px)';
    setTimeout(() => {
      path.style.display = 'none';
    }, 500);
  }
}

// Removed old sw.js registration logic as it's handled above
