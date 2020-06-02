let today = new Date();
console.log(today);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let hour = today.getHours();
let minute = today.getMinutes();

let date = document.querySelector("#today");
date.innerHTML = `${day}, ${hour}:${minute}`;

function searchCity(city) {
  let key = "559f875e04c47ab9cf859e8b46e9c445";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${key}`).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  defaultCelsiusTemperature = response.data.main.temp;

  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector(
    "#country"
  ).innerHTML = `, ${response.data.sys.country}`;
  document.querySelector("#hum").innerHTML = `${response.data.main.humidity} %`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure} hpa`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  console.log(response.data);
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function getCoordinatesApi(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "559f875e04c47ab9cf859e8b46e9c445";
  let apiUrlLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrlLoc}&appid=${apiKey}`).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoordinatesApi);
}

let form = document.querySelector("#my-form");
form.addEventListener("submit", handleSubmit);

let greenLocationButton = document.querySelector("#current-location");
greenLocationButton.addEventListener("click", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (defaultCelsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    fahrenheitTemperature
  )}°`;
}

let defaultCelsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    defaultCelsiusTemperature
  )}°`;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

searchCity("Naples");
