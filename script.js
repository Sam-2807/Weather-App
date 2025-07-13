// Get all the necessary elements from the HTML
const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");

// !! IMPORTANT: Replace this with your own API key from OpenWeatherMap !!
const apiKey = "6f5faceefb72fabe3373dfdbc356f749";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    // Fetch data from the API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // If the city name is invalid, show an error message
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return; // Stop the function here
    }

    // Convert the response data to JSON format
    var data = await response.json();

    // Update the HTML with the data received from the API
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Update the weather icon based on the weather condition
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Show the weather info and hide the error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

// Add an event listener to the search button
searchBtn.addEventListener("click", () => {
    // Call the checkWeather function with the city name from the input box
    checkWeather(searchBox.value);
});

// Allow pressing Enter to search
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
