
const apiKey = "ebedcf9953170ea823fe7a61f907bcd7";

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const wheatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');
const errorContainer = document.querySelector('#error-container');

const getWeatherData = async(city) =>{
    const ApiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(ApiWeatherUrl);
    const data = await res.json();

    return data;
}

const getPhoto = async(city) =>{
    const requestUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=0yyKozAP172Wxp-C-2YGjDcP2CgWNpHcewjQyeB4L1Y`;
    const res = await fetch(requestUrl);
    const data = await res.json();

    return data;
}

const showWeatherData = async(city) =>{
   const data = await getWeatherData(city);
   const photo = await getPhoto(city);

   if(data.cod === "404"){
        errorContainer.classList.remove("hide");
        weatherContainer.classList.add("hide");
        document.body.style.background = "linear-gradient(60deg,#ebebeb 10%, #2b2b2b 100%)";
        return data;
   }

   errorContainer.classList.add("hide");

   cityElement.innerText = data.name;
   tempElement.innerText = parseInt(data.main.temp);
   descElement.innerText = data.weather[0].description;
   wheatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
   countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
   humidityElement.innerText = `${data.main.humidity}%`;
   windElement.innerText = `${data.wind.speed}km/h`;

   weatherContainer.classList.remove("hide")

   document.body.style.backgroundImage = `url("${photo.results[0].urls.regular}")`;
}

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
})