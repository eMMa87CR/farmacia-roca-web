(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function initNav() {
    var nav = document.querySelector("[data-nav]");
    if (!nav) return;
    var update = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: reduced ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", id);
    });
  }

  function initReveals() {
    var els = document.querySelectorAll(".reveal, .wave-reveal");
    var showAll = function () { els.forEach(function (el) { el.classList.add("is-in"); }); };
    if (!("IntersectionObserver" in window)) { showAll(); return; }
    // Un elemento recortado con clip-path al 0 no cuenta como visible,
    // así que para .wave-reveal se observa su contenedor.
    var targets = new Map();
    els.forEach(function (el) {
      var watched = el.classList.contains("wave-reveal") ? el.parentElement : el;
      if (!targets.has(watched)) targets.set(watched, []);
      targets.get(watched).push(el);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          (targets.get(entry.target) || []).forEach(function (el) { el.classList.add("is-in"); });
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -4% 0px" });
    targets.forEach(function (_, watched) { io.observe(watched); });
    // Red de seguridad: a los 6 s se muestra todo lo que siga oculto.
    setTimeout(showAll, 6000);
  }

  function boot() {
    safe(initYear, "initYear");
    safe(initNav, "initNav");
    safe(initAnchors, "initAnchors");
    safe(initReveals, "initReveals");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
