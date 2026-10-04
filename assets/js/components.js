/**
 * Green Vistaa - Global Subpages Component Loader
 * Injects shared header and footer components into subpages
 * Wrapped in an IIFE to eliminate global namespace pollution.
 */
(function () {
  "use strict";

  // Header Component HTML
  const headerHTML = `
    <header class="gv-header">
      <div class="gv-nav-container">
        <a href="../index.html" class="gv-brand logo-container" aria-label="Green Vistaa Homepage">
          <img src="../assets/images/logo.jpeg" alt="Green Vistaa Logo" class="brand-icon gv-brand-img" />
          <img src="../assets/images/brand-name.png" alt="Green Vistaa" class="brand-name-img" />
        </a>

        <ul class="gv-nav-links">
          <li><a href="../index.html" class="gv-nav-link">Home</a></li>
          <li><a href="../index.html#services" class="gv-nav-link">Services</a></li>
          <li><a href="garden-design.html" class="gv-nav-link gv-active">Garden Design</a></li>
          <li><a href="../index.html#about" class="gv-nav-link">About</a></li>
          <li><a href="../index.html#contact" class="gv-nav-link">Contact</a></li>
        </ul>

        <div class="gv-nav-actions">
          <a href="../index.html" class="gv-btn-home">← Home</a>
          <a href="https://wa.me/919345536955" target="_blank" rel="noopener noreferrer" class="gv-btn-whatsapp">
            💬 WhatsApp
          </a>
          <button class="gv-menu-toggle" id="gvMenuToggle" aria-label="Toggle Navigation Menu">
            ☰
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <nav class="gv-mobile-menu" id="gvMobileMenu" aria-label="Mobile Navigation">
        <a href="../index.html" class="gv-nav-link">Home</a>
        <a href="../index.html#services" class="gv-nav-link">Services</a>
        <a href="garden-design.html" class="gv-nav-link gv-active">Garden Design</a>
        <a href="../index.html#about" class="gv-nav-link">About</a>
        <a href="../index.html#contact" class="gv-nav-link">Contact</a>
        <div class="gv-mobile-actions">
          <a href="../index.html" class="gv-btn-home">← Return to Home</a>
          <a href="https://wa.me/919345536955" target="_blank" rel="noopener noreferrer" class="gv-btn-whatsapp">
            💬 Chat on WhatsApp
          </a>
        </div>
      </nav>
    </header>
  `;

  // Footer Component HTML
  const footerHTML = `
    <footer class="gv-footer">
      <div class="gv-footer-top">
        <!-- Col 1: Company Profile -->
        <div class="gv-footer-col gv-footer-about">
          <a href="../index.html" class="gv-footer-brand">
            <img src="../assets/images/logo.jpeg" alt="Green Vistaa" />
            <span>GreenVistaa</span>
          </a>
          <p class="gv-footer-desc">
            Transforming spaces into lush, sustainable green paradises. Expert landscape architecture, bespoke garden designs, and comprehensive outdoor care.
          </p>
          <div class="gv-footer-badge">
            🌿 Coimbatore & Beyond
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div class="gv-footer-col">
          <h3>Quick Links</h3>
          <ul class="gv-footer-links">
            <li><a href="../index.html" class="gv-footer-link">Home</a></li>
            <li><a href="../index.html#about" class="gv-footer-link">About Us</a></li>
            <li><a href="../index.html#services" class="gv-footer-link">All Services</a></li>
            <li><a href="../index.html#projects" class="gv-footer-link">Portfolio</a></li>
            <li><a href="../index.html#contact" class="gv-footer-link">Get a Quote</a></li>
          </ul>
        </div>

        <!-- Col 3: Services -->
        <div class="gv-footer-col">
          <h3>Our Services</h3>
          <ul class="gv-footer-links">
            <li><a href="garden-design.html" class="gv-footer-link">Garden Design</a></li>
            <li><a href="../index.html#services" class="gv-footer-link">Landscaping</a></li>
            <li><a href="../index.html#services" class="gv-footer-link">Garden Maintenance</a></li>
            <li><a href="../index.html#services" class="gv-footer-link">Irrigation Solutions</a></li>
            <li><a href="../index.html#services" class="gv-footer-link">Vertical Gardens</a></li>
            <li><a href="../index.html#services" class="gv-footer-link">Lawn Installation</a></li>
          </ul>
        </div>

        <!-- Col 4: Contact & Support -->
        <div class="gv-footer-col">
          <h3>Get In Touch</h3>
          <ul class="gv-footer-contact">
            <li class="gv-contact-item">
              <span class="gv-contact-icon">📞</span>
              <div>
                <a href="tel:+919345536955">+91 93455 36955</a>
              </div>
            </li>
            <li class="gv-contact-item">
              <span class="gv-contact-icon">💬</span>
              <div>
                <a href="https://wa.me/919345536955" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </div>
            </li>
            <li class="gv-contact-item">
              <span class="gv-contact-icon">✉️</span>
              <div>
                <a href="mailto:greenvistalandscapescbe@gmail.com">
                  greenvistalandscapescbe@gmail.com
                </a>
              </div>
            </li>
            <li class="gv-contact-item">
              <span class="gv-contact-icon">📍</span>
              <div>Coimbatore, Tamil Nadu, India</div>
            </li>
            <li class="gv-contact-item">
              <span class="gv-contact-icon">🕒</span>
              <div>Mon - Sat: 8:00 AM - 7:00 PM</div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="gv-footer-bottom">
        <div>© 2026 GreenVistaa Landscaping & Garden Solutions. All rights reserved.</div>
        <div>
          <a href="../index.html">Privacy</a> &nbsp;•&nbsp; 
          <a href="../index.html">Terms</a> &nbsp;•&nbsp; 
          <a href="../index.html#contact">Contact</a>
        </div>
      </div>
    </footer>
  `;

  // Initialize and inject components
  function initSubpageComponents() {
    const headerContainer = document.getElementById("global-header");
    if (headerContainer) {
      headerContainer.innerHTML = headerHTML;

      // Bind mobile menu toggle safely
      const toggleBtn = document.getElementById("gvMenuToggle");
      const mobileMenu = document.getElementById("gvMobileMenu");

      if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          const isOpen = mobileMenu.classList.toggle("gv-open");
          toggleBtn.textContent = isOpen ? "✕" : "☰";
        });

        // Close on link click
        mobileMenu.querySelectorAll("a").forEach(function (link) {
          link.addEventListener("click", function () {
            mobileMenu.classList.remove("gv-open");
            toggleBtn.textContent = "☰";
          });
        });

        // Close on click outside
        document.addEventListener("click", function (e) {
          if (!headerContainer.contains(e.target)) {
            mobileMenu.classList.remove("gv-open");
            toggleBtn.textContent = "☰";
          }
        });
      }
    }

    const footerContainer = document.getElementById("global-footer");
    if (footerContainer) {
      footerContainer.innerHTML = footerHTML;
    }
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSubpageComponents);
  } else {
    initSubpageComponents();
  }
})();
