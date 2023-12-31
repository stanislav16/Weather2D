let cityEl;
let city;
let button = document.getElementById("value");
let lat;
let lon;

//We get current date
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;
document.getElementById("date").innerHTML = today;

// API Key
let api = "77442ded850fd1a075869d12438a5415";

//Function for getting latitude and longitude from OpenWeatherMap with the API key
function getCityCoords(city) {
  //calling the API key
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=&appid=${api}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      lat = data[0].lat;
      lon = data[0].lon;
    })
    .catch((err) => {
      console.log(err);
    });
}

//Function for getting every information we need for the project
//Everything is written in one function to save API calls
function getWeather(lat, lon) {
  //calling the API key
  fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //Getting current temperature, description, wind speed and humidity and adding them to divs
      let temp = Math.floor(data.current.temp);
      document.getElementById(`temperature`).innerHTML = `${temp}°`;
      document.getElementById(`desc`).innerHTML =
        data.current.weather[0].description;
      document.getElementById(`wind`).innerHTML =
        data.current.wind_speed + ` m/s`;
      document.getElementById(`humidity`).innerHTML =
        data.current.humidity + ` %`;

      // Getting the hourly forecast data
      let hourlyData = data.hourly;
      for (let i = 0; i < 7; i++) {
        // Calculating the index for the hourly data (every 3 hours)
        let index = i * 3;
        if (index < hourlyData.length) {
          // Getting the temperature and rounding it to the nearest integer
          let temp = Math.floor(hourlyData[index].temp);
          //Adding the temperature to a div
          document.getElementById(`hourTemp${i + 1}`).innerHTML = `${temp}°`;
        }
      }

      //Creating a function to check which icon should be applied to the elements
      function getWeatherIcon(weatherDesc) {
        if (weatherDesc.includes("rain") || weatherDesc.includes("drizzle")) {
          return '<span class="material-symbols-outlined" style="font-size: 50px">rainy</span>';
        } else if (weatherDesc.includes("thunderstorm")) {
          return '<span class="material-symbols-outlined" style="font-size: 50px">thunderstorm</span>';
        } else if (weatherDesc.includes("clear")) {
          return '<span class="material-symbols-outlined" style="font-size: 50px">clear_day</span>';
        } else if (
          weatherDesc.includes("few clouds") ||
          weatherDesc.includes("scattered clouds")
        ) {
          return '<span class="material-symbols-outlined" style="font-size: 50px">partly_cloudy_day</span>';
        } else if (
          weatherDesc.includes("broken clouds") ||
          weatherDesc.includes("overcast clouds")
        ) {
          return '<span class="material-symbols-outlined" style="font-size: 50px">cloud</span>';
        } else if (
          weatherDesc.includes("mist") ||
          weatherDesc.includes("smoke") ||
          weatherDesc.includes("haze") ||
          weatherDesc.includes("whirls") ||
          weatherDesc.includes("fog") ||
          weatherDesc.includes("sand") ||
          weatherDesc.includes("dust") ||
          weatherDesc.includes("ash") ||
          weatherDesc.includes("squalls") ||
          weatherDesc.includes("tornado")
        ) {
          return '<span class="material-symbols-outlined" style="font-size: 50px">mist</span>';
        } else if (weatherDesc.includes("snow")) {
          return '<span class="material-symbols-outlined" style="font-size: 50px">weather_snowy</span>';
        }
      }
      for (let i = 0; i < 7; i++) {
        // Calculating the index for the hourly description (every 3 hours)
        let index = i * 3;

        // Make sure the index is within the range of the hourly data
        if (index < hourlyData.length) {
          // Getting the description
          let desc = hourlyData[index].weather[0].description;
          let hourlyIcon = getWeatherIcon(desc);
          document.getElementById(`hourIcon${i + 1}`).innerHTML = hourlyIcon;
        }
      }
      for (let i = 0; i < 7; i++) {
        // Calculating the index for the hourly description (every 3 hours)
        let index = i * 3;
        if (index < hourlyData.length) {
          let date = new Date(hourlyData[index].dt * 1000);

          // Getting the hours and minutes
          let hours = date.getUTCHours();
          let minutes = date.getUTCMinutes();

          // Formatting the hours and minutes as two-digit numbers
          let hoursString = hours.toString().padStart(2, "0");
          let minutesString = minutes.toString().padStart(2, "0");

          // Combining the hours and minutes into a time string
          let timeString = hoursString + ":" + minutesString;

          // Adding the hours to the divs
          document.getElementById(`hourLabel${i + 1}`).innerHTML = timeString;
        }
      }

      //Adding lowest and highest temperatures to divs
      document.getElementById(`max`).innerHTML =
        `H:` + Math.floor(data.daily[0].temp.max) + `°`;
      document.getElementById(`min`).innerHTML =
        `L:` + Math.floor(data.daily[0].temp.min) + `°`;

      //Getting daily data
      let dailyData = data.daily;

      let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      for (let i = 0; i < 5; i++) {
        let index = i;

        if (index < dailyData.length) {
          let date = new Date(dailyData[index].dt * 1000); // Multiply by 1000 to convert seconds to milliseconds

          // Getting the day of the week as a number
          let dayNumber = date.getDay();

          let nextDayNumber = (dayNumber + 1) % 7;

          // Getting the weekday name
          let weekdayName = weekdays[nextDayNumber];
          // Adding the names to the divs
          document.getElementById(`dayLabel${i + 1}`).innerHTML = weekdayName;
        }
      }

      for (let i = 0; i < 5; i++) {
        let index = i;

        if (index < dailyData.length) {
          let desc = dailyData[index].weather[0].description;

          let icon = getWeatherIcon(desc);
          document.getElementById(`icon${i + 1}`).innerHTML = icon;

          for (let i = 0; i < 5; i++) {
            let index = i + 1;

            if (index < dailyData.length) {
              let minTemp = Math.floor(dailyData[index].temp.min);

              // Adding the lowest temperature to the div
              document.getElementById(`dayMin${i + 1}`).innerHTML =
                "L: " + minTemp + `°`;
            }
          }

          let dailyMax = data.daily;

          for (let i = 0; i < 5; i++) {
            let index = i + 1;

            if (index < dailyMax.length) {
              let maxTemp = Math.floor(dailyMax[index].temp.max);

              // Add the highest temperature to the div
              document.getElementById(`dayMax${i + 1}`).innerHTML =
                "H: " + maxTemp + `°`;
            }
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Get Weather

//Using the button to call all the functions and display all the information
button.addEventListener("click", () => {
  // Get the city from the textbox
  cityEl = document.getElementById("cityBox");
  city = cityEl.value;

  getCityCoords(city).then(() => {
    getWeather(lat, lon);
    document.getElementById(`cityH`).innerHTML = city;
  });
});
//Getting the city name from the other JS file
const cityWelcome = localStorage.getItem("cityWel");
//Loading the page with the city name from the "welcome" menu
window.onload = getCityCoords(cityWelcome).then(() => {
  getWeather(lat, lon);
  document.getElementById(`cityH`).innerHTML = cityWelcome;
});

//Preventing the page from reloading when pressing the "Enter" button on keyboard
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry);
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenEl = document.querySelectorAll(".hidden");
hiddenEl.forEach((el) => observer.observe(el));
