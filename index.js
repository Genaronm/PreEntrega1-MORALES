document.addEventListener('DOMContentLoaded', function() {
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-al-carrito');
    const listaArticulosCarrito = document.getElementById('articulos-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    let cantidadArticulos = 0;
    let precioTotal = 0;

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', function() {
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            agregarArticuloAlCarrito(nombre, precio);
        });
    });

    function agregarArticuloAlCarrito(nombre, precio) {
        const li = document.createElement('li');
        li.textContent = `${nombre} - $${precio}`;
        listaArticulosCarrito.appendChild(li);
        cantidadArticulos++;
        precioTotal += precio;
        actualizarTotalCarrito();
    }

    function actualizarTotalCarrito() {
        totalCarrito.textContent = precioTotal.toFixed(2);
        document.getElementById('cuenta-carrito').textContent = cantidadArticulos;
    }

    const cantidadPromocional = parseInt(prompt("Introduce la cantidad promocional:"));
    const precioDescuento = parseFloat(prompt("Introduce el precio de descuento:"));

    let precioFinal = precioTotal;

    if (cantidadPromocional > 0 && precioDescuento > 0) {
        precioFinal = aplicarDescuento(cantidadPromocional, precioDescuento);
    }

    console.log(`El precio final con descuento es: $${precioFinal.toFixed(2)}`);

    function aplicarDescuento(cantidadPromocional, precioDescuento) {
        return precioTotal - (cantidadPromocional * precioDescuento);
    }
});
