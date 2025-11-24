// carrito2.js

// 1. Estado del carrito: Ahora cada producto incluye cantidad y precio unitario
let carritoContador = 0;
let productosCarrito = {};
let totalCarrito = 0;

// Elementos del DOM
const carritoContadorElemento = document.getElementById('carrito-contador');
const modalElemento = document.getElementById('modal-carrito');
const tablaElemento = document.getElementById('tabla-carrito');
const totalElemento = document.getElementById('carrito-total'); // Nuevo elemento para el total

// Inicializar carrito
function initCarrito() {
    const carritoBtn = document.getElementById('carrito');
    const cerrarBtn = document.querySelector('#modal-carrito .cerrar');

    // Manejar la apertura del modal
    carritoBtn.addEventListener('click', mostrarCarrito);

    // Manejar el cierre del modal
    cerrarBtn.addEventListener('click', () => {
        modalElemento.style.display = 'none';
    });
}

// 2. Función para agregar productos al carrito
function agregarAlCarrito(nombreProducto, precioProducto) {
    // Convertir el precio a número
    const precio = parseFloat(precioProducto);
    
    // 1. Actualizar el contador del botón
    carritoContador++;
    carritoContadorElemento.textContent = carritoContador;

    // 2. Actualizar el estado del carrito
    if (productosCarrito[nombreProducto]) {
        // Producto ya existe, solo aumenta la cantidad
        productosCarrito[nombreProducto].cantidad++;
    } else {
        // Nuevo producto
        productosCarrito[nombreProducto] = {
            cantidad: 1,
            precioUnitario: precio // Guardamos el precio
        };
    }
    
    // 3. Actualizar el total general
    totalCarrito += precio;
    // El total se mostrará y formateará en la función mostrarCarrito()
}

// 3. Función para mostrar y calcular el carrito
function mostrarCarrito() {
    tablaElemento.innerHTML = ''; // Limpiar la tabla antes de renderizar
    let subtotal = 0;
    
    // Obtenemos los textos del idioma actual
    const t = textos[idiomaActual]; 

    if (Object.keys(productosCarrito).length === 0) {
        // Usamos la traducción para "No hay productos agregados"
        tablaElemento.innerHTML = `<tr><td colspan="4">${t.carrito_vacio}</td></tr>`; 
    } else {
        for (const nombre in productosCarrito) {
            const producto = productosCarrito[nombre];
            const precioTotalProducto = producto.cantidad * producto.precioUnitario;
            subtotal += precioTotalProducto;

            // Formatear precios a dos decimales
            const precioUnitarioStr = producto.precioUnitario.toFixed(2);
            const precioTotalStr = precioTotalProducto.toFixed(2);
            
            // Nota: Aquí se mantiene Bs. o $ según tu deseo de usar la moneda local fija.
            // Si quieres que el símbolo de la moneda también cambie, deberías incluirlo en `t.carrito_precio`
            tablaElemento.innerHTML += `
                <tr>
                    <td>${nombre}</td>
                    <td style="text-align:center;">${producto.cantidad}</td>
                    <td style="text-align:right;">Bs. ${precioUnitarioStr}</td>
                    <td style="text-align:right;">Bs. ${precioTotalStr}</td>
                </tr>
            `;
        }
    }
    
    // Añadir la fila del Total al final de la tabla
    tablaElemento.innerHTML += `
        <tr style="font-weight: bold; background-color: #f0f0f0;">
            <td colspan="3" style="text-align:right;">${t.carrito_total}</td> <td style="text-align:right;">Bs. ${subtotal.toFixed(2)}</td>
        </tr>
    `;

    // Mostrar el modal
    modalElemento.style.display = 'flex';
}

// 4. Conexión al cargar la página (se usa en el HTML)
// NOTA: Esta función DEBE ser llamada al cargar la página.
// En el HTML lo hacemos modificando el script de inicialización.