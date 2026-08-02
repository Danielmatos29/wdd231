const get_string = window.location.search;
console.log(get_string);

const my_info = new URLSearchParams(get_string);
console.log(my_info);


console.log(my_info.get("first"));
console.log(my_info.get("last"));
console.log(my_info.get("ordinance"));
console.log(my_info.get("date"));
console.log(my_info.get("location"));
console.log(my_info.get("phone"));
console.log(my_info.get("email"));

document.querySelector("#results").innerHTML = `<p>Appointment for ${my_info.get("first")} ${my_info.get("last")}</p>
<p>Proxy ${my_info.get("ordinance")} on ${my_info.get("date")} in the ${my_info.get("location")} Temple</p>
<p>Your Phone: ${my_info.get("phone")}</p>
<p>Your Email: ${my_info.get("email")}</p>`;
