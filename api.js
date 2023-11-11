let cityEl;
let city;
let button = document.getElementById('value');
let lat;
let lon;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
document.getElementById('date').innerHTML = today;


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
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let temp = Math.floor(data.current.temp);
            document.getElementById(`temperature`).innerHTML = `${temp}°`;
            document.getElementById(`desc`).innerHTML = data.current.weather[0].description;
            document.getElementById(`wind`).innerHTML = data.current.wind_speed + ` m/s`;
            document.getElementById(`cityH`).innerHTML = city;
        })
        .catch(err => {
            console.log(err);
        });
}

// Get Weather


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

