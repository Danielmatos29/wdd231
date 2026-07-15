let cards = document.querySelector("#cards");
const ham_button = document.querySelector("#ham_btn");
const grid_button = document.querySelector("#grid_btn");
const list_button = document.querySelector("#list_button");

let members = [];

async function getMembersData(){
    try{
        const response = await fetch("./members.json");

        members = await response.json();

        displayMembers(members);
    }
    catch(error){
        console.error("Error loading members data", error);
    }
}
const displayMembers = (members) =>{
    members.forEach(member => {
        let card = document.createElement("section");
        let title = document.createElement("h2");
        let tag = document.createElement("p")
        let container = document.createElement("div");

        let portrait = document.createElement("img");

        let infoContainer = document.querySelector("div")

        let email = document.createElement("p");
        let phone = document.createElement("p");
        let urlList = document.createElement("li");
        let url = document.createElement("a");

        title.textContent = member.name;
        tag.textContent = member.tag;
        urlList.textContent = "URL: ";
        email.textContent = `EMAIL: ${member.email}`;
        phone.textContent = `PHONE: ${member.phone}`;

        urlList.appendChild(url);

        url.setAttribute("src", member.email);
        container.setAttribute("class", "container");
        portrait.setAttribute("alt", `Portrait of ${member.name}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "80");
        portrait.setAttribute("height", "80");

        infoContainer.appendChild(email);
        infoContainer.appendChild(phone);
        infoContainer.appendChild(url);

        container.appendChild(portrait);
        container.appendChild(infoContainer);

        card.appendChild(title);
        card.appendChild(tag);
        card.appendChild(container);
    });
}
