const cityForm = document.querySelector("form");

const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

// Update the ui
const updateUI = (data) => {
  //Original properties
  const citydetails = data.cityDetails;
  const weather = data.weather;

  // Update the detail template
  details.innerHTML = `
    <h5 class="my-3">${citydetails.LocalizedName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;

  // update the night / day and icon images
  const iconSrc = `images/icons/${weather.WeatherIcon}.svg`;

  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "images/day.svg" : "images/night.svg";

  time.setAttribute("src", timeSrc);

  // Remove display none if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  // getCity from forecast.js because forecast is above app.js in index.html
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };

  //   return {
  //     cityDetails: cityDetails,
  //     weather: weather,
  //   };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the .city from input name, that is .city
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with the new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
