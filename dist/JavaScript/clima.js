const apiKey = 'TU_API_KEY_OPENWEATHER'; // Regístrate en https://openweathermap.org/api
const weatherDiv = document.getElementById('weather');
const forecastDiv = document.getElementById('forecast');

navigator.geolocation.getCurrentPosition(async (position) => {
  const { latitude, longitude } = position.coords;

  // Clima actual
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${apiKey}`);
  const data = await res.json();

  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherDiv.innerHTML = `
    <h3 class="text-xl">${data.name}</h3>
    <img src="${icon}" alt="${data.weather[0].description}" class="mx-auto w-20" />
    <p>${data.main.temp}°C - ${data.weather[0].description}</p>
    <p>💧 Humedad: ${data.main.humidity}% &nbsp;&nbsp; 💨 Viento: ${data.wind.speed} km/h</p>
    <p class="text-green-600 font-semibold">🟢 Consejo: ${getAdvice(data)}</p>
  `;

  // Pronóstico por horas
  const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${apiKey}`);
  const forecastData = await forecastRes.json();
  forecastDiv.innerHTML = forecastData.list.slice(0, 6).map(f => {
    const hour = new Date(f.dt * 1000).getHours();
    const icon = `https://openweathermap.org/img/wn/${f.weather[0].icon}.png`;
    return `<div>
      <p>${hour}:00</p>
      <img src="${icon}" class="w-10 mx-auto" />
      <p>${f.main.temp}°C</p>
    </div>`;
  }).join('');

  // Mapa con Leaflet
  const map = L.map('map').setView([latitude, longitude], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([latitude, longitude]).addTo(map).bindPopup("Tu ubicación actual").openPopup();

}, () => {
  weatherDiv.innerHTML = "No se pudo obtener tu ubicación 😢";
});

// Consejo según el clima
function getAdvice(data) {
  const temp = data.main.temp;
  const rain = data.weather[0].main.toLowerCase();
  if (rain.includes('rain') || rain.includes('lluvia')) return "Evita salir en este momento. ¡Cuidado con el pavimento mojado!";
  if (temp > 30) return "Muy caluroso. Lleva mucha agua y evita horas pico.";
  if (temp < 10) return "Hace frío. Usa ropa térmica.";
  return "Perfecto para salir a rodar. No olvides hidratación.";
}