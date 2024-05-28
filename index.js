document.addEventListener('DOMContentLoaded', function() {
    const seccionLibros = document.querySelector('.fotos-libros');
    const listaArticulosCarrito = document.getElementById('articulos-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const inputCantidadPromocional = document.getElementById('cantidad-promocional');
    const inputPrecioDescuento = document.getElementById('precio-descuento');
    const botonAplicarDescuento = document.getElementById('aplicar-descuento');
    const resultadoDescuento = document.getElementById('resultado-descuento');

    let libros = [];
    let carrito = [];

    async function cargarLibros() {
        try {
            const response = await fetch('libros.json');
            libros = await response.json();
            almacenarLibros(libros);
            mostrarLibros(libros);
        } catch (error) {
            console.error('Error al cargar los libros:', error);
        }
    }

    function mostrarLibros(libros) {
        seccionLibros.innerHTML = '';
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
            spanNombre.textContent = libro.nombre;
            spanPrecio.textContent = `$${libro.precio}`;
            boton.textContent = "Agregar al carrito";
            boton.classList.add('agregar-al-carrito');
            boton.dataset.nombre = libro.nombre;
            boton.dataset.precio = libro.precio;

            seccionLibros.appendChild(divLibro);

            boton.addEventListener('click', function() {
                agregarArticuloAlCarrito(libro);
            });
        });
    }

    function agregarArticuloAlCarrito(libro) {
        carrito.push(libro);
        actualizarCarrito();
        almacenarCarrito();
    }

    function actualizarCarrito() {
        listaArticulosCarrito.innerHTML = '';
        let total = 0;
        carrito.forEach(libro => {
            const li = document.createElement('li');
            li.textContent = `${libro.nombre} - $${libro.precio}`;
            listaArticulosCarrito.appendChild(li);
            total += libro.precio;
        });
        totalCarrito.textContent = total.toFixed(2);
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
        const totalSinDescuento = carrito.reduce((sum, libro) => sum + libro.precio, 0);
        const totalDescuento = cantidadPromocional * precioDescuento;
        return totalSinDescuento - totalDescuento;
    }

    function almacenarLibros(libros) {
        localStorage.setItem('libros', JSON.stringify(libros));
    }

    function almacenarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function recuperarDatos() {
        const librosAlmacenados = localStorage.getItem('libros');
        const carritoAlmacenado = localStorage.getItem('carrito');
        if (librosAlmacenados) {
            libros = JSON.parse(librosAlmacenados);
            mostrarLibros(libros);
        } else {
            cargarLibros();
        }
        if (carritoAlmacenado) {
            carrito = JSON.parse(carritoAlmacenado);
            actualizarCarrito();
        }
    }

    recuperarDatos();
});
