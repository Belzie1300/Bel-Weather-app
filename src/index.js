let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentDate = now.getDate();

let liveDate = document.querySelector(".current-date");
liveDate.innerHTML = `${currentDay} ${currentMonth} ${currentDate}, ${currentYear} `;

let hour = now.getHours();
let minutes = ("0" + now.getMinutes()).slice(-2);
let liveTime = document.querySelector(".time");
liveTime.innerHTML = `${hour}:${minutes}`;

function showWeatherDetails(response) {
  console.log(response);
  let currentTemp = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${currentTemp}°C`;
  let description = response.data.weather[0].description;
  let weatherScript = document.querySelector(".weather-summary p");
  weatherScript.innerHTML = `${description}`;
  let maxTemp = document.querySelector(".high-temp");
  maxTemp.innerHTML = `Max ${Math.round(response.data.main.temp_max)}°C`;
  let minTemp = document.querySelector(".low-temp");
  minTemp.innerHTML = `Min ${Math.round(response.data.main.temp_min)}°C`;
  let location = document.querySelector("h3");
  location.innerHTML = `${response.data.name}`;
  document.querySelector(".humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
}
function showDefault(citySearched) {
  let units = "metric";
  let urlEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiUrl = `${urlEndPoint}?q=${citySearched}&appid=${apiKey}&units=${units}
`;
  axios.get(apiUrl).then(showWeatherDetails);
}
function showCity(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#city-input").value;
  showDefault(citySearched);
}

let searchCity = document.querySelector("#city-form");
searchCity.addEventListener("submit", showCity);

function getCoords(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let urlEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiUrl = `${urlEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}
`;
  axios.get(apiUrl).then(showWeatherDetails);
}

function showCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoords);
}
let locationButton = document.querySelector("#current-location-btn");
locationButton.addEventListener("click", showCoords);

showDefault("Preston");
