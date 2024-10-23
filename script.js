const form = document.querySelector(".search");
const input = document.querySelector(".search input");

const getCurrentWeather = () => {
  console.log(input.value);
  const url = `http://api.weatherapi.com/v1/current.json?key=0f2692f22a0049efa0f84219241410&q=${input.value}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
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

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  getCurrentWeather();
  getWeatherForNextSevenDays();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getCurrentWeather();
  getWeatherForNextSevenDays();
});
const search = document.querySelector(".search input");
const suggestionList = document.querySelector("#suggestions-list");

search.addEventListener("input", () => {
  const url = `http://api.weatherapi.com/v1/search.json?key=0f2692f22a0049efa0f84219241410&q=${search.value}`;

  fetch(url)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      suggestionList.innerHTML = "";

      data.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("suggestions");
        li.textContent = item.name;

        li.addEventListener("click", () => {
          search.value = item.name;
          getCurrentWeather();
          getWeatherForNextSevenDays();
          suggestionList.innerHTML = "";
        });

        suggestionList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
async function getWeatherForNextSevenDays() {
  const apiKey = "0f2692f22a0049efa0f84219241410";
  const baseUrl = "http://api.weatherapi.com/v1/future.json";
  const today = new Date();
  const weatherData = [];
  const location = input.value;

  for (let i = 0; i < 7; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 14 + i);
    const formattedDate = futureDate.toISOString().split("T")[0];
    const url = `${baseUrl}?key=${apiKey}&q=${location}&dt=${formattedDate}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      weatherData.push({
        date: formattedDate,
        condition: data.forecast.forecastday[0].day.condition.text,
        maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
        minTemp: data.forecast.forecastday[0].day.mintemp_c,
        icon: data.forecast.forecastday[0].day.condition.icon,
      });
    } catch (error) {
      console.error(`Error fetching data for ${formattedDate}:`, error);
    }
  }

  renderWeatherData(weatherData);
}

function renderWeatherData(weatherData) {
  const forecastContainer = document.getElementById("weather-forecast");
  forecastContainer.innerHTML = "";

  weatherData.forEach((day) => {
    const weatherCard = document.createElement("div");
    weatherCard.className = "weather-card2";

    weatherCard.innerHTML = `
          <div>
              <h2>${day.date}</h2>
              <div class="condition">${day.condition}</div>
          </div>
          <div class="temps">
              <div class="max-temp">Max: ${day.maxTemp}°C</div>
              <div class="min-temp">Min: ${day.minTemp}°C</div>
          </div>
          <img src="${day.icon}" />
      `;

    forecastContainer.appendChild(weatherCard);
  });
}

getWeatherForNextSevenDays("Sarajevo")
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
