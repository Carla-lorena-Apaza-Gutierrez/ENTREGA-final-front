const searchIcon = document.getElementById('search-icon');
const searchModal = document.getElementById('search-modal');
const closeSearchButton = document.getElementById('close-search');

// Abrir el modal de búsqueda al hacer clic en la lupa
searchIcon.addEventListener('click', () => {
    searchModal.classList.add('visible');
    searchModal.classList.remove('hidden');
});

// Cerrar el modal de búsqueda al hacer clic en el botón de cerrar
closeSearchButton.addEventListener('click', () => {
    searchModal.classList.add('hidden');
    searchModal.classList.remove('visible');
});


// Elementos del modal de inicio de sesión
const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const closeLoginButton = document.getElementById('close-login');

// Abrir el modal al hacer clic en el ícono de logueo
loginButton.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
});

// Cerrar el modal al hacer clic en el botón "×"
closeLoginButton.addEventListener('click', () => {
    loginModal.classList.add('hidden');
});

// Opcional: Cerrar el modal si el usuario hace clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.classList.add('hidden');
    }
});




const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total');

// Array para almacenar los productos del carrito
let cart = [];

// Guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(cart));
}

// Cargar el carrito desde localStorage
function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        cart = JSON.parse(carritoGuardado);
    }
}

// Mostrar el carrito
cartButton.addEventListener('click', () => {
    cartModal.classList.add('visible');
    cartModal.classList.remove('hidden');
});

// Cerrar el carrito
closeCartButton.addEventListener('click', () => {
    cartModal.classList.add('hidden');
    cartModal.classList.remove('visible');
});

// Agregar productos al carrito
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price, 10);

        // Verifica si el producto ya está en el carrito
        const existingProduct = cart.find(product => product.id === id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        updateCart(); // Actualizar el carrito en el DOM
    });
});

// Seleccionar el botón de finalizar compra
const finalizarCompraBtn = document.querySelector('.checkout-btn');

// Asignar evento al botón de finalizar compra
finalizarCompraBtn.addEventListener('click', () => {
    // Mostrar una notificación al usuario
    alert('¡Gracias por realizar tu compra! Tu pedido ha sido procesado con éxito.');
    
    // Vaciar el carrito después de la compra
    cart = [];
    updateCart();
});

// Actualizar el carrito
function updateCart() {
    // Limpiar el contenedor de los productos
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        // Mostrar mensaje si el carrito está vacío
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío.</p>';
        cartTotal.textContent = 0; // Reiniciar el total
        guardarCarritoEnLocalStorage(); // Guardar el carrito vacío
        return; // Salir de la función
    }

    let total = 0;

    // Renderizar cada producto en el carrito
    cart.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.innerHTML = `
            <p>${product.name} - $${product.price}</p>
            <div>
                <button class="quantity-btn" data-id="${product.id}" data-action="decrease">-</button>
                <span>${product.quantity}</span>
                <button class="quantity-btn" data-id="${product.id}" data-action="increase">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(item);

        // Calcular el total
        total += product.price * product.quantity;
    });

    // Actualizar el total en el DOM
    cartTotal.textContent = total;

    guardarCarritoEnLocalStorage(); // Guardar el carrito actualizado

    // Añadir eventos para los botones de aumentar/disminuir cantidad
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            const action = button.dataset.action;

            const product = cart.find(product => product.id === id);
            if (action === 'increase') {
                product.quantity += 1;
            } else if (action === 'decrease') {
                product.quantity -= 1;
                if (product.quantity === 0) {
                    // Eliminar el producto del carrito si la cantidad es 0
                    cart = cart.filter(item => item.id !== id);
                }
            }

            updateCart(); // Actualizar el DOM y guardar los cambios
        });
    });
}

// Renderizar productos en la página
function renderizarProductos() {
    const listaProductos = document.querySelector('.producto-lista'); // Contenedor de los productos
    listaProductos.innerHTML = ''; // Limpiar el contenedor

    productos.forEach(producto => {
        // Crear el HTML de cada producto dinámicamente
        const productoHTML = `
            <li class="producto">
                <img src="${producto.img}" alt="${producto.name}">
                <p>${producto.name}<br>$${producto.price}</p>
                <button class="add-to-cart-btn" data-id="${producto.id}" data-name="${producto.name}" data-price="${producto.price}">Agregar al carrito</button>
            </li>
        `;
        listaProductos.insertAdjacentHTML('beforeend', productoHTML); // Añadir al contenedor
    });

    // Reasignar los eventos para los botones de agregar al carrito
    asignarEventosCarrito();
}

// Inicializar la página y el carrito al cargar
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDeLocalStorage(); // Cargar el carrito desde localStorage
    updateCart(); // Actualizar el DOM con los datos cargados
});




// Obtener el formulario de suscripción
const suscripcionForm = document.getElementById('suscripcion-form');

// Agregar un evento al formulario cuando se envía
suscripcionForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que se recargue la página

    // Obtener el valor del campo de correo
    const emailInput = document.getElementById('suscripcion-email').value.trim();

    // Validar si el campo está vacío
    if (emailInput === '') {
        alert('Por favor, completa el campo de correo electrónico.');
    } else {
        alert('¡Gracias por suscribirte! Se ha registrado tu correo electrónico.');
    }
});



// Verifica si el script se carga
console.log("JavaScript cargado correctamente");

// Obtener elementos del DOM
const sobreNosotrosBtn = document.getElementById("sobre-nosotros-btn");
const sobreNosotrosText = document.getElementById("sobre-nosotros-text");

const metodosEnvioBtn = document.getElementById("metodos-envio-btn");
const metodosEnvioText = document.getElementById("metodos-envio-text");

const mediosPagoBtn = document.getElementById("medios-pago-btn");
const mediosPagoText = document.getElementById("medios-pago-text");

const instagramContainer = document.querySelector('.redes-sociales'); // Contenedor del ícono de Instagram
const instagramLink = document.getElementById("instagram-link");

// Mostrar/ocultar "Sobre Nosotros"
sobreNosotrosBtn.addEventListener("click", function (event) {
    sobreNosotrosText.classList.toggle("sobre-nosotros-show");
    metodosEnvioText.classList.remove("metodos-envio-show"); // Ocultar el otro desplegable
    mediosPagoText.classList.remove("medios-pago-show"); // Ocultar el otro desplegable
    event.stopPropagation(); // Evitar cerrar al hacer clic en el botón
});

// Mostrar/ocultar "Métodos de Envío"
metodosEnvioBtn.addEventListener("click", function (event) {
    metodosEnvioText.classList.toggle("metodos-envio-show");
    sobreNosotrosText.classList.remove("sobre-nosotros-show"); // Ocultar el otro desplegable
    mediosPagoText.classList.remove("medios-pago-show"); // Ocultar el otro desplegable
    event.stopPropagation(); // Evitar cerrar al hacer clic en el botón
});

// Mostrar/ocultar "Medios de Pago"
mediosPagoBtn.addEventListener("click", function (event) {
    mediosPagoText.classList.toggle("medios-pago-show");
    sobreNosotrosText.classList.remove("sobre-nosotros-show"); // Ocultar el otro desplegable
    metodosEnvioText.classList.remove("metodos-envio-show"); // Ocultar el otro desplegable
    event.stopPropagation(); // Evitar cerrar al hacer clic en el botón
});

// Mostrar/ocultar el contenedor de Instagram (deslizar hacia abajo)
instagramLink.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace se abra directamente

    // Alterna la clase 'active' para hacer visible el contenedor
    instagramContainer.classList.toggle('active');

    // Abre Instagram en una nueva ventana después de la animación
    setTimeout(() => {
        window.open(instagramLink.href, "_blank"); // Reemplaza con el enlace real de Instagram
    }, 500); // 500ms de retraso para dejar que se haga la animación
});

// Cerrar todos los textos si se hace clic fuera
document.addEventListener("click", function (event) {
    if (
        !sobreNosotrosText.contains(event.target) &&
        event.target !== sobreNosotrosBtn
    ) {
        sobreNosotrosText.classList.remove("sobre-nosotros-show");
    }
    if (
        !metodosEnvioText.contains(event.target) &&
        event.target !== metodosEnvioBtn
    ) {
        metodosEnvioText.classList.remove("metodos-envio-show");
    }
    if (
        !mediosPagoText.contains(event.target) &&
        event.target !== mediosPagoBtn
    ) {
        mediosPagoText.classList.remove("medios-pago-show");
    }
});







// Funcionalidad de clic para el menú desplegable
document.querySelectorAll('.dropdown > a').forEach(menu => {
    menu.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el comportamiento predeterminado
        const dropdownContent = this.nextElementSibling;
        dropdownContent.classList.toggle('active');
    });
});


