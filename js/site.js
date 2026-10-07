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
