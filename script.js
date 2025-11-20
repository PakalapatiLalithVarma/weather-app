const forecastUrl = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;

const forecastResponse = await fetch(forecastUrl);
const forecastData = await forecastResponse.json();

let forecastHTML = '<h3>5-Day Forecast:</h3>';
forecastHTML += '<div style="display: flex; flex-wrap: wrap;">';

const dailyData = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));
dailyData.forEach(day => {
  forecastHTML += `
    <div style="margin: 10px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
      <p><strong>${new Date(day.dt_txt).toLocaleDateString()}</strong></p>
      <p>${day.weather[0].main}</p>
      <p>${day.main.temp}&deg;C</p>
    </div>`;
});
forecastHTML += '</div>';
resultDiv.innerHTML += forecastHTML;
