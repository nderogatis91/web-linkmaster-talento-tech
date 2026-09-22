# Ejercicio Clase 3

## Configuración de Formspree

Para que el formulario de contacto de la página funcione sin necesidad de desarrollar un backend propio, utilicé **Formspree**. 

### ¿Cómo lo configuré?
1. Creé una cuenta en [Formspree](https://formspree.io/) y generé un nuevo formulario para obtener un "endpoint" (una URL única).
2. En el archivo `contacto.html`, modifiqué la etiqueta `<form>` agregando los siguientes atributos:
   - `action="https://formspree.io/f/mrpgoodj"`: Esto indica hacia dónde deben enviarse los datos cuando el usuario hace clic en enviar.
   - `method="POST"`: Es el método HTTP seguro utilizado para enviar la información ingresada.
3. Me aseguré de que cada campo del formulario (`<input>`, `<textarea>`) tuviera su atributo `name` correspondiente (ej: `name="nombre"`, `name="email"`), ya que Formspree utiliza este atributo para identificar los datos que llegan.

### ¿Por qué es útil?
- **Sin necesidad de Backend:** Permite capturar la información ingresada por los usuarios en formularios HTML puramente estáticos, ahorrando el tiempo de tener que programar y mantener un servidor o base de datos.
- **Notificaciones automáticas:** Redirige automáticamente los mensajes enviados a través del formulario directamente a la bandeja de entrada de mi correo electrónico.
- **Fácil implementación:** Solo requiere modificar un par de atributos (`action` y `method`) en el código HTML existente, lo cual hace que sea una solución muy ágil para proyectos de Front-End.

---

## Ejercicio Clase 4

### Incorporación de CSS y Estilos de Navegación

En esta clase se avanzó con el diseño visual del proyecto implementando hojas de estilo en cascada (CSS).

- **CSS Externo:** Se creó el archivo `styles.css` y se vinculó al documento HTML principal utilizando la etiqueta `<link rel="stylesheet" href="styles.css">` dentro del `<head>`. (También se vinculó a la página de contacto).
- **Estructura Base:** Se aplicaron colores de fondo y estilos de fuente al `header`, `footer` y al `body` en general para darle una identidad visual consistente.
- **Barra de Navegación (Navbar):** 
  - Se eliminaron las viñetas por defecto de la lista con `list-style: none`.
  - Se quitaron los subrayados azules predeterminados de los enlaces y se ajustó su color (`text-decoration: none`).
  - Se implementó **Flexbox** (`display: flex`) en la lista `.nav-list` para alinear los enlaces de forma horizontal, centrándolos en la pantalla y dándoles una separación uniforme mediante la propiedad `gap`. 
  - Se aplicaron selectores de CSS específicos (como `.nav-list a`) para asegurar que los estilos afecten únicamente a la barra de navegación, asegurando un código limpio y sin conflictos.

---

## Ejercicio Clase 5

### Tipografía y Recursos Multimedia (Iconos)

En esta clase se integraron recursos externos para enriquecer el diseño y la identidad visual de la página.

- **Google Fonts:** Se importó la tipografía "Google Sans Flex" directamente desde el servicio de Google Fonts mediante etiquetas `<link>` en el `<head>`. Luego, se aplicó esta fuente de manera global a todo el sitio usando la propiedad `font-family` en el selector `html` del archivo CSS.
- **Fondos de Secciones:** Se mantuvo la aplicación de colores de fondo (`background-color`) personalizados en las etiquetas semánticas `<header>` y `<footer>` para diferenciar visualmente las áreas de la página.
- **Iconos de Redes Sociales:** Se agregó una nueva sección en el `<footer>` que contiene una lista (`<ul>`) con iconos (imágenes) representativos de Facebook, Twitter e Instagram.
- **Enlaces (Links):** Cada icono fue envuelto en una etiqueta `<a>` (anchor) con su respectivo atributo `href` apuntando hacia la URL de la red social correspondiente, permitiendo a los usuarios navegar hacia ellas al hacer clic en las imágenes.
