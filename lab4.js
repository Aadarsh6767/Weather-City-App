function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "a912e93fdd47453a9bb103929252102";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <p>Temperature: ${data.current.temp_c}°C</p>
                <p>Condition: ${data.current.condition.text}</p>
                <img src="${data.current.condition.icon}" alt="Weather Icon">
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind Speed: ${data.current.wind_kph} km/h</p>
            `;
            document.getElementById("weather-info").innerHTML = weatherInfo;
        })
        .catch(error => {
            document.getElementById("weather-info").innerHTML = "<p>City not found. Try again.</p>";
        });
        
}
