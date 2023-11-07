let cityEl;
let city;
let button = document.getElementById('value');
let lat;
let lon;

// API Key
let api = '77442ded850fd1a075869d12438a5415';

function getCityCoords(city) {
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=&appid=${api}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            lat = data[0].lat;
            lon = data[0].lon;
        })
        .catch(err => {
            console.log(err);
        });
}
function getWeatherForDay(lat, lon) {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let temp = Math.floor(data.hourly[0].temp - 273.15);
            document.getElementById(`temperature`).innerHTML = `${temp}°C`;
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
            });
        })
        .catch(err => {
            console.log(err);
        });
}

button.addEventListener('click', () => {
    // Get the city from the textbox
    cityEl = document.getElementById('cityBox');
    city = cityEl.value;

    getCityCoords(city)
        .then(() => {
            getWeatherForDay(lat, lon);
            getWeatherForNextDays(city);
        });
});

