document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("horizonNav");
  const navProgress = document.getElementById("navProgress");
  const readingValue = document.getElementById("readingValue");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll(".weather-section"));

  const LABELS = {
    sunny: "Clear & bright",
    rainy: "Steady rainfall",
    snowy: "Snow, below 0°C",
    stormy: "High winds, storm",
  };

  let hoverWeather = null; // temporarily overrides the "active" reading while hovering a nav item

  /* ---------- 1. Fixed nav changes style once the page is scrolled ---------- */
  function updateScrolledState() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  /* ---------- 2. Nav tracks which weather section is currently in view ---------- */
  function currentSectionWeather() {
    const navHeight = nav.offsetHeight;
    let current = sections[0];
    for (const section of sections) {
      const top = section.getBoundingClientRect().top - navHeight - 10;
      if (top <= 0) current = section;
    }
    return current.dataset.weather;
  }

  function updateActiveWeather() {
    const active = hoverWeather || currentSectionWeather();
    nav.setAttribute("data-active", active);

    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.dataset.weather === active && !hoverWeather,
      );
    });

    readingValue.textContent = LABELS[active] || "—";
  }

  /* ---------- 3. Scroll progress bar across the four weather sections ---------- */
  function updateProgress() {
    const first = sections[0];
    const last = sections[sections.length - 1];
    const start = first.offsetTop;
    const end = last.offsetTop + last.offsetHeight - window.innerHeight;
    const scrolled = window.scrollY - start;
    const pct = Math.min(100, Math.max(0, (scrolled / (end - start)) * 100));
    navProgress.style.width = pct + "%";
  }

  function onScroll() {
    updateScrolledState();
    updateActiveWeather();
    updateProgress();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------- 4. Hovering a nav item previews that weather's color instantly ---------- */
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      hoverWeather = link.dataset.weather;
      updateActiveWeather();
    });
    link.addEventListener("mouseleave", () => {
      hoverWeather = null;
      updateActiveWeather();
    });
    link.addEventListener("focus", () => {
      hoverWeather = link.dataset.weather;
      updateActiveWeather();
    });
    link.addEventListener("blur", () => {
      hoverWeather = null;
      updateActiveWeather();
    });
  });

  onScroll(); // set initial state on load
});
