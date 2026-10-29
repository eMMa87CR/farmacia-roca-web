# Farmacia Roca

Sitio de una página de Farmacia Roca (Avda. Polonia 324, Comodoro Rivadavia), orientado a que el visitante escriba por WhatsApp.

## Estructura

- `index.html`, `styles.css`, `main.js`: el sitio. HTML, CSS y JS sin build ni dependencias.
- `lib/manifest.js`: datos de la farmacia en `window.__BRAND__` (WhatsApp, horarios, obras sociales).
- `assets/img/*.webp`: imágenes del sitio. `frente-dia.webp` (fondo del hero) sale de `foto frente.jpg`. Los `.jpg` y `.png` originales quedan para el sitio anterior.
- `assets/fonts/`: Manrope local.
- `.htaccess`: caché para Hostinger o Apache. GitHub Pages lo ignora.
- `anterior/`: sitio anterior de seis páginas, archivado. No se enlaza desde el sitio nuevo.

## Ver en local

Abrir `index.html` con doble clic, o servir la carpeta: `python3 -m http.server 8765`.

## Publicar

Al cambiar `styles.css` o `main.js`, actualizar `?v=AAAAMMDD` en `index.html`.

## Agendar y consultas

Los dos formularios de Contacto no envían datos a ningún servidor: arman el texto y abren WhatsApp (297 621-1211) para que la persona lo envíe. "Agendar" pide control de presión o glucemia con día y franja horaria (sábado 9 a 15, domingo cerrado); el turno se confirma por WhatsApp. Sin JavaScript, el botón abre el chat sin texto.

## Espacios reservados

`<!-- FORMULARIO -->`, `<!-- CALENDARIO -->`, `<!-- WHATSAPP -->` y `<!-- CHAT -->` se completan con el sistema que se elija. No modificar su texto.

## Pendiente antes de publicar

- Director técnico y matrícula (marcador `[Completar ...]` visible en el footer).
- Dominio, hosting y Google Business Profile.
