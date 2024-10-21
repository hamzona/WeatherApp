const form = document.querySelector(".search");
const input = document.querySelector(".search input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
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
});
