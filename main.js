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

  // ---------- Formularios que abren WhatsApp ----------
  var brand = window.__BRAND__ || {};
  var WA = brand.whatsapp || "542976211211";

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function isoLocal(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parseISO(v) {
    var p = (v || "").split("-");
    if (p.length !== 3) return null;
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return isNaN(d) ? null : d;
  }
  function fechaLarga(d) {
    try { return d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }).replace(",", ""); }
    catch (e) { return pad(d.getDate()) + "/" + pad(d.getMonth() + 1); }
  }

  function openWhatsApp(text) {
    var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(text);
    // Sin "noopener" en window.open: con esa opción devuelve null siempre
    // y no se podría detectar un bloqueo. Se corta el vínculo a mano.
    var win = window.open(url, "_blank");
    if (win) { try { win.opener = null; } catch (e) {} }
    else window.location.href = url;   // si el navegador bloquea la ventana nueva
  }

  function fail(form, field, msg) {
    var box = form.querySelector(".form-error");
    if (box) box.textContent = msg;
    if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
    return false;
  }
  function clearErrors(form) {
    var box = form.querySelector(".form-error");
    if (box) box.textContent = "";
    form.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });
  }

  var FRANJAS_SEMANA = [
    ["a la mañana (9 a 12 hs)", "Mañana · 9 a 12"],
    ["a la tarde (15 a 20 hs)", "Tarde · 15 a 20"]
  ];
  var FRANJAS_SABADO = [["entre las 9 y las 15 hs", "Sábado · 9 a 15"]];

  function setFranjas(select, list) {
    var prev = select.value;
    select.innerHTML = "";
    list.forEach(function (f) {
      var o = document.createElement("option");
      o.value = f[0]; o.textContent = f[1];
      select.appendChild(o);
    });
    if (list.some(function (f) { return f[0] === prev; })) select.value = prev;
  }

  function initAgendar() {
    var form = document.querySelector('[data-wa-form="agendar"]');
    if (!form || form.dataset.bound) return;
    form.dataset.bound = "1";
    var nombre = form.elements.nombre, control = form.elements.control,
        dia = form.elements.dia, franja = form.elements.franja;

    var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    dia.min = isoLocal(hoy);
    var max = new Date(hoy); max.setDate(max.getDate() + 60);
    dia.max = isoLocal(max);

    dia.addEventListener("change", function () {
      var d = parseISO(dia.value);
      setFranjas(franja, d && d.getDay() === 6 ? FRANJAS_SABADO : FRANJAS_SEMANA);
    });
    form.addEventListener("input", function () { clearErrors(form); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors(form);
      var n = nombre.value.trim();
      if (!n) return fail(form, nombre, "Escribí tu nombre.");
      var d = parseISO(dia.value);
      if (!d) return fail(form, dia, "Elegí un día.");
      if (d < hoy) return fail(form, dia, "Elegí un día de hoy en adelante.");
      if (d.getDay() === 0) return fail(form, dia, "Los domingos la farmacia está cerrada. Elegí otro día.");
      openWhatsApp("Hola Farmacia Roca, soy " + n + ". Quiero agendar un " + control.value +
        " para el " + fechaLarga(d) + " " + franja.value + ". ¿Tienen disponibilidad?");
    });
  }

  function initConsulta() {
    var form = document.querySelector('[data-wa-form="consulta"]');
    if (!form || form.dataset.bound) return;
    form.dataset.bound = "1";
    var nombre = form.elements.nombre, tema = form.elements.tema, mensaje = form.elements.mensaje;
    form.addEventListener("input", function () { clearErrors(form); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors(form);
      var n = nombre.value.trim(), m = mensaje.value.trim();
      if (!n) return fail(form, nombre, "Escribí tu nombre.");
      if (m.length < 5) return fail(form, mensaje, "Contanos tu consulta.");
      openWhatsApp("Hola Farmacia Roca, soy " + n + ". Consulta sobre " + tema.value + ":\n" + m);
    });
  }

  function boot() {
    safe(initYear, "initYear");
    safe(initNav, "initNav");
    safe(initAnchors, "initAnchors");
    safe(initReveals, "initReveals");
    safe(initAgendar, "initAgendar");
    safe(initConsulta, "initConsulta");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
