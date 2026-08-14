const skillsContainer = document.querySelector("#allSkills");
const skillInfo = document.querySelector("#skillInfo");
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

async function getSkillsData()
{
    try{
        const response = await fetch("data/skills.json");

        const data = await response.json();

        displaySkills(data.skills);

        const learnMoreBtn = document.querySelectorAll(".learnMore");

        learnMoreBtn.forEach(button =>{
            button.addEventListener("click", () =>{
                displayDialogItems(data.skills[button.value]);
            })
        })
    }
    catch(error){
        console.log(error);
    }
}

getSkillsData();
//index value to iterate from every skill
let i = 0;

function displaySkills(skills){
    skills.forEach(skill => {

        const skillContainer = document.createElement("div");

        const title = document.createElement("h3");
        const picture = document.createElement("img");
        const button = document.createElement("button");

        button.setAttribute("value", `${i}`);
        button.setAttribute("class", "learnMore");
        button.textContent = "Learn More"

        skillContainer.setAttribute("class", "skillContainer");

        title.textContent = `${skill.name}`;
        picture.setAttribute("src", `${skill.image}`);
        picture.setAttribute("width", "400");
        picture.setAttribute("loading", "lazy");
        picture.setAttribute("alt", `${skill.alt}`);

        skillContainer.appendChild(title);
        skillContainer.appendChild(picture);
        skillContainer.appendChild(button)

        skillsContainer.appendChild(skillContainer);
        i++;
    })
}

function displayDialogItems(skill){
    skillInfo.replaceChildren();
    //Close modal button
    const closeModal = document.createElement("button")
    closeModal.setAttribute("id", "closeModal");
    closeModal.textContent = "❌";

    const divInfo = document.createElement("div")
    const title = document.createElement("h3");
    const descriptionTitle = document.createElement("span");
    const description = document.createElement("p");
    const techniqueTitle = document.createElement("span");
    const technique = document.createElement("p");
    const improveTitle = document.createElement("span");
    const improve = document.createElement("p");

    title.textContent = `${skill.name}`;
    descriptionTitle.innerHTML = `<strong>What is the ${skill.name}? </strong>`;
    description.textContent = `${skill.what_it_is}`;
    techniqueTitle.innerHTML = `<strong>How to perform the ${skill.name}</strong>`;
    technique.textContent = `${skill.technique}`;
    improveTitle.innerHTML = `<strong>Get better at ${skill.name}s</strong>`
    improve.textContent = `${skill.get_better}`;

    divInfo.appendChild(closeModal);
    divInfo.appendChild(title);
    divInfo.appendChild(descriptionTitle);
    divInfo.appendChild(description);
    divInfo.appendChild(techniqueTitle);
    divInfo.appendChild(technique);
    divInfo.appendChild(improveTitle);
    divInfo.appendChild(improve);

    skillInfo.appendChild(divInfo);
    skillInfo.showModal();

    closeModal.addEventListener("click", () =>{
        skillInfo.close();
    })
}