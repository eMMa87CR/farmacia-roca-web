# Farmacia Roca

Sitio institucional de Farmacia Roca, en Polonia 324, Comodoro Rivadavia. Incluye inicio, nosotros, servicios, consejos y contacto. Conserva los contenidos e imágenes del proyecto original y mejora su estructura, estilos y navegación.

## Ejecutar y desarrollar

Requiere Node.js 22 o posterior y Corepack con pnpm 11.25.0. Si Corepack no está disponible, instalar pnpm 11.25.0 y ejecutar los comandos sin el prefijo `corepack`.

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm run build
corepack pnpm test
npm start
```

Abrir http://127.0.0.1:8080. Para recompilar estilos mientras se editan: `corepack pnpm run watch`. Las páginas también pueden abrirse directamente como archivos; Bootstrap y Font Awesome requieren conexión a Internet.

## Estructura

- `index.html` y `html/`: las cinco páginas del sitio.
- `SCSS/style.scss`: entrada de Sass. El diseño actual se define en `SCSS/layout/_design.scss`; los parciales anteriores se conservan como referencia y no se importan.
- `css/`: estilos compilados y mapa de fuentes. Regenerar con `corepack pnpm run build`.
- `js/site.js`: consulta por WhatsApp y actualización del año.
- `assets/img/`: imágenes existentes.

## Contacto

El formulario valida nombre y consulta, y abre WhatsApp con el texto preparado. El usuario debe enviarlo desde WhatsApp. No hay servidor de formularios ni almacenamiento de consultas. El correo es opcional; teléfono, correo y WhatsApp también tienen enlaces directos. El número de WhatsApp es el que ya figuraba en el sitio; confirmar sus datos con la farmacia antes de publicar.

## Publicación

El sitio usa rutas relativas compatibles con un subdirectorio de GitHub Pages. Publicar el directorio raíz de una copia propia, incluyendo el CSS compilado. Esta copia no está publicada. No se agregó un dominio canónico porque aún no hay una dirección definitiva.

## Copia segura

Rama de trabajo: `trabajo/copia-segura`. El remoto `upstream` permite descargar el original y tiene una URL de envío bloqueada. La rama `master` conserva el estado original. No enviar cambios al repositorio original. Para publicar, configurar un remoto de un repositorio nuevo autorizado.

## Alcance y próximos pasos

Esta versión corrige HTML, accesibilidad básica, rutas, SCSS, diseño móvil, metadatos locales y contacto. Mantiene el sitio estático. Un catálogo, stock, carrito y pagos requieren definir requisitos e integraciones en una etapa posterior. Revisar vigencia de textos, servicios y horarios antes de utilizar el sitio comercialmente.

## Diseño de la landing

El inicio reúne presentación, servicios, farmacia, consejos y contacto. Comparte navegación, tipografía, colores e iconos SVG locales con las páginas internas. La portada usa una fotografía existente de la farmacia. El menú móvil se cierra al seleccionar una sección. El enlace Cómo llegar abre Google Maps y no depende de un mapa embebido. Se verificó la presentación en anchos de 320, 390, 768, 1024 y 1440 píxeles.
