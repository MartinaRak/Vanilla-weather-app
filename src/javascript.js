let time = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[time.getDay()];
let hour = time.getHours();
let minutes = time.getMinutes();

let date = document.querySelector("#date");
date.innerHTML = `${day}, ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

//Forecast HTML

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row-forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-6">
      <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="40"
        />
       <div class="forecast-temp">
        <span class="forecast-max">${Math.round(forecastDay.temp.max)}°</span>
       <span class="forecast-min">${Math.round(forecastDay.temp.min)}°</span>
       </div>
      </div>
     `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Searches for forecast data

function getForecast(coordinates) {
  let apiKey = "6aeef2ad470d059da56cf04d1367bfcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Main search function

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  let changeCity = document.querySelector("#city-name");
  changeCity.innerHTML = cityInput.value;
  searchWeather(cityInput.value);
}
let submit = document.querySelector("#engine");
submit.addEventListener("submit", city);

function searchWeather(city) {
  let apiKey = "6aeef2ad470d059da56cf04d1367bfcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(searchTemp);
}

//Shows temperature, condition, humidity, windspeed and icon

function searchTemp(response) {
  celsiusTemp = response.data.main.temp;

  let temp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#current-temp");
  displayTemp.innerHTML = `${temp}°C`;
  let displayCity = document.querySelector("#city-name");
  displayCity.innerHTML = response.data.name;

  let conditions = response.data.weather[0].description;
  let displayConditions = document.querySelector("#condition");
  displayConditions.innerHTML = `${conditions}`;

  let humidity = response.data.main.humidity;
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `Wind: ${wind} km/h`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

//Button for current location

function showCurrent(position) {
  let apiKey = "6aeef2ad470d059da56cf04d1367bfcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchTemp);
}
function findOutLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrent);
}
let findOutCurrent = document.querySelector("#current-button");
findOutCurrent.addEventListener("click", findOutLocation);

searchWeather("Inverness");
