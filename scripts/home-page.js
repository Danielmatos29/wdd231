const nav_btn = document.querySelector("#ham-button");
const navigation = document.querySelector("#nav-bar");

nav_btn.addEventListener("click", () => {
    nav_btn.classList.toggle("show");
    navigation.classList.toggle("show");
})