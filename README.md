mkdir weather-app
cd weather-app

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather App</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    body {
      background: linear-gradient(to right, #00c6ff, #0072ff);
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      padding: 20px;
    }
    .container {
      background-color: rgba(0,0,0,0.3);
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      width: 300px;
    }
    input {
      width: 80%;
      padding: 10px;
      border: none;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    button {
      padding: 10px 20px;
      background-color: #fff;
      color: #0072ff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .weather-result {
      margin-top: 20px;
    }
    .error {
      color: #ffdddd;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌦 Weather App</h1>
    <input type="text" id="cityInput" placeholder="Enter city name">
    <button onclick="getWeather()">Get Weather</button>
    <div class="weather-result" id="result"></div>
    <div class="error" id="error"></div>
  </div>

  <script>
    async function getWeather() {
      const city = document.getElementById('cityInput').value.trim();
      const resultDiv = document.getElementById('result');
      const errorDiv = document.getElementById('error');
      resultDiv.innerHTML = '';
      errorDiv.innerHTML = '';

      if (!city) {
        errorDiv.innerText = 'Please enter a city name.';
        return;
      }

      const apiKey = '0f79d6889936ccf085889771695a47e5'; // Replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        const weatherHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
          <p>🌡 Temperature: ${data.main.temp}&deg;C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬 Wind: ${data.wind.speed} m/s</p>
        `;
        resultDiv.innerHTML = weatherHTML;
      } catch (error) {
        errorDiv.innerText = error.message;
      }
    }
  </script>
</body>
</html>
