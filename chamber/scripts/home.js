const ham_button = document.querySelector("#ham-btn");
const grid_button = document.querySelector("#grid_btn");
const list_button = document.querySelector("#list_btn");
const navigation = document.querySelector("#nav");

ham_button.addEventListener("click", () => {
    ham_button.classList.toggle("show");
    navigation.classList.toggle("show");
});

let members = [];

async function getMembersData(){
    try{
        const response = await fetch("./data/members.json");

        data = await response.json();

        displayMembers(data.members);
    }
    catch(error){
        console.error("Error loading members data", error);
    }
}


const displayMembers = (members) =>{

    const pool = [members[0], members[1], members[2], members[3], members[4], members[5], members[6]];

    // 2. Shuffle the array using the Fisher-Yates algorithm
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]]; // Swaps elements
    }

    // 3. Extract the first 3 items from the shuffled pool
    const threeRandomNumbers = pool.slice(0, 3);

    threeRandomNumbers.forEach((member, index) => {
        let cards = document.querySelector("#spotlights")
        let card = document.createElement("article");
        let title = document.createElement("h2");
        let tag = document.createElement("p")
        let container = document.createElement("div");

        let portrait = document.createElement("img");

        let infoContainer = document.createElement("div")

        let email = document.createElement("p");
        let phone = document.createElement("p");
        let urlList = document.createElement("li");
        let url = document.createElement("a");

        let urlSpan = document.createElement("span");

        title.textContent = member.name;
        tag.textContent = member.tag;
        urlSpan.innerHTML = `<strong>URL: </strong>`;
        email.innerHTML = `<strong>EMAIL: </strong>${member.email}`;
        phone.innerHTML = `<strong>PHONE: </strong>${member.phone}`;

        urlSpan.appendChild(url);
        
        url.textContent = `${member.url}`
        url.setAttribute("href", member.url);
        container.setAttribute("class", "container");
        portrait.setAttribute("src", member.image);
        portrait.setAttribute("alt", `Portrait of ${member.name}`);
        card.setAttribute("class", "card");
        portrait.setAttribute("width", "100");
        portrait.setAttribute("height", "100");

        infoContainer.appendChild(email);
        infoContainer.appendChild(phone);
        infoContainer.appendChild(urlSpan);

        if (index === 0) {
            portrait.setAttribute("fetchpriority", "high");
        }
        else {
            portrait.setAttribute("loading", "lazy")
        };

        if (member.level == 2){
            card.setAttribute("class", "silver");
        }
        else if(member.level == 3){
            card.setAttribute("class", "gold");
        };

        container.appendChild(portrait);
        container.appendChild(infoContainer);

        card.appendChild(title);
        card.appendChild(tag);
        card.appendChild(container);

        cards.appendChild(card);
    });
};

getMembersData()

let eventSection = document.querySelector("#eventSection");
let weatherSection = document.querySelector("#weatherSection");
let weatherContainer = document.querySelector("#weather-container");

// Changed endpoint from /weather to /forecast
const url = "https://api.openweathermap.org/data/2.5/forecast?lat=18.45&lon=-69.94&appid=1d47ccab246620f7c8ed52de7b4f00ca&units=imperial";

async function apiFetch(){
    try {
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            updateForecast(data);
        } else {
            throw new Error(await response.text()); // Fixed syntax error
        }
    } catch(error) {
        console.log(error);
    }
}

apiFetch();

function updateForecast(data) {

    const dailyForecast = {};

    data.list.forEach((item) => {
        // Fixed: added () to execute the function
        const date = new Date(item.dt * 1000).toLocaleDateString(); 
        
        if (!dailyForecast[date]) {
            dailyForecast[date] = [];
        }
        dailyForecast[date].push(item);
    });

    // Using slice(1, 4) skips today and gets the next 3 days
    const forecastDays = Object.keys(dailyForecast).slice(1, 4);

    // 4. Create UI elements for each day in the 3-day forecast
    forecastDays.forEach((day) => {
        const dayData = dailyForecast[day];
        
        // Grab the midday forecast (or first available) snapshot for that day
        const middayForecast = dayData.find(item => item.dt_txt.includes("12:00:00")) || dayData[0];

        // Create individual containers/elements for each specific day
        let dayCard = document.createElement("div");
        dayCard.className = "forecast-card";

        let dayTitle = document.createElement("h3");
        // Fixed: changed '=' to ':' in object assignment
        dayTitle.textContent = new Date(day).toLocaleDateString("en-US", { weekday: "short" });

        let weatherIcon = document.createElement("img");
        let currentTemp = document.createElement("span");
        let captionDesc = document.createElement("figcaption");

        // Reference 'middayForecast' instead of 'data'
        currentTemp.innerHTML = `${Math.round(middayForecast.main.temp)}&deg;F `;
        captionDesc.textContent = middayForecast.weather[0].description;
        
        const iconCode = middayForecast.weather[0].icon;
        const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", captionDesc.textContent);
        dayCard.setAttribute("class", "forecast");
        // Append everything to the daily card, then append the card to the section
        dayCard.appendChild(dayTitle);
        dayCard.appendChild(weatherIcon);
        dayCard.appendChild(currentTemp);
        dayCard.appendChild(captionDesc);
        
        weatherContainer.appendChild(dayCard);
    });
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