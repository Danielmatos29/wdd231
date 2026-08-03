const ham_button = document.querySelector("#ham-btn");
const grid_button = document.querySelector("#grid_btn");
const list_button = document.querySelector("#list_btn");
const navigation = document.querySelector("#nav");

ham_button.addEventListener("click", () => {
    ham_button.classList.toggle("show");
    navigation.classList.toggle("show");
});

const membershipDetails = document.querySelector("#membership-details");

const membershipButton = document.querySelectorAll(".membershipButton");

async function getMembershipData(){
    try{
        const response = await fetch("./data/memberships.json");

        data = await response.json();
        membershipButton.forEach(button => {
            button.addEventListener("click", () => {
                displayMembershipDetails(data.memberships[button.getAttribute("value")]);
            })
        })
    }
    catch(error){
        console.log(error);
    }
};

getMembershipData();

function displayMembershipDetails(membership){
    membershipDetails.innerHTML = " ";
    let membershipName = document.createElement("h3");

    membershipName.textContent = `${membership.name}`;
    
    let closeButton = document.createElement("button");
    closeButton.textContent = "❌";
    closeButton.setAttribute("id", "closeModal");

    let cost = document.createElement("p");
    cost.innerHTML = `<strong>Cost:</strong> $${membership.cost} annual`;

    let benefitsTitle = document.createElement("p");
    benefitsTitle.innerHTML = `<strong>Benefits:</strong>`;

    let benefits = document.createElement("div");

    membershipDetails.appendChild(membershipName);
    membershipDetails.appendChild(closeButton);
    membershipDetails.appendChild(benefitsTitle);

    membership.benefits.forEach(benefit => {
        let benefitText = document.createElement("p");
        benefitText.textContent = `• ${benefit}`;
        benefits.appendChild(benefitText);

        membershipDetails.showModal();

        closeModal.addEventListener("click", () => {
            membershipDetails.close();
        })
    });

    membershipDetails.appendChild(benefits);
    membershipDetails.appendChild(cost);
}

document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("loadTimestamp");
    
    timestampField.value = new Date().toISOString();
  });

const get_string = window.location.search;

console.log(get_string);

const my_info = new URLSearchParams(get_string);

console.log(my_info.get("first"));
console.log(my_info.get("lastName"));
console.log(my_info.get("emailAddress"));
console.log(my_info.get("phoneNumber"));
console.log(my_info.get("businessName"));
console.log(my_info.get("formLoadedTimestamp"));

document.querySelector("#results").innerHTML = `Welcome ${my_info.get("firstName")} ${my_info.get("lastName")}, email: ${my_info.get("emailAddress")}, phone_number: ${my_info.get("phoneNumber")}, business name: ${my_info.get("businessName")} Date: ${my_info.get("formLoadedTimestamp")}`