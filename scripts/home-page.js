const nav_btn = document.querySelector("#ham-button");
const navigation = document.querySelector("#nav-bar");

nav_btn.addEventListener("click", () => {
    nav_btn.classList.toggle("show");
    navigation.classList.toggle("show");
})

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const CSEcourses = courses.filter(course => course.subject === "CSE");
const WDDcourses = courses.filter(course => course.subject === "WDD");

const allBtn = document.querySelector("#all-btn");
const cseCoursesBtn = document.querySelector("#cse-courses");
const wddCoursesBtn = document.querySelector("#wdd-courses");

const softwareCourses = document.querySelector("#software-courses");
const webCertificateSection = document.querySelector("#Certificates")

const listedCoursesText = document.createElement("p");

let courseCredits = courses.map(course => course.credits);
let total = courseCredits.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

listedCoursesText.textContent = `The total number of courses listed is ${total}`;

function softwareDisplayAll(){
    webCertificateSection.appendChild(listedCoursesText);

    softwareCourses.innerHTML = "";
    courses.forEach(course => {
        const completed = course.completed ? "completed" : "";
        
        softwareCourses.innerHTML += `<button id="course" class="${completed}">${course["subject"]}${course["number"]}</button>`
    });
};

softwareDisplayAll()

allBtn.addEventListener("click", () => {
    courseCredits = courses.map(course => course.credits);
    total = courseCredits.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    listedCoursesText.textContent = `The total number of courses listed is ${total}`;

    softwareDisplayAll();
});

cseCoursesBtn.addEventListener("click", () => {
    courseCredits = CSEcourses.map(course => course.credits)
    total = courseCredits.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    listedCoursesText.textContent = `The total number of courses listed is ${total}`;

    softwareCourses.innerHTML = "";
    CSEcourses.forEach(course => {
        const completed = course.completed ? "completed" : "";
        
        softwareCourses.innerHTML += `<button id="course" class="${completed}">${course["subject"]}${course["number"]}</button>`
    });
});

wddCoursesBtn.addEventListener("click", () => {
    courseCredits = WDDcourses.map(course => course.credits)
    total = courseCredits.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    listedCoursesText.textContent = `The total number of courses listed is ${total}`;

    softwareCourses.innerHTML = "";
    WDDcourses.forEach(course => {
        const completed = course.completed ? "completed" : "";
        
        softwareCourses.innerHTML += `<button id="course" class="${completed}">${course["subject"]}${course["number"]}</button>`
    });
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

const closeButton = document.querySelector("#close-button");
const courseDetails = document.querySelector("#course-details");


function displayCourseDetails(course) {
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}

const buttonCourse = document.querySelector("#course");

courses.forEach(course => {
    
            displayCourseDetails(course);

});