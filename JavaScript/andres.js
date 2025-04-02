const fetchWeather = () => {
    const city = document.getElementById('city-input').value.trim();
    const apiKey = '0da056785b3474f35ef599b7854d12d4'; 
    
    if (!city) {
        alert('Por favor, ingresa una ciudad.');
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ciudad no encontrada');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('weather-container');
            container.innerHTML = `
                <h3>Clima en ${data.name}</h3>
                <p>Temperatura: ${data.main.temp} °C</p>
                <p>Descripción: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            const container = document.getElementById('weather-container');
            container.innerHTML = `<p>Error: ${error.message}</p>`;
        });
};

document.getElementById('fetch-weather').addEventListener('click', fetchWeather);





async function fun2() {
    const para2 = document.getElementById("para2");
    
    para2.textContent = "Wait a moment...";
    
    let message = await new Promise(resolve =>
        setTimeout(() => resolve("tu ruta ha sido agregada exitosamente 🛣️ "), 2000)
    );
    
    para2.textContent = message;
}

document.addEventListener("DOMContentLoaded", () => {
    const section2 = document.querySelector(".section2");
    const newParagraph = document.createElement("p");
    newParagraph.id = "para2";
    newParagraph.textContent = "Contenido adicional aquí.";
    section2.appendChild(newParagraph);
    
    fun2();
});

