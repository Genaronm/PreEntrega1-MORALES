document.addEventListener('DOMContentLoaded', function() {
    const libros = [
        { nombre: "Alquimia y Mística", precio: 20 },
        { nombre: "El libro de los símbolos", precio: 25 },
        { nombre: "Libro Forever The New Tattoo", precio: 30 }
    ];

    const seccionLibros = document.querySelector('.fotos-libros');
    const listaArticulosCarrito = document.getElementById('articulos-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const inputCantidadPromocional = document.getElementById('cantidad-promocional');
    const inputPrecioDescuento = document.getElementById('precio-descuento');
    const botonAplicarDescuento = document.getElementById('aplicar-descuento');
    const resultadoDescuento = document.getElementById('resultado-descuento');

    cargarLibros();

    function cargarLibros() {
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

        document.querySelectorAll('.agregar-al-carrito').forEach(boton => {
            boton.addEventListener('click', function() {
                const nombre = boton.dataset.nombre;
                const precio = parseFloat(boton.dataset.precio);
                agregarArticuloAlCarrito(nombre, precio);
            });
        });
    }

    function agregarArticuloAlCarrito(nombre, precio) {
        const li = document.createElement('li');
        li.textContent = `${nombre} - $${precio}`;
        listaArticulosCarrito.appendChild(li);

        const precioActual = parseFloat(totalCarrito.textContent);
        totalCarrito.textContent = (precioActual + precio).toFixed(2);
    }

    botonAplicarDescuento.addEventListener('click', function() {
        const cantidadPromocional = parseInt(inputCantidadPromocional.value);
        const precioDescuento = parseFloat(inputPrecioDescuento.value);

        if (cantidadPromocional > 0 && precioDescuento > 0) {
            const precioFinal = aplicarDescuento(cantidadPromocional, precioDescuento);
            resultadoDescuento.textContent = `El precio final con descuento es: $${precioFinal.toFixed(2)}`;
        } else {
            resultadoDescuento.textContent = "Por favor, ingrese valores válidos para el descuento.";
        }
    });

    function aplicarDescuento(cantidadPromocional, precioDescuento) {
        const precioTotal = parseFloat(totalCarrito.textContent);
        const precioFinal = precioTotal - (cantidadPromocional * precioDescuento);
        return precioFinal;
    }

    localStorage.setItem('libros', JSON.stringify(libros));

    const librosRecuperados = JSON.parse(localStorage.getItem('libros'));
    console.log("Libros recuperados de localStorage:");
    console.log(librosRecuperados);
});
