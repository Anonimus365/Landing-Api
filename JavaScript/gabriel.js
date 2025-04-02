// Inicializar el mapa con OpenStreetMap cuando se carga la página
var map = L.map('map').setView([19.4326, -99.1332], 13); // CDMX como punto inicial

// Capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var rutaLayer; // Variable para almacenar la ruta en el mapa
var rutasGuardadas = JSON.parse(localStorage.getItem("rutas")) || []; // Cargar rutas guardadas

// Función para obtener la ruta desde OSRM API
async function obtenerRuta(origen, destino) {
    var coordinates = `${origen.lng},${origen.lat};${destino.lng},${destino.lat}`;
    var url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

    try {
        var respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error HTTP: " + respuesta.status);
        }

        var datos = await respuesta.json();

        if (!datos.routes || datos.routes.length === 0) {
            throw new Error("No se encontraron rutas disponibles.");
        }

        var ruta = datos.routes[0];
        return {
            distancia: (ruta.distance / 1000).toFixed(2) + " km",
            duracion: (ruta.duration / 60).toFixed(2) + " minutos",
            coordenadas: ruta.geometry.coordinates.map(coord => [coord[1], coord[0]]),
            origen,
            destino
        };

    } catch (error) {
        console.error("❌ Error al obtener la ruta:", error.message);
        return null;
    }
}

// Función para mostrar la ruta generada
async function mostrarEstadisticasRutas() {
    var estadisticasDiv = document.getElementById("estadisticas");
    estadisticasDiv.innerHTML = "<p>Cargando datos...</p>";

    var origen = { lat: 19.4326, lng: -99.1332 };
    var destino = { lat: 19.4000, lng: -99.1500 };

    var ruta = await obtenerRuta(origen, destino);

    if (ruta) {
        estadisticasDiv.innerHTML = `
            <p>📍 Nueva Ruta Generada:</p>
            <p>🛣️ Distancia: ${ruta.distancia}</p>
            <p>⏳ Duración estimada: ${ruta.duracion}</p>
            <label>Nombre de la ruta: <input type="text" id="nombreRuta" placeholder="Ej: Ruta al centro"></label>
            <button onclick='guardarRuta(${JSON.stringify(ruta)})'>Guardar Ruta</button>
        `;

        if (rutaLayer) {
            map.removeLayer(rutaLayer);
        }

        rutaLayer = L.polyline(ruta.coordenadas, { color: 'blue' }).addTo(map);
        map.fitBounds(rutaLayer.getBounds());

    } else {
        estadisticasDiv.innerHTML = "<p>Error al cargar la ruta</p>";
    }
}

// Función para guardar la ruta con nombre
function guardarRuta(ruta) {
    var nombreInput = document.getElementById("nombreRuta").value.trim();
    if (!nombreInput) {
        alert("Por favor, asigna un nombre a la ruta antes de guardarla.");
        return;
    }

    ruta.nombre = nombreInput;
    rutasGuardadas.push(ruta);
    localStorage.setItem("rutas", JSON.stringify(rutasGuardadas));
    mostrarRutasGuardadas();
}

// Función para mostrar rutas guardadas con opciones
function mostrarRutasGuardadas() {
    var listaRutas = document.getElementById("rutasGuardadas");
    listaRutas.innerHTML = "<h3>Rutas Guardadas</h3>";

    rutasGuardadas.forEach((ruta, index) => {
        listaRutas.innerHTML += `
            <div>
                <p onclick='verRuta(${index})' style="cursor: pointer; color: blue;">
                    📍 <strong>${ruta.nombre}</strong>: ${ruta.distancia} - ${ruta.duracion}
                </p>
                <button onclick='eliminarRuta(${index})'>❌ Eliminar</button>
            </div>
        `;
    });
}

// Función para visualizar una ruta guardada en el mapa
