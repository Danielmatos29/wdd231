const weatherIcon = document.querySelector("#weather-icon");
const currentTemp = document.querySelector("#current-temp");
const captionDesc = document.querySelector("figcaption");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=1d47ccab246620f7c8ed52de7b4f00ca";

async function apiFetch(){
    try{
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            DisplayWeather(data);
        }
        else{
            throw error(await response.text());
        }
    }
    catch(error){
        console.log(error);
    }
}

apiFetch();

function DisplayWeather(data){
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    captionDesc.textContent = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", captionDesc);
}   