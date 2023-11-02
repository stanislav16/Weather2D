// Get elements
let temperatureEl = document.getElementById('temperature');
let descriptionEl = document.getElementById('description');
let locationEl   = document.getElementById('location');
let iconEl = document.getElementById('icon');
let cityEl;
let city;
let button = document.getElementById('value');

// API Key
let api = '6fb7b0bff001cb28ebf17743592d0cca';

// Get Weather
// Get Weather
function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let forecast = data.list.slice(0, 5); // Get the forecast for the next 5 days
            forecast.forEach((day, index) => {
                let temp = Math.floor(day.main.temp - 273.15);
                document.getElementById(`temperature${index}`).innerHTML = `${temp}°C`;
                document.getElementById(`description${index}`).innerHTML = day.weather[0].main;
                let iconCode = day.weather[0].icon;

                // Create the URL for the icon image
                let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                // Set the source of the image element to the icon URL
                document.getElementById(`icon${index}`).src = iconUrl;
            });
        })
        .catch(err => {
            console.log(err);
        });
}

button.addEventListener('click', function() {
    // Get the city from the textbox
    cityEl = document.getElementById('cityBox');
    city = cityEl.value;
    getWeather(city);
});

