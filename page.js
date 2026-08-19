(function () {
  var sections = Array.from(
    document.querySelectorAll("#home, #intro, #review, #mores"),
  );

  var navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));

  function setActive(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", isActive);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  setActive("home");
})();

(function () {
  var toggleBtn = document.getElementById("navToggleBtn");
  var navLinksEl = document.getElementById("navLinks");

  if (!toggleBtn || !navLinksEl) return;

  function closeMenu() {
    navLinksEl.classList.remove("is-open");
    toggleBtn.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    navLinksEl.classList.add("is-open");
    toggleBtn.classList.add("is-open");
    toggleBtn.setAttribute("aria-expanded", "true");
  }

  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    navLinksEl.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  navLinksEl.querySelectorAll("[data-nav-link]").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (e) {
    var inside = navLinksEl.contains(e.target) || toggleBtn.contains(e.target);

    if (!inside && navLinksEl.classList.contains("is-open")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 767) closeMenu();
  });
})();
