//Hamburger Menu

function show(){
    const ham = document.querySelector(".hamburger");
    ham.style.display = "flex";
}

function hide(){
    const ham = document.querySelector(".hamburger");
    ham.style.display = "none";
}
let menu = document.querySelector(".menu");
let cl = document.querySelector(".close");

menu.addEventListener("click",show);
cl.addEventListener("click",hide);

// Creating required divisions for flex
let mainDiv = document.createElement("div");
let hourly = document.createElement("div");
let daily = document.createElement("div");
let div1 = document.createElement("div");
let div2 = document.createElement("div");
let div3 = document.createElement("div");
let div4 = document.createElement("div");

mainDiv.classList.add("card-container");
hourly.classList.add("hourly");
daily.classList.add("daily");
div1.classList.add("condition");
div2.classList.add("vapour-details");
div3.classList.add("temp-wind");
div4.classList.add("weather-image");

let mainTag = document.querySelector("main");
mainTag.appendChild(mainDiv);
mainTag.appendChild(hourly);
mainTag.appendChild(daily);

mainDiv.appendChild(div1);
mainDiv.appendChild(div2);
mainDiv.appendChild(div3);
mainDiv.appendChild(div4);

// Creating a function for displaying weather data
function weatherDetails(data) {
    console.log(`${data.location.name}, ${data.location.region}`);
    placeDetails = document.querySelector(".place");
    placeDetails.innerText = `${data.location.name}, ${data.location.region}`;
    lastUpdated = document.querySelector(".l_u");
    lastUpdated.innerText = `(Last Updated: ${data.current.last_updated})`;
     // Clear the previous data in divs before appending new data
     div1.innerHTML = '';
     div2.innerHTML = '';
     div3.innerHTML = '';
     div4.innerHTML = '';
     hourly.innerHTML = ''; // Clear previous hourly data
     daily.innerHTML = ''; // Clear previous daily data
    let date = document.createElement("p");
    date.classList.add("card");
    let condition = document.createElement("p");
    condition.classList.add("card");
    let sun_moon = document.createElement("p");
    sun_moon.classList.add("card");
    let precip = document.createElement("p");
    precip.classList.add("card");
    let hum = document.createElement("p");
    hum.classList.add("card");
    let pres = document.createElement("p");
    pres.classList.add("card");
    let temp = document.createElement("p");
    temp.classList.add("card");
    let t_range = document.createElement("p");
    t_range.classList.add("card");
    let wind = document.createElement("p");
    wind.classList.add("card");

    // Date
    date.innerText = `Date: ${data.forecast.forecastday[0].date}`;
    div1.appendChild(date);

    // Condition
    condition.innerText = `Condition: ${data.current.condition.text}`;
    div1.appendChild(condition);

    // Sun and Moon
    sun_moon.innerHTML = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise} 
                          Sunset: ${data.forecast.forecastday[0].astro.sunset} 
                          <br/> Moonrise: ${data.forecast.forecastday[0].astro.moonrise} 
                          Moonset: ${data.forecast.forecastday[0].astro.moonset}`;
    div1.appendChild(sun_moon);

    // Precipitation, Humidity, Pressure
    precip.innerText = `Precipitation: ${data.forecast.forecastday[0].day.totalprecip_mm}mm / 
                        ${data.forecast.forecastday[0].day.totalprecip_in}in`;
    div2.appendChild(precip);

    hum.innerText = `Humidity: ${data.current.humidity}%`;
    div2.appendChild(hum);

    pres.innerText = `Pressure: ${data.current.pressure_in} in of Hg / ${data.current.pressure_mb}mb`;
    div2.appendChild(pres);

    // Temperature
    temp.innerText = `Temperature: ${data.current.temp_c}°C / ${data.current.temp_f}°F`;
    div3.appendChild(temp);

    // Temperature Range
    t_range.innerHTML = `Temp Range: Max - ${data.forecast.forecastday[0].day.maxtemp_c}°C / 
                         ${data.forecast.forecastday[0].day.maxtemp_f}°F 
                         <br/> Min - ${data.forecast.forecastday[0].day.mintemp_c}°C / 
                         ${data.forecast.forecastday[0].day.mintemp_f}°F`;
    div3.appendChild(t_range);

    // Wind
    wind.innerHTML = `Wind-direction: ${data.current.wind_dir} 
                      <br/> Wind-speed: ${data.current.wind_kph} kph / ${data.current.wind_mph} mph`;
    div3.appendChild(wind);

    // Image
    let img = document.createElement("img");
    img.src = `https:${data.current.condition.icon}`;  // Set the weather icon dynamically
    div4.appendChild(img);
    img.classList.add("w_img");

    // Creating hourly report
    hourly.innerHTML = ''; // Clear previous hourly data
    for (let i = 0; i < 24; i++) {
        let hr = document.createElement("p");
        hr.innerHTML = `${i}:00hrs <br> ${data.forecast.forecastday[0].hour[i].temp_c}°C`;
        hr.classList.add("hr");
        hourly.appendChild(hr);
    }

    // Creating weekly report
    daily.innerHTML = ''; // Clear previous daily data
    for (let j = 0; j < 7; j++) {
        let dl = document.createElement("p");
        dl.innerHTML = `${data.forecast.forecastday[j].date} 
                        <br/> 
                        <img src="https:${data.forecast.forecastday[j].day.condition.icon}" /> 
                        <br> ${data.forecast.forecastday[j].day.maxtemp_c}°C / 
                        ${data.forecast.forecastday[j].day.mintemp_c}°C`;
        dl.classList.add("dl");
        daily.appendChild(dl);
    }
}

// Calling API for default city (Kharagpur)
const URL = "http://api.weatherapi.com/v1/forecast.json?key=b6869e591d9f4de5a8652023242012&q=Kharagpur&days=8&aqi=yes&alerts=no";

const getData = async () => {
    try {
        let response = await fetch(URL);
        let result = await response.json();
        weatherDetails(result);
    } catch (error) {
        console.error("There was a problem fetching the data...", error);
    }
};

// Event listener for button click to get data for a new city
const btn = document.querySelector("#btn");
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let city = document.querySelector("#search").value;
    let newURL = `http://api.weatherapi.com/v1/forecast.json?key=b6869e591d9f4de5a8652023242012&q=${city}&days=8&aqi=yes&alerts=no`;

    const getNewData = async () => {
        try {
            let resp = await fetch(newURL);
            let res = await resp.json();
            weatherDetails(res);
        } catch (error) {
            console.error("There was a problem fetching the data...", error);
        }
    };

    getNewData(); // Call the new data fetching function
});

// Load initial data
getData();
