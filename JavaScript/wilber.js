// Obtener los elementos del DOM
const botonBuscar = document.getElementById('searchBtn');
const contenedor1 = document.getElementById('results1');
const contenedor2 = document.getElementById('results2');

const apikey = fdeb64cc5ff166e4c008909a73291cb0 ;
// Función para obtener imágenes desde Unsplash
async function obtenerImagenes(consulta) {
    const respuesta = await fetch(`https://api.unsplash.com/search/photos?query=${consulta}&client_id=apikey`);
    const datos = await respuesta.json();
    return datos.results; // Retorna las imágenes encontradas
}

// Función para mostrar imágenes en un contenedor específico
function mostrarImagenes(imagenes, contenedor) {
    contenedor.innerHTML = ''; // Limpia el contenedor antes de agregar nuevas imágenes
    
    // Tomamos solo las primeras 3 imágenes y las mostramos
    imagenes.slice(0, 3).forEach(imagen => {
        const imgElemento = document.createElement('img'); // Crea una etiqueta <img>
        imgElemento.src = imagen.urls.small; // Asigna la URL de la imagen
        contenedor.appendChild(imgElemento); // Agrega la imagen al contenedor
    });
}

// Evento cuando se hace clic en el botón de búsqueda
botonBuscar.addEventListener('click', async () => {
    const consulta = document.getElementById('searchInput').value; // Obtiene el texto ingresado por el usuario
    if (consulta) {
        const imagenes = await obtenerImagenes(consulta); // Obtiene imágenes de Unsplash
        
        // Muestra las imágenes en los dos contenedores
        mostrarImagenes(imagenes.slice(0, 3), contenedor1);
        mostrarImagenes(imagenes.slice(3, 6), contenedor2);
    }
});
