"use strict";
document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
document.querySelectorAll('#navbarNav a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    const menu = document.querySelector("#navbarNav");
    if (menu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
const form = document.querySelector("#consulta-whatsapp");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.nombre.value.trim();
    const message = form.elements.mensaje.value.trim();
    if (!name || !message) {
      document.querySelector("#estado-consulta").textContent = "Completá tu nombre y consulta.";
      return;
    }
    const email = form.elements.email.value.trim();
    const text = `Hola, soy ${name}. ${message}${email ? `\nMi correo: ${email}` : ""}`;
    window.location.assign(`https://wa.me/542976211211?text=${encodeURIComponent(text)}`);
  });
}

/* Revelado al entrar en pantalla y tagline palabra por palabra.
   Usan IntersectionObserver; no hay listeners de scroll. */
(() => {
  window.siteReady = true; // avisa al HTML que este script corrió (ver js-failed)
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canObserve = "IntersectionObserver" in window && !reduceMotion;

  // Un elemento "cruzó" la línea si está dentro del área observada o ya quedó por encima
  // (por ejemplo, al llegar a la página desde un ancla más abajo).
  const crossed = entry => entry.isIntersecting ||
    (entry.rootBounds ? entry.boundingClientRect.top < entry.rootBounds.top : entry.boundingClientRect.top < 0);

  const reveals = document.querySelectorAll(".reveal");
  if (!canObserve) {
    reveals.forEach(el => el.classList.add("is-visible"));
  } else {
    reveals.forEach(el => {
      const group = [...el.parentElement.children].filter(child => child.classList.contains("reveal"));
      el.style.setProperty("--i", Math.min(group.indexOf(el), 4));
    });
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!crossed(entry)) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    reveals.forEach(el => revealObserver.observe(el));
  }

  const tagline = document.querySelector("[data-tagline]");
  if (tagline && canObserve) {
    const words = tagline.textContent.trim().split(/\s+/);
    tagline.textContent = "";
    const spans = words.map((word, index) => {
      const span = document.createElement("span");
      span.className = "tagline-word";
      span.textContent = word;
      tagline.append(span);
      if (index < words.length - 1) tagline.append(" ");
      return span;
    });
    tagline.closest(".tagline").classList.add("is-armed");
    const wordObserver = new IntersectionObserver((entries, observer) => {
      entries
        .filter(crossed)
        .sort((a, b) => spans.indexOf(a.target) - spans.indexOf(b.target))
        .forEach((entry, order) => {
          entry.target.style.transitionDelay = `${order * 60}ms`;
          entry.target.classList.add("is-on");
          observer.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -35% 0px", threshold: 0 });
    spans.forEach(span => wordObserver.observe(span));
  }
})();
