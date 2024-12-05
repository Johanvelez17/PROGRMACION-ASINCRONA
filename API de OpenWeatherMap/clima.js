// Variables y selectores
const apiKey = "31ed33d04a13870c05d4774681f9ae58"; // mi API Key
const searchBtn = document.querySelector("#search-btn"); // Selección por ID
const cityInput = document.querySelector("#city-input"); // Selección por ID
const result = document.querySelector("#result"); // Selección por ID

// Evento para el botón
searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim(); // Obtén la ciudad ingresada
    if (city === "") {
        result.innerHTML = `<p class="text-danger">Por favor ingresa una ciudad.</p>`;
        return;
    }
    
    try {
        // URL de la API de OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        // Petición a la API
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ciudad no encontrada.");
        
        const data = await response.json();
        
        // Desplegar resultado
        result.innerHTML = `
            <div class="card">
                <div class="card-body text-center">
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <h4>Temperatura: ${data.main.temp}°C</h4>
                    <p>Clima: ${data.weather[0].description}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        result.innerHTML = `<p class="text-danger">No se pudo obtener el clima para la ciudad ingresada.</p>`;
    }
});
