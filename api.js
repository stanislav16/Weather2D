let cityEl;
let city;
let button = document.getElementById('value');
let lat;
let lon;

//We get current date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
document.getElementById('date').innerHTML = today;


// API Key
let api = '77442ded850fd1a075869d12438a5415';

//Function for getting latitude and longitude from OpenWeatherMap with the API key
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

//Function for getting every information we need for the project
//Everything is written in one funciton to save API calls
function getWeatherForDay(lat, lon) {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            //Getting current temperature, description, wind speed and humidity and adding them to divs
            let temp = Math.floor(data.current.temp);
            document.getElementById(`temperature`).innerHTML = `${temp}°`;
            document.getElementById(`desc`).innerHTML = data.current.weather[0].description;
            document.getElementById(`wind`).innerHTML = data.current.wind_speed + ` m/s`;
            document.getElementById(`humidity`).innerHTML = data.current.humidity + ` %`;


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
            for (let i = 0; i < 7; i++) {
                // Calculating the index for the hourly description (every 3 hours)
                let index = i * 3;

                // Make sure the index is within the range of the hourly data
                if (index < hourlyData.length) {
                    // Getting the description
                    let desc = hourlyData[index].weather[0].description;
                    //Making ifs to check which words are included in the description and matching them with icons
                    //After checking, we add the icons to spans
                    if (desc.includes("rain") || desc.includes("drizzle")) {
                        document.getElementById(`hourIcon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">rainy</span>';
                    } else if (desc.includes("thunderstorm")) {
                        document.getElementById(`hourIcon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">thunderstorm</span>';
                    } else if (desc.includes("clear")) {
                        document.getElementById(`hourIcon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">clear_day</span>';
                    } else if (desc.includes("few clouds") || desc.includes("scattered clouds")) {
                        document.getElementById(`hourIcon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">partly_cloudy_day</span>';

                    } else if (desc.includes("broken clouds") || desc.includes("overcast clouds")) {
                        document.getElementById(`hourIcon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">cloud</span>';

                    } else if (desc.includes("mist") || desc.includes("smoke") || desc.includes("haze") || desc.includes("whirls") || desc.includes("fog") || desc.includes("sand") || desc.includes("dust") || desc.includes("ash") || desc.includes("squalls") || desc.includes("tornado")) {
                        document.getElementById(`hourIcon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">mist</span>';

                    } else if (desc.includes("snow")) {
                        document.getElementById(`hourIcon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">weather_snowy</span>';

                    }
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
                    let hoursString = hours.toString().padStart(2, '0');
                    let minutesString = minutes.toString().padStart(2, '0');

                    // Combining the hours and minutes into a time string
                    let timeString = hoursString + ':' + minutesString;


                    // Adding the hours to the divs
                    document.getElementById(`hourLabel${i + 1}`).innerHTML = timeString;
                }
            }

            //Adding lowest and highest temperatures to divs
            document.getElementById(`max`).innerHTML = `H:` + Math.floor(data.daily[0].temp.max) + `°`;
            document.getElementById(`min`).innerHTML = `L:` + Math.floor(data.daily[0].temp.min) + `°`;

            //Getting daily data
            let dailyData = data.daily;

            let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            for (let i = 0; i < 5; i++) {
                let index = i;

                if (index < dailyData.length) {
                    let date = new Date(dailyData[index].dt * 1000); // Multiply by 1000 to convert seconds to milliseconds

                    // Getting the day of the week as a number
                    let dayNumber = date.getDay();


                    // Getting the weekday name
                    let weekdayName = weekdays[dayNumber];
                    // Adding the names to the divs
                    document.getElementById(`dayLabel${i + 1}`).innerHTML = weekdayName;
                }
            }

            for (let i = 0; i < 5; i++) {
                let index = i;

                if (index < dailyData.length) {
                    let desc = dailyData[index].weather[0].description;
                    //Making ifs to check which words are included in the description and matching them with icons
                    //After checking, we add the icons to spans
                    if (desc.includes("rain") || desc.includes("drizzle")) {
                        document.getElementById(`icon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">rainy</span>';
                    } else if (desc.includes("thunderstorm")) {
                        document.getElementById(`icon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">thunderstorm</span>';
                    } else if (desc.includes("clear")) {
                        document.getElementById(`icon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">clear_day</span>';
                    } else if (desc.includes("few clouds") || desc.includes("scattered clouds")) {
                        document.getElementById(`icon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">partly_cloudy_day</span>';

                    } else if (desc.includes("broken clouds") || desc.includes("overcast clouds")) {
                        document.getElementById(`icon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">cloud</span>';

                    } else if (desc.includes("mist") || desc.includes("smoke") || desc.includes("haze") || desc.includes("whirls") || desc.includes("fog") || desc.includes("sand") || desc.includes("dust") || desc.includes("ash") || desc.includes("squalls") || desc.includes("tornado")) {
                        document.getElementById(`icon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">mist</span>';

                    } else if (desc.includes("snow")) {
                        document.getElementById(`icon${i + 1}`).innerHTML = '<span class="material-symbols-outlined" style="font-size: 50px">weather_snowy</span>';

                    }

                    for (let i = 0; i < 5; i++) {
                        let index = i;

                        if (index < dailyData.length) {
                            let minTemp = Math.floor(dailyData[index].temp.min);

                            // Adding the lowest temperature to the div
                            document.getElementById(`dayMin${i + 1}`).innerHTML = "L: " + minTemp + `°`;
                        }
                    }

                    let dailyMax = data.daily;

                    for (let i = 0; i < 5; i++) {
                        let index = i;

                        if (index < dailyMax.length) {
                            let maxTemp = Math.floor(dailyMax[index].temp.max);

                            // Add the highest temperature to the div
                            document.getElementById(`dayMax${i + 1}`).innerHTML = "H: " + maxTemp + `°`;
                        }
                    }

                }
            }


        })
        .catch(err => {
            console.log(err);
        });
}

// Get Weather

//Using the button to call all the functions and display all the information
button.addEventListener('click', () => {
    // Get the city from the textbox
    cityEl = document.getElementById('cityBox');
    city = cityEl.value;

    getCityCoords(city)
        .then(() => {
            getWeatherForDay(lat, lon);
            document.getElementById(`cityH`).innerHTML = city;
        });
});
//Getting the city name from the other JS file
const cityWelcome = localStorage.getItem("cityWel");
//Loading the page with the city name from the "welcome" menu
window.onload = getCityCoords(cityWelcome)
    .then(() => {
        getWeatherForDay(lat, lon);
        document.getElementById(`cityH`).innerHTML = cityWelcome;

    });
