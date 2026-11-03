// ==========================================================================
// PROYECTO FINAL FRONT END - LINKMASTER (Clases 12 a 16)
// ==========================================================================

// Ruta del archivo JSON con los datos de suscripciones y adicionales
const PLANES_URL = "./files/planes.json";

// Estado del carrito: Recuperar de localStorage o iniciar con array vacío
let carrito = JSON.parse(localStorage.getItem("carritoLinkmaster")) || [];

// ==========================================================================
// 1. OBTENER Y RENDERIZAR PRODUCTOS/PLANES CON FETCH (Clase 14)
// ==========================================================================
function cargarPlanes() {
    const contenedor = document.getElementById("lista-planes");
    if (!contenedor) return;

    contenedor.innerHTML = "<li style='width: 100%; text-align: center;'>Cargando planes disponibles...</li>";

    fetch(PLANES_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - No se pudo cargar el catálogo.`);
            }
            return response.json();
        })
        .then(planes => {
            contenedor.innerHTML = ""; // Limpiamos mensaje de carga

            planes.forEach(plan => {
                const li = document.createElement("li");

                // Creamos la tarjeta
                const article = document.createElement("article");
                article.classList.add("card-servicios");

                // Si es un adicional, añadimos clase especial para diseño compacto
                const esAdicional = plan.tipo === "adicional";
                if (esAdicional) {
                    li.classList.add("item-adicional");
                    article.classList.add("card-adicional");
                }

                // Imagen (solo para los planes principales)
                if (!esAdicional && plan.imagen) {
                    const img = document.createElement("img");
                    img.src = plan.imagen;
                    img.alt = plan.nombre;
                    article.appendChild(img);
                }

                // Título
                const pTitulo = document.createElement("p");
                pTitulo.innerHTML = `<strong>${plan.nombre}</strong>`;
                article.appendChild(pTitulo);

                // Descripción breve
                const pDesc = document.createElement("p");
                pDesc.classList.add("desc-texto");
                pDesc.textContent = plan.descripcion;
                article.appendChild(pDesc);

                // Lista de características / servicios incluidos
                if (plan.servicios && plan.servicios.length > 0) {
                    const ulServicios = document.createElement("ul");
                    ulServicios.classList.add("detalles-servicios");
                    plan.servicios.forEach(servicio => {
                        const liServicio = document.createElement("li");
                        liServicio.textContent = servicio;
                        ulServicios.appendChild(liServicio);
                    });
                    article.appendChild(ulServicios);
                }

                // Precio destacado
                const pPrecio = document.createElement("p");
                pPrecio.classList.add("precio-destacado");
                pPrecio.innerHTML = `<strong>$${plan.precio.toLocaleString("es-AR")}</strong> / mes`;
                article.appendChild(pPrecio);

                // Botón Añadir al Carrito
                const divBotones = document.createElement("div");
                divBotones.classList.add("botones-container");

                const btnAgregar = document.createElement("button");
                btnAgregar.classList.add("btn-consultar");
                btnAgregar.innerHTML = `<i class="fas fa-cart-plus"></i> Añadir al Carrito`;
                btnAgregar.addEventListener("click", () => {
                    agregarAlCarrito(plan);
                });

                divBotones.appendChild(btnAgregar);
                article.appendChild(divBotones);

                li.appendChild(article);
                contenedor.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error al obtener los planes:", error);
            contenedor.innerHTML = `
                <li style="width: 100%; text-align: center; color: red;">
                    <p>Ocurrió un error al cargar las suscripciones. Por favor, reintentá más tarde.</p>
                </li>
            `;
        });
}

// ==========================================================================
// 2. GESTIÓN DEL CARRITO (Clases 13 y 14)
// ==========================================================================

// Guardar en LocalStorage
function guardarCarrito() {
    localStorage.setItem("carritoLinkmaster", JSON.stringify(carrito));
}

// Actualizar el contador en el Nav
function actualizarContador() {
    const contadorElem = document.getElementById("contador-carrito");
    if (!contadorElem) return;

    const totalCantidad = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
    contadorElem.textContent = totalCantidad;
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {
    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarContador();
    renderizarCarrito();

    alert(`"${producto.nombre}" fue añadido al carrito exitosamente.`);
}

// Modificar cantidad (+ / -)
function cambiarCantidad(id, cambio) {
    const item = carrito.find(p => p.id === id);
    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }

    guardarCarrito();
    actualizarContador();
    renderizarCarrito();
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarContador();
    renderizarCarrito();
}

// Vaciar carrito completo
function vaciarCarrito() {
    if (carrito.length === 0) return;

    const confirmar = confirm("¿Estás seguro de que querés vaciar todo el carrito?");
    if (confirmar) {
        carrito = [];
        guardarCarrito();
        actualizarContador();
        renderizarCarrito();
    }
}

// Calcular total acumulado del carrito
function calcularTotalCarrito() {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

// Renderizar la lista de items en el modal
function renderizarCarrito() {
    const listaElem = document.getElementById("carrito-lista");
    const vacioMsg = document.getElementById("carrito-vacio-msg");
    const totalElem = document.getElementById("carrito-total");
    const btnIrCheckout = document.getElementById("btn-ir-checkout");
    if (!listaElem || !vacioMsg || !totalElem) return;

    listaElem.innerHTML = "";

    if (carrito.length === 0) {
        vacioMsg.style.display = "block";
        totalElem.textContent = "$0";
        if (btnIrCheckout) btnIrCheckout.disabled = true;
        return;
    }

    vacioMsg.style.display = "none";
    if (btnIrCheckout) btnIrCheckout.disabled = false;

    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const div = document.createElement("div");
        div.classList.add("carrito-item");

        div.innerHTML = `
            <div class="carrito-item-info">
                <h4>${item.nombre}</h4>
                <p>$${item.precio.toLocaleString("es-AR")} c/u | Subtotal: <strong>$${subtotal.toLocaleString("es-AR")}</strong></p>
            </div>
            <div class="carrito-item-controles">
                <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, -1)" aria-label="Restar una unidad">-</button>
                <span><strong>${item.cantidad}</strong></span>
                <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, 1)" aria-label="Sumar una unidad">+</button>
                <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${item.id})" aria-label="Eliminar producto" title="Eliminar">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

        listaElem.appendChild(div);
    });

    totalElem.textContent = `$${total.toLocaleString("es-AR")}`;
}

// ==========================================================================
// 3. NAVEGACIÓN DENTRO DEL MODAL (Vista Carrito vs Vista Checkout)
// ==========================================================================
function mostrarVistaCarrito() {
    const vistaCarrito = document.getElementById("vista-carrito");
    const vistaCheckout = document.getElementById("vista-checkout");
    const titulo = document.getElementById("modal-titulo");

    if (vistaCarrito && vistaCheckout) {
        vistaCarrito.classList.remove("oculto");
        vistaCheckout.classList.add("oculto");
    }
    if (titulo) {
        titulo.innerHTML = `<i class="fas fa-shopping-cart"></i> Tu Carrito de Suscripciones`;
    }
    renderizarCarrito();
}

function mostrarVistaCheckout() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agregá al menos un plan para continuar.");
        return;
    }

    const vistaCarrito = document.getElementById("vista-carrito");
    const vistaCheckout = document.getElementById("vista-checkout");
    const titulo = document.getElementById("modal-titulo");
    const resumenTotal = document.getElementById("checkout-total-resumen");

    if (vistaCarrito && vistaCheckout) {
        vistaCarrito.classList.add("oculto");
        vistaCheckout.classList.remove("oculto");
    }
    if (titulo) {
        titulo.innerHTML = `<i class="fas fa-clipboard-check"></i> Datos para la Contratación`;
    }
    if (resumenTotal) {
        resumenTotal.textContent = `$${calcularTotalCarrito().toLocaleString("es-AR")} / mes`;
    }

    limpiarErroresCheckout();
}

function abrirModalCarrito() {
    const modal = document.getElementById("modal-carrito");
    if (modal) {
        mostrarVistaCarrito();
        modal.classList.remove("oculto");
    }
}

function cerrarModalCarrito() {
    const modal = document.getElementById("modal-carrito");
    if (modal) {
        modal.classList.add("oculto");
        mostrarVistaCarrito(); // Reseteamos a la vista 1 para la próxima apertura
    }
}

// ==========================================================================
// 4. VALIDACIÓN CON JS DEL FORMULARIO DE CHECKOUT (Clases 10 y 14)
// ==========================================================================
function limpiarErroresCheckout() {
    const campos = ["nombre", "telefono", "email", "localidad"];
    campos.forEach(c => {
        const input = document.getElementById(`checkout-${c}`);
        const errorSpan = document.getElementById(`error-${c}`);
        if (input) input.classList.remove("campo-invalido");
        if (errorSpan) errorSpan.textContent = "";
    });
}

function procesarCheckout() {
    // 1. Capturar valores
    const inputNombre = document.getElementById("checkout-nombre");
    const inputTelefono = document.getElementById("checkout-telefono");
    const inputEmail = document.getElementById("checkout-email");
    const inputLocalidad = document.getElementById("checkout-localidad");

    const nombre = inputNombre ? inputNombre.value.trim() : "";
    const telefono = inputTelefono ? inputTelefono.value.trim() : "";
    const email = inputEmail ? inputEmail.value.trim() : "";
    const localidad = inputLocalidad ? inputLocalidad.value.trim() : "";

    let esValido = true;
    limpiarErroresCheckout();

    // 2. Validación de Nombre y Apellido (al menos 3 caracteres y letras)
    if (nombre === "" || nombre.length < 3 || !isNaN(nombre)) {
        document.getElementById("error-nombre").textContent = "Por favor, ingresá un nombre y apellido válido.";
        inputNombre.classList.add("campo-invalido");
        esValido = false;
    }

    // 3. Validación de Teléfono (mínimo 8 dígitos numéricos)
    const telRegex = /^[0-9+\s-]{8,15}$/;
    if (telefono === "" || !telRegex.test(telefono)) {
        document.getElementById("error-telefono").textContent = "Ingresá un teléfono válido (mínimo 8 números).";
        inputTelefono.classList.add("campo-invalido");
        esValido = false;
    }

    // 4. Validación de Correo con operador lógico y presencia de @ y . (visto en Clase 10)
    if (email === "" || !email.includes("@") || !email.includes(".") || email.length < 6) {
        document.getElementById("error-email").textContent = "Ingresá un correo electrónico válido (ej: nombre@correo.com).";
        inputEmail.classList.add("campo-invalido");
        esValido = false;
    }

    // 5. Validación de Localidad
    if (localidad === "" || localidad.length < 3) {
        document.getElementById("error-localidad").textContent = "Por favor, especificá tu localidad o zona.";
        inputLocalidad.classList.add("campo-invalido");
        esValido = false;
    }

    // Si falló alguna validación, frenamos el envío sin vaciar nada
    if (!esValido) {
        return;
    }

    // ======================================================================
    // 5. CONFIRMACIÓN Y VACIADO DEL CARRITO TRAS VALIDAR EXITOSAMENTE
    // ======================================================================
    const totalContratado = calcularTotalCarrito();
    const cantPlanes = carrito.reduce((acc, i) => acc + i.cantidad, 0);

    const mensajeExito = 
        `¡Muchas gracias, ${nombre}!\n\n` +
        `Tu solicitud de contratación por ${cantPlanes} servicio(s) fue procesada con éxito.\n` +
        `Total mensual estimado: $${totalContratado.toLocaleString("es-AR")}\n\n` +
        `En las próximas 24 hs un asesor se comunicará al teléfono ${telefono} o al correo ${email} para coordinar la activación de tus planes en ${localidad}.`;

    alert(mensajeExito);

    // AQUÍ SÍ, recién ahora que tenemos los datos válidos, vaciamos el carrito:
    carrito = [];
    guardarCarrito();
    actualizarContador();
    renderizarCarrito();

    // Limpiamos los inputs del formulario
    inputNombre.value = "";
    inputTelefono.value = "";
    inputEmail.value = "";
    inputLocalidad.value = "";

    // Cerramos el modal
    cerrarModalCarrito();
}

// ==========================================================================
// 6. INICIALIZACIÓN DE EVENTOS Y CARGA
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializar contador y render del carrito guardado en localStorage
    actualizarContador();

    // 2. Cargar productos desde el JSON con fetch
    cargarPlanes();

    // 3. Eventos del modal
    const btnAbrir = document.getElementById("btn-abrir-carrito");
    const btnCerrar = document.getElementById("btn-cerrar-carrito");
    const modal = document.getElementById("modal-carrito");

    if (btnAbrir) btnAbrir.addEventListener("click", abrirModalCarrito);
    if (btnCerrar) btnCerrar.addEventListener("click", cerrarModalCarrito);

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                cerrarModalCarrito();
            }
        });
    }

    // 4. Botones de acción del carrito
    const btnVaciar = document.getElementById("btn-vaciar-carrito");
    const btnIrCheckout = document.getElementById("btn-ir-checkout");
    const btnVolverCarrito = document.getElementById("btn-volver-carrito");
    const btnConfirmarCheckout = document.getElementById("btn-confirmar-checkout");

    if (btnVaciar) btnVaciar.addEventListener("click", vaciarCarrito);
    if (btnIrCheckout) btnIrCheckout.addEventListener("click", mostrarVistaCheckout);
    if (btnVolverCarrito) btnVolverCarrito.addEventListener("click", mostrarVistaCarrito);
    if (btnConfirmarCheckout) btnConfirmarCheckout.addEventListener("click", procesarCheckout);
});
