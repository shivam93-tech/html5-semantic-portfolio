(() => {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll(".theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;

  function updateThemeButton() {
    const isLight = root.dataset.theme === "light";
    themeButtons.forEach((button) => {
      button.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
      const label = button.querySelector(".theme-label");
      const icon = button.querySelector(".theme-icon");
      if (label) label.textContent = isLight ? "Dark mode" : "Light mode";
      if (icon) icon.textContent = isLight ? "☾" : "☼";
    });
    const themeColor = root.dataset.theme === "light" ? "#f5f8fb" : "#0b1220";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
  }

  themeButtons.forEach((button) => button.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("portfolio-theme", root.dataset.theme);
    updateThemeButton();
  }));

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !isOpen);
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        nav.classList.remove("is-open");
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
  updateThemeButton();
})();