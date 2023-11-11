let cityW;
var cityWelcome;
let buttonW = document.getElementById('getCity');

var Test="test";

buttonW.addEventListener('click', () => {
    // Get the city from the textbox
    cityW = document.getElementById('cityWBox');
    cityWelcome = cityW.value;
    localStorage.setItem("cityWel",cityWelcome);
    window.location.href="mainPage.html";
    console.log(cityWelcome);


});
