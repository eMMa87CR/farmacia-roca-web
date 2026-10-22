# Farmacia Roca

Sitio de una página de Farmacia Roca (Avda. Polonia 324, Comodoro Rivadavia), orientado a que el visitante escriba por WhatsApp.

## Estructura

- `index.html`, `styles.css`, `main.js`: el sitio. HTML, CSS y JS sin build ni dependencias.
- `lib/manifest.js`: datos de la farmacia en `window.__BRAND__` (WhatsApp, horarios, obras sociales).
- `assets/img/*.webp`: imágenes del sitio. Los `.jpg` y `.png` originales quedan para el sitio anterior.
- `assets/fonts/`: Manrope local.
- `.htaccess`: caché para Hostinger o Apache. GitHub Pages lo ignora.
- `anterior/`: sitio anterior de seis páginas, archivado. No se enlaza desde el sitio nuevo.

## Ver en local

Abrir `index.html` con doble clic, o servir la carpeta: `python3 -m http.server 8765`.

## Publicar

Al cambiar `styles.css` o `main.js`, actualizar `?v=AAAAMMDD` en `index.html`.

## Espacios reservados

`<!-- FORMULARIO -->`, `<!-- CALENDARIO -->`, `<!-- WHATSAPP -->` y `<!-- CHAT -->` se completan con el sistema que se elija. No modificar su texto.

## Pendiente de confirmar

Número de WhatsApp vigente, qué se agenda, director técnico, URLs de Instagram y Facebook, y foto para el control de presión. Los marcadores `[Completar ...]` están visibles en la página.
