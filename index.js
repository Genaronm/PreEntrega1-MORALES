document.addEventListener('DOMContentLoaded', function() {
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-al-carrito');
    const listaArticulosCarrito = document.getElementById('articulos-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    let cantidadArticulos = 0;
    let precioTotal = 0;

    const libros = [
        { nombre: "Alquimia y Mística", precio: 20 },
        { nombre: "El libro de los símbolos", precio: 25 },
        { nombre: "Libro Forever The New Tattoo", precio: 30 }
    ];

    const seccionLibros = document.querySelector('.seccion-libros');
    libros.forEach(libro => {
        const divLibro = document.createElement('div');
        const img = document.createElement('img');
        const spanNombre = document.createElement('span');
        const spanPrecio = document.createElement('span');
        const boton = document.createElement('button');

        divLibro.appendChild(img);
        divLibro.appendChild(spanNombre);
        divLibro.appendChild(spanPrecio);
        divLibro.appendChild(boton);

        img.src = `/libros/${libro.nombre.toLowerCase().replace(/\s/g, '')}.jpg`;
        img.alt = libro.nombre;
        spanNombre.textContent = `${libro.nombre} - $${libro.precio}`;
        boton.textContent = "Agregar al carrito";
        boton.classList.add('agregar-al-carrito');
        boton.dataset.nombre = libro.nombre;
        boton.dataset.precio = libro.precio;

        seccionLibros.appendChild(divLibro);
    });

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

    const librosCaros = libros.filter(libro => libro.precio > 25);
    console.log("Libros con precios mayores a $25:");
    console.log(librosCaros);

    const nombresLibros = libros.map(libro => libro.nombre);
    console.log("Nombres de libros:");
    console.log(nombresLibros);
});
