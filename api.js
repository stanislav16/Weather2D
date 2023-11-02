let cityEl;
let city;
let button = document.getElementById('value');

// API Key
let api = '6fb7b0bff001cb28ebf17743592d0cca';


function getWeatherForDay(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let day = data.list[0];
                let temp = Math.floor(day.main.temp - 273.15);
                document.getElementById(`temperature`).innerHTML = `${temp}°C`;
                document.getElementById(`description`).innerHTML = day.weather[0].main;
                let iconCode = day.weather[0].icon;

                // Create the URL for the icon image
                let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                // Set the source of the image element to the icon URL
                document.getElementById(`icon`).src = iconUrl;

        })
        .catch(err => {
            console.log(err);
        });
}
// Get Weather
function getWeatherForNextDays(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let forecast = data.list.slice(1, 5); // Get the forecast for the next 4 days
            forecast.forEach((day, index) => {
                let temp = Math.floor(day.main.temp - 273.15);
                document.getElementById(`temperature${index + 2}`).innerHTML = `${temp}°C`;
                document.getElementById(`description${index + 2}`).innerHTML = day.weather[0].main;
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
    getWeatherForDay(city);
    getWeatherForNextDays(city)
});

