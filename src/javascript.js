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

//Main search function

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  let changeCity = document.querySelector("#city-name");
  changeCity.innerHTML = word.value;
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

//Conversion between C and F

function switchF(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  let fahrElement = document.querySelector("h1");
  fahrElement.innerHTML = Math.round(fahrenheitTemperature) + "°F";
}
let changeToF = document.querySelector("#f");
changeToF.addEventListener("click", switchF);

function switchC(event) {
  event.preventDefault();
  let celsiusTemperature = celsiusTemp;
  let celsiusElement = document.querySelector("h1");
  celsiusElement.innerHTML = Math.round(celsiusTemperature) + "°C";
}
let changeToC = document.querySelector("#c");
changeToC.addEventListener("click", switchC);

let celsiusTemp = null;
