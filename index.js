let withTime = document.querySelector("#time");
let current = new Date();
withTime.innerHTML = two();

function two() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let daysName = days[current.getDay()];
  let hour = current.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = current.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let two = `${daysName}  ${hour}:${minute}`;
  return two;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function searchCity(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getForecast(city) {
  let apiKey = "d9833o0d576c1t0baaff4f33407e3baa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;
  document.querySelector(
    "#hum"
  ).innerHTML = ` Humidity: ${response.data.main.humidity} %`;
  document.querySelector(
    "#win"
  ).innerHTML = `Wind: ${response.data.wind.speed} mph`;
  document.querySelector(
    "#clo"
  ).innerHTML = `Clouds: ${response.data.clouds.all}`;
  getForecast(response.data.name);
}

searchCity("London");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div class="weather-forecast-icon">
        <img src="${day.condition.icon_url}"/>
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
      `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
