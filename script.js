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

// Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
}

// Initialization on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  // Start Typewriter
  setTimeout(typeWriterName, 500);

  // Initialize Observers
  const fadeElements = document.querySelectorAll(".fade-in, .skill-box");
  fadeElements.forEach(el => fadeObserver.observe(el));

  // Initialize Accordions
  initAccordions();

  // Register PWA Service Worker
  registerServiceWorker();

  // Smooth Scroll for Navbar Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // ── FreeCodeCamp Section: Progress Bars ──
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

  // ── FreeCodeCamp Section: Stats Counter Animation ──
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

  // ── Edraak Section: Progress Bars ──
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

  // ── Edraak Section: Stats Counter Animation ──
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
  // ── Saylor Academy Section: Progress Bars ──
  const sayProgressBars = document.querySelectorAll('.say-progress-bar[data-say-width]');
  const sayProgressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-say-width');
        if (targetWidth) {
          setTimeout(() => { bar.style.width = targetWidth; }, 400);
        }
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });
  sayProgressBars.forEach(bar => sayProgressObserver.observe(bar));

  // ── Saylor Academy Section: Stats Counter Animation ──
  const sayCounters = document.querySelectorAll('.say-stat-num[data-say-count]');
  const sayCounterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-say-count'), 10);
        const duration = 1800;
        const startTime = performance.now();

        function updateSayCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + '+';
          if (progress < 1) {
            requestAnimationFrame(updateSayCounter);
          }
        }
        requestAnimationFrame(updateSayCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  sayCounters.forEach(c => sayCounterObserver.observe(c));

  // ── Coursera Section: Progress Bars ──
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

  // ── Coursera Section: Stats Counter Animation ──
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
          el.textContent = Math.round(target * eased) + (target > 10 ? '+' : '');
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

  // ── Certificates Carousel: Toggle Logic ──
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

  // ── Certificates Gallery: Luminous Lightbox Initialization ──
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
});
