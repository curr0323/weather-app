//Get current day and time
let now = new Date();

let h3 = document.querySelector("h3");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h3.innerHTML = `${day} ${hours}:${minutes}`;

//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-city");
  let cityOutput = document.querySelector("#current-city");
  cityOutput.innerHTML = cityInput.value;
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", changeCity);

//function to get temperature for city that is input
function showTemperature(response) {
  let cityInput = document.querySelector("#input-city");
  let city = cityInput.value;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature}°C`;
}

//call openweathermap api to overwrite temp
function searchCity(city) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

//perform search of ciy
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", search);

function showCurrentTemperature(response) {
  let cityOutput = document.querySelector("#current-city");
  cityOutput.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature}°C`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-loc");
button.addEventListener("click", getCurrentLocation);
