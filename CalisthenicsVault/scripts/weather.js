const nav_btn = document.querySelector("#ham-btn");
const menu = document.querySelector("#nav-bar");
const header = document.querySelector("header");
const body = document.querySelector("main");
const mediaQuery = window.matchMedia("(max-width: 38rem)");

// Function to handle DOM positioning and cleanup based on screen size
function handleScreenChange(e) {
  if (e.matches) {
    body.prepend(menu);
  } else {

    header.insertBefore(menu, nav_btn);
    nav_btn.classList.remove("active");
    menu.classList.remove("show");
  }
}

nav_btn.addEventListener("click", () => {
  nav_btn.classList.toggle("active");
  menu.classList.toggle("show");
});

mediaQuery.addEventListener("change", handleScreenChange);

handleScreenChange(mediaQuery);

const weatherSpots = document.querySelector("#weatherLocation");
const nearbySpots = document.querySelector("#nearbyWorkoutSpots");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=1d47ccab246620f7c8ed52de7b4f00ca&units=metric";

async function getWeather(){
    try{
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            return data;
        }
        else{
            throw new Error(await response.text());
        }
    }
    catch(error){
        console.log("The data couldn't be loaded" + error);
    }
}

let PARKS = [];

async function loadParks() {
    try {
        const response = await fetch("data/workoutSpots.json");
        PARKS = await response.json();
    }
    catch(error){
        console.log("Unabled to retrieve parks data" + error);
    }
}

function getTrainingVerdict(data){
    const condition = data.weather[0].main.toLowerCase();
    const windSpeed = data.wind.speed;
    const temp = data.main.temp;

    const isPrecipitation = ["rain", "snow", "thunderstorm", "drizzle"].includes(condition);
    const isExtremeTemp = temp < 5 || temp > 35;
    const isHighWind = windSpeed > 12;

    if (isPrecipitation || isExtremeTemp){
        return { level: "poor", message: "Not ideal — hold off or train indoors" };
    }
    if (isHighWind || temp < 10 || temp > 30){
        return { level: "caution", message: "Workable, but conditions aren't perfect" };
    }
    return { level: "good", message: "Good conditions for outdoor training" };
}

function renderWeather(data){
    if (!data){
        weatherSpots.innerHTML = `<p>Weather data isn't available right now.</p>`;
        return;
    }

    const verdict = getTrainingVerdict(data);

    weatherSpots.innerHTML = `
        <h3>${data.name}</h3>
        <p class="weather-desc">${data.weather[0].description}</p>
        <p class="weather-temp">${Math.round(data.main.temp)}°C</p>
        <p>Feels like ${Math.round(data.main.feels_like)}°C · Wind ${Math.round(data.wind.speed)} m/s · Humidity ${data.main.humidity}%</p>
        <p class="verdict ${verdict.level}">${verdict.message}</p>
    `;
}

function renderParks(){
    nearbySpots.innerHTML = "";

    if (PARKS.length === 0){
        nearbySpots.innerHTML = `<p>No nearby parks found.</p>`;
        return;
    }

    PARKS.forEach(park => {
        const card = document.createElement("div");
        card.className = "park-card";
        card.innerHTML = `
            <h4>${park.name}</h4>
            <p>${park.address}</p>
            <div class="park-equip">
                ${park.equipment.map(e => `<span class="tag">${e}</span>`).join("")}
            </div>
        `;
        nearbySpots.appendChild(card);
    });
}

async function init(){
    const weatherData = await getWeather();
    renderWeather(weatherData);

    await loadParks();
    renderParks();
}

const last_modified = document.querySelector("#lastModified");
const yearSpan = document.querySelector("#currentYear");

const today = new Date();
// OPTIMIZATION: Use the 'today' variable you already created instead of making a second Date object
const currentYear = today.getFullYear(); 
yearSpan.textContent = currentYear;

// FIX: Added the missing closing quote after the class name "highlight"
last_modified.innerHTML = `Last modified: <span class="highlight">${new Intl.DateTimeFormat(
    "en-US",
    {
        dateStyle: "full"
    }
).format(today)}</span>`;

init();