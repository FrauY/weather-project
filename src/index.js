//Date and time
let now = new Date();

let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let date = now.getDate();

let hour = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

function formatDate() {
  let h1 = document.querySelector("h1");

  h1.innerHTML = `${day}, ${month} ${date}, ${hour}:${minutes}`;
}

formatDate(new Date());

//function callFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 36;
//}

//function callCelsius(event) {
//event.preventDefault();
// let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 2;
//}

//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", callFahrenheit);

//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", callCelsius);

//Change City
function search(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchResult.value}`;
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", search);

function showSearchTemp(response) {
  let searchTemp = Math.round(response.data.main.temp);
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${searchTemp}°C`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function getCity(city) {
  let apiKey = "bae25ad73ded1eaf9b759c8aae273d3f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showSearchTemp);
}

function handleCity(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#city-input");
  let searchCity = `${searchResult.value}`;
  getCity(searchCity);
}

form.addEventListener("submit", handleCity);

//temp
function showTemperature(response) {
  console.log(response);

  let temperature = Math.round(response.data.main.temp);
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${temperature}°C`;
  let name = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${name}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

//current
function currentPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  console.log(lon);
  console.log(lat);
  let apiKey = "93f7cefa78c66d14e56b7aea07b92cc5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let myLocation = document.querySelector("#current");
myLocation.addEventListener("click", getCurrentLocation);
