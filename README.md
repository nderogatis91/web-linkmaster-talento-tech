# Linkmaster - Proyecto Final Front End

Este repositorio contiene el proyecto integrador del curso Front End. Consiste en una *landing page* interactiva y responsiva para **Linkmaster**, una empresa dedicada a ofrecer soluciones integrales en seguridad electrónica, telecomunicaciones, infraestructura IT y desarrollo web. 
La página está desarrollada puramente con HTML y CSS, implementando CSS Grid, Flexbox, y Media Queries.

---

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