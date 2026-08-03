import {places} from "../data/places.mjs";

const showHere = document.querySelector("#allPlaces");

function displayItems(places){
   places.forEach(place => {
        const placeCard = document.createElement("div");
        const placeTitle = document.createElement("h2");
        const placeDescription = document.createElement("p");
        const placeAddress = document.createElement("address");

        const placeFigureImg = document.createElement("figure");
        const figureCaption = document.createElement("figcaption");

        const placeImage = document.createElement("img");

        const LearnMoreBtn = document.createElement("button")
        
        figureCaption.innerText = `${place.alt}`;

        placeTitle.textContent = `${place.name}`;
        placeDescription.textContent = `${place.description}`;
        placeAddress.innerText = `${place.address}`;
        placeImage.setAttribute("src", `${place.image}`);
        placeImage.setAttribute("alt", `${place.alt}`);

        LearnMoreBtn.textContent = "Learn More"
        LearnMoreBtn.setAttribute("id", "learnMoreBtn");

        placeFigureImg.appendChild(placeImage);
        placeFigureImg.appendChild(figureCaption);

        placeCard.appendChild(placeTitle);
        placeCard.appendChild(placeFigureImg);
        placeCard.appendChild(placeDescription);
        placeCard.appendChild(placeAddress);
        placeCard.appendChild(LearnMoreBtn);

        showHere.appendChild(placeCard);
   }); 
}

displayItems(places);

document.addEventListener("DOMContentLoaded", () => {
  const messageElement = document.getElementById("visitor-message");
  const lastVisit = localStorage.getItem("lastVisitDate");
  const now = Date.now();
  
  const msInDay = 86400000;

  if (!lastVisit) {
    // First-time visitor
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    // Calculate time difference in milliseconds
    const timeDifference = now - parseInt(lastVisit, 10);
    
    if (timeDifference < msInDay) {
      messageElement.textContent = "Back so soon! Awesome!";
    } else {
      // 1 day or more: calculate whole number of days
      const daysBetween = Math.floor(timeDifference / msInDay);
      const dayWord = daysBetween === 1 ? "day" : "days";
      messageElement.textContent = `You last visited ${daysBetween} ${dayWord} ago.`;
    }
  }

  // Update localStorage with the current visit timestamp
  localStorage.setItem("lastVisitDate", now);
});