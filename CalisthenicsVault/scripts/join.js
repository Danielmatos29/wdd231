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
console.log(my_info.get("formLoadedTimestamp"));

document.querySelector("#results").innerHTML = `Welcome ${my_info.get("firstName")} ${my_info.get("lastName")}, email: ${my_info.get("emailAddress")}, phone_number: ${my_info.get("phoneNumber")}, Date: ${my_info.get("formLoadedTimestamp")}`