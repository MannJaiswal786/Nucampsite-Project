
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

// when the pause button is clicked, pause the carousel
const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener("click", function() {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    }
    else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
});

async function fetchWeather(){
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = "Phoenix";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    displayWeather(data);
    }
    catch(error){
        console.error(`There was an error!`, error);
    }
   
}

fetchWeather();

function displayWeather(data){

    const temperature = data.main.temp;
    const weather = data.weather[0].description;
    const icon = data.weather[0].icon;

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/w/${icon}.png`;
    const weatherContainer = document.querySelector('#weather');

    weatherContainer.appendChild(weatherIcon);

   const weather_temperature = document.createElement('p');
   weather_temperature.textContent = `Temperature: ${data.main.temp}\u00B0`;

   weatherContainer.appendChild(weather_temperature);

   const weather_description = document.createElement('p');
   weather_description.innerText = data.weather[0].description;

   weatherContainer.appendChild(weather_description);
}
