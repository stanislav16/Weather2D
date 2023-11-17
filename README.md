![Weather2D](https://github.com/stanislav16/Weather/assets/127948971/b6ec7092-5391-4170-a005-5b616013a882)

### This is a simple and visually pleasing weather website

## Design and usage

The design consists of simple and aesthetically pleasing fonts, icons and colors. It has light and dark mode, which are active based on the user's system theme. The website is very easy to use: 
firstly the user is presented with a welcome page (`welcome.html`) where they have to input a city.

![Web capture_17-11-2023_165823_](https://github.com/stanislav16/Weather/assets/127948971/d046d940-1e53-40e1-8c28-81f2b49f334a)

After pressing the button, the user is presented with the main page of the website (`mainPage.html`) where they can see information such as current temperature, hourly and daily forecast for the chosen city.
If the user wishes to see another city's weather, they can input a new city name in the input bar on the top left of the page.

![Web capture_17-11-2023_17247_](https://github.com/stanislav16/Weather/assets/127948971/4007e820-1d31-488e-86ba-80423003587f)

The design of both pages is in `welcome.css` and `mainPage.css`.

## How it works

The weather data used in this project is taken from the [OpenWeatherMap](https://openweathermap.org/api) site. After getting an API key from their website
I use the Fetch API to make a request to the [OpenWeatherMap](https://openweathermap.org/api) API and get the needed data.

Firstly I use a function to get the coordinates of the city which the user has chosen.

![carbon (1)](https://github.com/stanislav16/Weather/assets/127948971/d97d2e65-c2ac-46e5-a7a3-57e6b06ae9b0)

After I have the coordinates of the chosen city, I can use them in another API call to get the weather data.

![carbon (2)](https://github.com/stanislav16/Weather/assets/127948971/5dd3fdd1-571f-497e-bb27-a807eb8fc9c5)

For more information on how everything works, you can open my `api.js` and `welcome.js` files. 
