// carrito.js

// Estado global del carrito
let carritoContador = 0;
let productosCarrito = {};

// Función para agregar producto al carrito
function agregarAlCarrito(nombre) {
    carritoContador++;
    document.getElementById('carrito-contador').textContent = carritoContador;
    if (!productosCarrito[nombre]) productosCarrito[nombre] = 0;
    productosCarrito[nombre]++;
}

// Función para abrir modal del carrito
function abrirCarrito() {
    const tabla = document.getElementById('tabla-carrito');
    tabla.innerHTML = '';
    if (Object.keys(productosCarrito).length === 0)
        tabla.innerHTML = '<tr><td colspan="2">No hay productos agregados</td></tr>';
    else {
        for (let p in productosCarrito) {
            tabla.innerHTML += `<tr><td>${p}</td><td>${productosCarrito[p]}</td></tr>`;
        }
    }
    document.getElementById('modal-carrito').style.display = 'flex';
}

// Función para cerrar modal
function cerrarModal() {
    document.getElementById('modal-carrito').style.display = 'none';
}

// Inicializar botones del carrito
function initCarrito() {
    document.getElementById('carrito').addEventListener('click', abrirCarrito);
    const cerrarBtn = document.querySelector('#modal-carrito .cerrar');
    if (cerrarBtn) cerrarBtn.addEventListener('click', cerrarModal);
}

// Exportar funciones si usas módulos (opcional)
// export { agregarAlCarrito, initCarrito };
