const apiKey = "a912e93fdd47453a9bb103929252102";

function handleSearch(event) {
    event.preventDefault(); // Prevents page reload on submit/enter key
    getWeather();
}

async function getWeather() {
    const cityInput = document.getElementById("city");
    const weatherDisplay = document.getElementById("weather-info");
    const city = cityInput.value.trim();

    if (!city) {
        weatherDisplay.innerHTML = `<p class="error-msg">Please enter a city name.</p>`;
        return;
    }

    weatherDisplay.innerHTML = `<p>Fetching weather...</p>`;

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const iconUrl = data.current.condition.icon.startsWith("http")
            ? data.current.condition.icon
            : `https:${data.current.condition.icon}`;

        weatherDisplay.innerHTML = `
            <h3>${data.location.name}, ${data.location.country}</h3>
            <p style="font-size: 1.8rem; font-weight: bold; margin: 6px 0;">
                ${Math.round(data.current.temp_c)}°C
            </p>
            <p>${data.current.condition.text}</p>
            <img src="${iconUrl}" alt="${data.current.condition.text}">
            
            <div class="weather-stats">
                <p>Humidity: <strong>${data.current.humidity}%</strong></p>
                <p>Wind: <strong>${data.current.wind_kph} km/h</strong></p>
            </div>
        `;
    } catch (error) {
        weatherDisplay.innerHTML = `<p class="error-msg">Could not find "${city}". Try another location.</p>`;
    }
}
