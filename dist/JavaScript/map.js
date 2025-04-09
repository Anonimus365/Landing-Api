    document.addEventListener("DOMContentLoaded", () => {
        const map = L.map('map').setView([19.4326, -99.1332], 13); // Coordenadas iniciales (CDMX)

        // Cargar el mapa base de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Agregar un marcador
        L.marker([19.4326, -99.1332]).addTo(map)
            .bindPopup("Ciudad de México")
            .openPopup();
    });