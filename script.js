const form = document.querySelector(".search");
const input = document.querySelector(".search input");

const getCurrentWeather = () => {
  console.log(input.value);
  const url = `http://api.weatherapi.com/v1/current.json?key=0f2692f22a0049efa0f84219241410&q=${input.value}`;

  fetch(url)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data); // Process the weather data

      const cont = document.querySelector("div");
      document.getElementById(
        "location"
      ).textContent = `${data.location.name}, ${data.location.country}`;
      document.getElementById("condition").textContent =
        data.current.condition.text;
      document.getElementById(
        "temperature"
      ).textContent = `${data.current.temp_c}°C`;
      document.getElementById("additional-info").innerHTML = `
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Wind Speed: ${data.current.wind_mph} mph</p>
    <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
`;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

const getForecastWeather = () => {
  console.log(input.value);
  const url = `http://api.weatherapi.com/v1/forecast.json?key=0f2692f22a0049efa0f84219241410&q=${input.value}`;

  fetch(url)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data.forecast.forecastday); // Process the weather data

      let cont = document.querySelector(".time-weather");

      data.forecast.forecastday[0].hour.forEach((hour) => {
        const time = hour.time.slice(11);
        cont.innerHTML += `
        <div class="weather-card">
          <div class="weather-condition">
            <p><strong>Condition:</strong> ${hour.condition.text}</p>
          </div>
      
          <div class="weather-time">
            <p><strong>Time:</strong> ${time}</p>
          </div>
      
          <div class="weather-temp">
            <p><strong>Temperature:</strong> ${hour.temp_c}°C</p>
          </div>
      
          <div class="weather-humidity">
            <p><strong>Humidity:</strong> ${hour.humidity}%</p>
          </div>
      
          <div class="weather-chance">
            <p><strong>Chance of Rain:</strong> ${hour.chance_of_rain}%</p>
            <p><strong>Chance of Snow:</strong> ${hour.chance_of_snow}%</p>
          </div>
      
          <div class="weather-wind">
            <p><strong>Wind:</strong> ${hour.wind_kph} kph (${hour.wind_dir})</p>
          </div>
      
          <div class="weather-pressure">
            <p><strong>Pressure:</strong> ${hour.pressure_mb} mb</p>
          </div>
      
          <img src="${hour.condition.icon}" alt="Weather icon" />
        </div>
      `;
      });
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  getCurrentWeather();
  getForecastWeather();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getCurrentWeather();
  getForecastWeather();
});
