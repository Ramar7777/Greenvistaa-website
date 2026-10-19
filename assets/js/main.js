/**
 * Green Vistaa - Core JavaScript Bundle
 * Contains: Preloader, Mobile Navigation, WhatsApp Form, Lightbox Modal
 */

/* ========================================================
   1. MODERN RESPONSIVE PRELOADER CONTROLLER
   ======================================================== */
(function () {
  "use strict";

  const loader = document.getElementById("gvLoader");
  if (!loader) return;

  const bar = document.getElementById("gvProgressBar");
  const number = document.getElementById("gvProgressNumber");
  const status = document.getElementById("gvProgressStatus");

  const phrases = [
    "Cultivating botanical designs...",
    "Harmonizing living landscapes...",
    "Nurturing your green sanctuary...",
    "Welcome to Green Vistaa"
  ];

  let currentProgress = 0;
  let phraseIdx = 0;
  let isPageLoaded = false;
  let isDismissed = false;

  function updateUI(percent, text) {
    if (bar) bar.style.width = percent + "%";
    if (number) number.textContent = Math.round(percent) + "%";
    if (status && text) status.textContent = text;
  }

  // Smooth progress simulation
  const progressInterval = setInterval(function () {
    if (isDismissed) {
      clearInterval(progressInterval);
      return;
    }

    if (!isPageLoaded) {
      // Approach up to 88% while waiting for window load
      if (currentProgress < 40) {
        currentProgress += Math.random() * 8 + 4;
      } else if (currentProgress < 75) {
        currentProgress += Math.random() * 4 + 2;
      } else if (currentProgress < 88) {
        currentProgress += Math.random() * 1.5 + 0.5;
      }

      // Rotate status phrases
      if (currentProgress > 30 && phraseIdx === 0) {
        phraseIdx = 1;
        if (status) status.textContent = phrases[1];
      } else if (currentProgress > 65 && phraseIdx === 1) {
        phraseIdx = 2;
        if (status) status.textContent = phrases[2];
      }
    } else {
      // Once loaded, accelerate to 100%
      currentProgress += 12;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        dismissLoader();
      }
    }

    updateUI(Math.min(currentProgress, 100));
  }, 50);

  function dismissLoader() {
    if (isDismissed) return;
    isDismissed = true;
    updateUI(100, phrases[3]);

    setTimeout(function () {
      loader.classList.add("hide");
      setTimeout(function () {
        if (loader && loader.parentNode) {
          loader.style.display = "none";
        }
      }, 800);
    }, 280);
  }

  function markLoaded() {
    isPageLoaded = true;
  }

  if (document.readyState === "complete") {
    setTimeout(markLoaded, 300);
  } else {
    window.addEventListener("load", function () {
      setTimeout(markLoaded, 250);
    });
    // Safety fallback: never block user for longer than 2.2 seconds
    setTimeout(function () {
      markLoaded();
      dismissLoader();
    }, 2200);
  }
})();

/* ========================================================
   2. MOBILE NAVIGATION TOGGLE
   ======================================================== */
(function () {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }
})();

/* ========================================================
   3. WHATSAPP QUOTE FORM SUBMISSION
   ======================================================== */
function sendWhatsApp(e) {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  const nameEl = document.getElementById("name");
  const phoneEl = document.getElementById("phone");
  const serviceEl = document.getElementById("service");
  const reqEl = document.getElementById("req");

  const name = nameEl ? nameEl.value.trim() : "";
  const phone = phoneEl ? phoneEl.value.trim() : "";
  const service = serviceEl ? serviceEl.value : "";
  const req = reqEl ? reqEl.value.trim() : "";

  const message =
    "Hello GreenVistaa!\n\n" +
    "Name: " + name + "\n" +
    "Mobile: " + phone + "\n" +
    "Service: " + service + "\n" +
    "Requirements: " + req;

  const whatsappURL =
    "https://wa.me/919345536955?text=" + encodeURIComponent(message);

  window.open(whatsappURL, "_blank");

  if (e && e.target && typeof e.target.reset === "function") {
    e.target.reset();
  }
}

/* ========================================================
   4. IMAGE LIGHTBOX MODAL
   ======================================================== */
(function () {
  "use strict";

  // Create Modal Container with Direct High-Priority Styles
  const modal = document.createElement("div");
  modal.id = "gvAutoLightbox";
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(11, 35, 20, 0.92);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 9999999;
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.25s ease;
  `;

  modal.innerHTML = `
    <div style="position: relative; max-width: 90vw; max-height: 85vh; display: flex; flex-direction: column; align-items: center;">
      <button id="gvCloseBtn" aria-label="Close" style="
        position: absolute;
        top: -46px;
        right: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.4);
        color: #ffffff;
        font-size: 24px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s;
      ">&times;</button>
      <img id="gvModalImg" src="" alt="Project Preview" style="
        max-width: 100%;
        max-height: 75vh;
        border-radius: 14px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        object-fit: contain;
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: block;
      " />
      <div id="gvModalCaption" style="
        margin-top: 14px;
        color: #ffffff;
        font-size: 1.1rem;
        font-weight: 600;
        font-family: inherit;
        text-align: center;
        text-shadow: 0 2px 8px rgba(0,0,0,0.7);
      "></div>
    </div>
  `;

  document.body.appendChild(modal);

  const modalImg = document.getElementById("gvModalImg");
  const modalCaption = document.getElementById("gvModalCaption");
  const closeBtn = document.getElementById("gvCloseBtn");

  function openModal(src, caption) {
    if (!src) return;
    modalImg.src = src;
    modalCaption.textContent = caption || "";
    modal.style.display = "flex";
    requestAnimationFrame(() => {
      modal.style.opacity = "1";
    });
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.style.opacity = "0";
    document.body.style.overflow = "";
    setTimeout(() => {
      modal.style.display = "none";
      modalImg.src = "";
    }, 250);
  }

  // Global Event Delegation: Catches ANY click on project cards or gallery items
  document.addEventListener("click", function (e) {
    const card = e.target.closest(
      ".project, .project-card, .projects-grid > div, .gallery > div, [class*='project']:not(section):not(nav)"
    );

    if (!card || card.tagName === "SECTION") return;

    const img = card.querySelector("img");
    if (!img || !img.src) return;

    const title = card.querySelector("h3, h4, .project-title, [class*='title']")?.innerText || "";
    const loc = card.querySelector("p, small, .location, [class*='loc']")?.innerText || "";
    const caption = title && loc ? `${title} — ${loc}` : title || loc || img.alt;

    openModal(img.src, caption);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeModal();
    });
  }

  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.id === "gvAutoLightbox") {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });
})();

/* ========================================================
   5. SMART "VIEW MORE PROJECTS" TOGGLE
   ======================================================== */
(function () {
  "use strict";

  function initProjectsToggle() {
    const gallery = document.querySelector(".projects .gallery, .projects-grid");
    if (!gallery) return;

    // Get all direct project cards inside the gallery
    const cards = Array.from(gallery.children).filter(function (child) {
      return !child.classList.contains("gv-load-more-container");
    });

    const INITIAL_LIMIT = 4;
    if (cards.length <= INITIAL_LIMIT) return;

    // Create or locate the Load More container button
    let container = document.getElementById("gvLoadMoreContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "gvLoadMoreContainer";
      container.className = "gv-load-more-container";

      const btn = document.createElement("button");
      btn.id = "gvLoadMoreBtn";
      btn.className = "gv-load-more-btn";

      container.appendChild(btn);
      gallery.insertAdjacentElement("afterend", container);
    }

    const btn = document.getElementById("gvLoadMoreBtn");
    let isExpanded = false;
    const hiddenCount = cards.length - INITIAL_LIMIT;

    function updateCardVisibility() {
      cards.forEach(function (card, index) {
        if (index >= INITIAL_LIMIT) {
          if (isExpanded) {
            card.style.display = "";
            card.classList.add("gv-project-revealed");
          } else {
            card.style.display = "none";
            card.classList.remove("gv-project-revealed");
          }
        }
      });

      if (isExpanded) {
        btn.innerHTML = "Show Less ↑";
      } else {
        btn.innerHTML = `View More Projects (+${hiddenCount}) ↓`;
      }
    }

    // Initialize: show first 4, hide remaining
    updateCardVisibility();

    btn.addEventListener("click", function () {
      isExpanded = !isExpanded;
      updateCardVisibility();

      if (!isExpanded) {
        const projectsSec = document.getElementById("projects");
        if (projectsSec) {
          projectsSec.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectsToggle);
  } else {
    initProjectsToggle();
  }
})();

