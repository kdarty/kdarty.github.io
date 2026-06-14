/* Theme toggle (light/dark) + mobile nav.
   The *initial* theme is set by an inline script in <head> to avoid a
   flash of the wrong theme; this file handles user interaction. */
(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "kd-theme";

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  var THEME_COLORS = { light: "#f0eee6", dark: "#1f1e1d" };

  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);

    var meta = document.getElementById("theme-color-meta");
    if (meta) meta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.light);

    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    }
  }

  function init() {
    // Sync the toggle label with whatever the inline script already set.
    applyTheme(currentTheme(), false);

    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
      });
    }

    // Follow OS changes only while the user hasn't made an explicit choice.
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        var stored;
        try { stored = localStorage.getItem(STORAGE_KEY); } catch (err) { stored = null; }
        if (!stored) applyTheme(e.matches ? "dark" : "light", false);
      });
    }

    // Mobile nav toggle.
    var menuBtn = document.getElementById("menu-toggle");
    var nav = document.getElementById("primary-nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          nav.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
