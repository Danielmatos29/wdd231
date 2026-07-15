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
        const response = await fetch("./members.json");

        data = await response.json();

        displayMembers(data.members);
    }
    catch(error){
        console.error("Error loading members data", error);
    }
}
const displayMembers = (members) =>{

    let cards = document.querySelector("#cards");

    members.forEach((member, index) => {
        let card = document.createElement("section");
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

        list_button.addEventListener("click", () =>{
            container.removeChild(portrait);
        })
        
        grid_button.addEventListener("click", () =>{
            container.appendChild(portrait);
        })

        container.appendChild(portrait);
        container.appendChild(infoContainer);

        card.appendChild(title);
        card.appendChild(tag);
        card.appendChild(container);

        cards.appendChild(card);
    });
};

getMembersData()

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