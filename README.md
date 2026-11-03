# Linkmaster - Proyecto Final E-Commerce (Front End)

Este repositorio contiene el **Proyecto Final Integrador** del curso de Front End de TalentoTech. 
Consiste en una plataforma web y tienda online interactiva para **Linkmaster**, una empresa especializada en soluciones integrales de seguridad electrónica, telecomunicaciones, infraestructura IT y desarrollo web.

El proyecto combina una arquitectura semántica y responsiva en **HTML5** y **CSS3** con dinamismo, consumo asíncrono de datos y persistencia en **JavaScript moderno (ES6+)**.

---

## 🚀 Tecnologías y Herramientas Utilizadas

* **HTML5 Semántico:** Uso de etiquetas estructurales (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) con optimización de accesibilidad (`alt` en imágenes, etiquetas `aria-label`) y metaetiquetas SEO en el `<head>`.
* **CSS3 Moderno:**
  * Maquetación flexible con **Flexbox** en la barra de navegación, tarjetas de servicios y catálogo de planes.
  * Grilla bidimensional con **CSS Grid** en la sección de testimonios/reseñas.
  * Diseño 100% responsivo mediante **Media Queries** (estrategia adaptable para Mobile, Tablet y Desktop).
  * Tipografías de **Google Fonts** (`Google Sans Flex`) e iconografía con **Font Awesome**.
* **JavaScript (ES6+):**
  * **Fetch API & JSON:** Carga asíncrona de datos desde el archivo de catálogo (`files/planes.json`) y renderizado dinámico en el DOM con manejo de errores (`.catch()`).
  * **Manipulación del DOM:** Creación dinámica de tarjetas, apertura/cierre de modales, edición interactiva de cantidades y actualización de totales.
  * **Persistencia de Datos (LocalStorage):** Guardado y recuperación del estado del carrito con `JSON.stringify()` y `JSON.parse()` para mantener la selección activa entre recargas y sesiones.
  * **Validación de Formularios con JS:** Control estricto de campos obligatorios, validación de formato de correo electrónico y teléfono antes de procesar el pedido.
* **Formspree:** Integración para el procesamiento del formulario de contacto general sin necesidad de backend propio.

---

## 🛒 Funcionalidades del E-Commerce y Carrito

1. **Catálogo Dinámico de Suscripciones y Adicionales:**
   * Carga dinámica de 4 planes principales (Home Basic, Home Premium, PYME, Enterprise) y módulos adicionales extra.
   * Visualización detallada de servicios incluidos, precios formateados y botón interactivo *"Añadir al Carrito"*.
2. **Carrito de Compras Persistente:**
   * Contador en tiempo real ubicado en la barra de navegación que refleja la cantidad total de servicios contratados.
   * Guardado automático en `LocalStorage`.
3. **Modal de Gestión y Checkout en Dos Pasos:**
   * **Paso 1 (Tu Carrito):** Visualización de los planes elegidos con controles para sumar o restar cantidades (`+` / `-`), botón para eliminar items individuales, vaciar carrito y cálculo del total mensual acumulado.
   * **Paso 2 (Datos de Contratación):** Al avanzar con *"Continuar con la Contratación"*, se despliega el formulario para ingresar Nombre y Apellido, Teléfono, Correo Electrónico y Localidad.
   * **Validación y Simulación de Compra:** Validación completa con JavaScript. Solo cuando los datos son válidos, se confirma la contratación con un resumen detallado, se vacía el carrito y se actualiza el almacenamiento local.

---

## 📬 Configuración de Formspree (Contacto General)

Para el formulario de consultas generales ubicado en la sección de contacto:
1. Se utiliza el servicio de **Formspree** mediante el endpoint configurado en `pages/contacto.html`.
2. El formulario envía los datos mediante método `POST` de forma segura, redirigiendo los mensajes directamente a la casilla de correo configurada sin requerir un servidor dedicado.

---

## 🌐 Despliegue / Hosting

El proyecto se encuentra publicado y disponible para su navegación en vivo a través de:
* **GitHub Pages:** `https://nderogatis91.github.io/web-linkmaster-talento-tech/index.html`
* **Repositorio de GitHub:** `https://github.com/nderogatis91/web-linkmaster-talento-tech`

---

## 💻 Instrucciones para Ejecución Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/nderogatis91/web-linkmaster-talento-tech.git
   ```
2. Abrir la carpeta del proyecto en tu editor de código (por ejemplo VS Code).
3. Iniciar un servidor local (por ejemplo mediante la extensión **Live Server** haciendo clic derecho en `index.html` > *"Open with Live Server"*).
4. El sitio se abrirá automáticamente en tu navegador predeterminado en `http://localhost:5500`.

---
*Desarrollado por Nicolas De Rogatis*
