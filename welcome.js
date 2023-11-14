let cityW;
var cityWelcome;
let buttonW = document.getElementById('getCity');

var Test = "test";

//When pressing the button we get the city name as a variable and upload it to the local storage to use it in "api.js and we are send to "mainPage.html"
buttonW.addEventListener('click', () => {
    // Get the city from the textbox
    cityW = document.getElementById('cityWBox');
    cityWelcome = cityW.value;
    localStorage.setItem("cityWel", cityWelcome);
    window.location.href = "mainPage.html";
    console.log(cityWelcome);


});
