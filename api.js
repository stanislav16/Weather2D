let cityEl;
let city;
let button = document.getElementById('value');
let lat;
let lon;

// API Key
let api = 'ea73d5e89224d63f1f7c52734328a954';

function getCityCoords(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=&appid=${api}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
             lat = data[0].lat;
             lon = data[0].lon;
            document.getElementById('kur').innerHTML = lat + ' ' + lon;
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
            let temp = Math.floor(data.current.temp - 273.15);
            document.getElementById(`temperature`).innerHTML = `${temp}°C`;
            document.getElementById(`description`).innerHTML = data.current.clouds;
        })
        .catch(err => {
            console.log(err);
        });
}

function hourlyTemperature(city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${api}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);  // Log the data to the console
            let hourlyForecast = data.list.slice(0, 24); // Get the forecast for the next 24 hours
            hourlyForecast.forEach((hour, index) => {
                let temp = Math.floor(hour.main.temp - 273.15);
                let tempElement = document.createElement('p');
                tempElement.innerHTML = `Hour ${index}: ${temp}°C`;
                document.getElementById('hourly').appendChild(tempElement);
            });
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

    getCityCoords(city)
         //   getWeatherForDay(lat, lon);
            getWeatherForNextDays(city);
            hourlyTemperature(city);
});

