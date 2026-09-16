document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const body = document.body;
  const header = document.querySelector("header");
  const menu = document.querySelector("[data-menu]");
  const nav = document.querySelector("[data-nav]");
  const platformLinks = document.querySelectorAll("[data-platform]");
  const year = document.querySelector("[data-year]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------
     Mobile navigation
  --------------------------------------------- */

  const closeMenu = () => {
    if (!menu || !nav) return;

    nav.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "Menu";
    body.classList.remove("menu-open");
  };

  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");

      menu.setAttribute("aria-expanded", String(open));
      menu.textContent = open ? "Close" : "Menu";
      body.classList.toggle("menu-open", open);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", event => {
      if (!nav.classList.contains("is-open")) return;

      const clickedInsideNav = nav.contains(event.target);
      const clickedMenu = menu.contains(event.target);

      if (!clickedInsideNav && !clickedMenu) {
        closeMenu();
      }
    });
  }

  /* ---------------------------------------------
     Active navigation
  --------------------------------------------- */

  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase() || "index.html";

  if (nav) {
    nav.querySelectorAll("a:not(.platform)").forEach(link => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#")) return;

      const linkPage = href.split("/").pop().toLowerCase();

      if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------------------------------------------
     Teacher Platform
  --------------------------------------------- */

  const platformUrl = window.PORTFOLIO_CONFIG?.teacherPlatformUrl;

  platformLinks.forEach(link => {
    if (platformUrl && platformUrl !== "#") {
      link.href = platformUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
    } else {
      link.href = "#";
      link.setAttribute("aria-disabled", "true");

      link.addEventListener("click", event => {
        event.preventDefault();

        const existingNotice = document.querySelector("[data-platform-notice]");

        if (existingNotice) {
          existingNotice.classList.add("show");
          window.setTimeout(() => {
            existingNotice.classList.remove("show");
          }, 3200);
          return;
        }

        const notice = document.createElement("div");
        notice.className = "platform-notice";
        notice.dataset.platformNotice = "";
        notice.setAttribute("role", "status");
        notice.textContent = "Teacher Platform is not connected yet.";

        document.body.appendChild(notice);

        requestAnimationFrame(() => {
          notice.classList.add("show");
        });

        window.setTimeout(() => {
          notice.classList.remove("show");

          window.setTimeout(() => {
            notice.remove();
          }, 300);
        }, 3200);
      });
    }
  });

  /* ---------------------------------------------
     Header scroll state
  --------------------------------------------- */

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------------------------------------------
     Scroll reveal
  --------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".card, .feature, .journey-card, .education-card, .quote, .stat, .gallery-item, .project-card, .impact-card, .timeline article"
  );

  if (revealElements.length) {
    revealElements.forEach((element, index) => {
      element.classList.add("reveal");

      if (!reduceMotion) {
        element.style.setProperty(
          "--reveal-delay",
          `${Math.min(index * 45, 300)}ms`
        );
      }
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach(element => {
        element.classList.add("is-visible");
      });
    } else {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -45px 0px"
        }
      );

      revealElements.forEach(element => observer.observe(element));
    }
  }

  /* ---------------------------------------------
     Back to top
  --------------------------------------------- */

  let topButton = document.querySelector("[data-back-to-top]");

  if (!topButton) {
    topButton = document.createElement("button");
    topButton.type = "button";
    topButton.className = "back-to-top";
    topButton.dataset.backToTop = "";
    topButton.setAttribute("aria-label", "Back to top");
    topButton.innerHTML = "<span aria-hidden=\"true\">↑</span>";
    body.appendChild(topButton);
  }

  const updateTopButton = () => {
    topButton.classList.toggle("show", window.scrollY > 500);
  };

  updateTopButton();
  window.addEventListener("scroll", updateTopButton, { passive: true });

  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });

  /* ---------------------------------------------
     Smooth internal links
  --------------------------------------------- */

  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  /* ---------------------------------------------
     Contact form feedback
  --------------------------------------------- */

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", () => {
      const submitButton = form.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

      if (!submitButton) return;

      submitButton.dataset.originalText =
        submitButton.textContent || submitButton.value;

      if (submitButton.tagName === "BUTTON") {
        submitButton.textContent = "Sending...";
      } else {
        submitButton.value = "Sending...";
      }

      submitButton.disabled = true;

      window.setTimeout(() => {
        submitButton.disabled = false;

        if (submitButton.tagName === "BUTTON") {
          submitButton.textContent =
            submitButton.dataset.originalText || "Send Message";
        } else {
          submitButton.value =
            submitButton.dataset.originalText || "Send Message";
        }
      }, 5000);
    });
  });

  /* ---------------------------------------------
     Current year
  --------------------------------------------- */

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
