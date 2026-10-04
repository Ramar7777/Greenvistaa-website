/**
 * Green Vistaa - CMS Public Page Content Loader
 * Non-invasive script that loads customizations from localStorage (gv_site_content)
 * and safely updates public DOM elements with zero regression to design or layout.
 */
(function () {
  "use strict";

  // Prevent multiple executions
  if (window.GV_CMS_LOADED) return;
  window.GV_CMS_LOADED = true;

  function applyCMSContent() {
    const rawData = localStorage.getItem("gv_site_content");
    if (!rawData) return; // No custom data, keep default static HTML

    try {
      const data = JSON.parse(rawData);

      // ==========================================
      // 1. Phone, WhatsApp, and Contact Information
      // ==========================================
      if (data.phone) {
        document.querySelectorAll("a[href^='tel:']").forEach(function (el) {
          el.href = "tel:" + data.phone.replace(/[^+\d]/g, "");
          // If the link text is just the phone number, update it
          if (el.textContent.includes("+91") || /\d{10}/.test(el.textContent)) {
            el.textContent = data.phone;
          }
        });
      }

      if (data.whatsapp) {
        const cleanWhatsApp = data.whatsapp.replace(/\D/g, "");
        document.querySelectorAll("a[href*='wa.me']").forEach(function (el) {
          el.href = "https://wa.me/" + cleanWhatsApp + "?text=Hello%20GreenVistaa!%20I%20would%20like%20to%20inquire%20about%20your%20services.";
        });
      }

      if (data.email) {
        document.querySelectorAll("a[href^='mailto:']").forEach(function (el) {
          el.href = "mailto:" + data.email;
          if (el.textContent.includes("@")) {
            el.textContent = data.email;
          }
        });
      }

      // ==========================================
      // 2. Homepage Hero Banner Customization
      // ==========================================
      const isHomePage = !window.location.pathname.includes("/pages/");

      if (isHomePage) {
        const heroSection = document.querySelector("header.hero#home, .hero");
        if (heroSection) {
          if (data.heroBg) {
            heroSection.style.backgroundImage =
              "linear-gradient(rgba(11, 61, 37, 0.78), rgba(13, 77, 44, 0.82)), url('" + data.heroBg + "')";
            heroSection.style.backgroundSize = "cover";
            heroSection.style.backgroundPosition = "center";
          }
          if (data.heroTitle) {
            const heroH1 = heroSection.querySelector("h1");
            if (heroH1) {
              heroH1.innerHTML = data.heroTitle.includes("<span")
                ? data.heroTitle
                : data.heroTitle.replace("Green Paradise", "<span>Green Paradise</span>");
            }
          }
          if (data.heroSubtitle) {
            const heroP = heroSection.querySelector("p");
            if (heroP) heroP.textContent = data.heroSubtitle;
          }
        }

        // ==========================================
        // 3. Homepage About Us Section
        // ==========================================
        const aboutSection = document.querySelector("section#about.about, .about");
        if (aboutSection) {
          if (data.aboutImg) {
            const aboutImg = aboutSection.querySelector("img");
            if (aboutImg) aboutImg.src = data.aboutImg;
          }
          if (data.aboutTitle) {
            const aboutH2 = aboutSection.querySelector("h2.title, h2");
            if (aboutH2) aboutH2.textContent = data.aboutTitle;
          }
          if (data.aboutDesc) {
            const aboutP = aboutSection.querySelector("p");
            if (aboutP) aboutP.textContent = data.aboutDesc;
          }
        }

        // ==========================================
        // 4. Projects Showcase Gallery
        // ==========================================
        const projectsSection = document.querySelector("section#projects.projects, .projects");
        if (projectsSection) {
          if (data.projectsHeading) {
            const projTitle = projectsSection.querySelector("h2.title, h2");
            if (projTitle) projTitle.textContent = data.projectsHeading;
          }

          if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
            const gallery = projectsSection.querySelector(".gallery, .projects-grid");
            if (gallery) {
              gallery.innerHTML = data.projects
                .map(function (p) {
                  return `
                    <div class="project">
                      <img src="${p.img}" alt="${p.title}" loading="lazy" />
                      <h4>${p.title}</h4>
                      <small>${p.location}</small>
                    </div>
                  `;
                })
                .join("");
            }
          }
        }
      }

      // ==========================================
      // 5. Inner Service Pages Gallery Images
      // ==========================================
      if (!isHomePage && data.serviceGalleries) {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf("/") + 1).replace(".html", "");

        if (filename && data.serviceGalleries[filename]) {
          const images = data.serviceGalleries[filename];
          const galleryContainer = document.getElementById("gallery");

          if (galleryContainer && Array.isArray(images)) {
            const imgEls = galleryContainer.querySelectorAll("img");
            images.forEach(function (imgSrc, idx) {
              if (imgEls[idx] && imgSrc) {
                imgEls[idx].src = imgSrc;
              }
            });
          }
        }
      }
    } catch (err) {
      console.warn("Green Vistaa CMS Loader warning:", err);
    }
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyCMSContent);
  } else {
    applyCMSContent();
  }
})();
