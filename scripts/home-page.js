const nav_btn = document.querySelector("#ham-button");
const navigation = document.querySelector("#nav-bar");

nav_btn.addEventListener("click", () => {
    nav_btn.classList.toggle("show");
    navigation.classList.toggle("show");
})

const courses = [
    "CSE110",
    "WDD130",
    "CSE111",
    "CSE210",
    "WDD131",
    "WDD231",
];

const CSE_courses = [
    "CSE110",
    "CSE111",
    "CSE210",
];

const WDD_courses = [
    "WDD130",
    "WDD131",
    "WDD231",
];

const allBtn = document.querySelector("#all-btn");
const cseCoursesBtn = document.querySelector("#cse-courses");
const wddCoursesBtn = document.querySelector("#wdd-courses");

const softwareCourses = document.querySelector("#software-courses");
const webCertificateSection = document.querySelector("#Certificates")

const listedCoursesText = document.createElement("p");
listedCoursesText.textContent = `The total number of courses listed is ${courses.length * 2}`;

function softwareDisplayAll(){
    webCertificateSection.appendChild(listedCoursesText)

    softwareCourses.innerHTML = `<span class="completed">${courses[0]}</span>
    <span class="completed">${courses[1]}</span>
    <span class="completed">${courses[2]}</span>
    <span>${courses[3]}</span>
    <span class="completed">${courses[4]}</span>
    <span>${courses[5]}</span>`;
};

softwareDisplayAll()

allBtn.addEventListener("click", () => {
    listedCoursesText.textContent = `The total number of courses listed is ${courses.length * 2}`;

    softwareDisplayAll();
});

cseCoursesBtn.addEventListener("click", () => {

    listedCoursesText.textContent = `The total number of courses listed is ${CSE_courses.length * 2}`;

    softwareCourses.innerHTML = `<span class="completed">${courses[0]}</span>
        <span class="completed">${courses[2]}</span>
        <span>${courses[3]}</span>`;
});

wddCoursesBtn.addEventListener("click", () => {

    listedCoursesText.textContent = `The total number of courses listed is ${WDD_courses.length * 2}`;

    softwareCourses.innerHTML = `<span class="completed">${courses[1]}</span>
        <span class="completed">${courses[4]}</span>
        <span>${courses[5]}</span>`;
});

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