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

const searchInput = document.getElementById('search');
const cardsContainer = document.querySelector('.cards-container');

let exercises = [];

async function getExercisesData()
{
    try{
        const response = await fetch('data/exercises.json');

        const data = await response.json();

        exercises = data.exercises;
        renderCards(exercises);
    }
    catch(error){
        console.log("Failed to load exercises: ", error);
    }
}

getExercisesData();

// Build a card for one exercise
function createCard(exercise) {
  const card = document.createElement('article');
  card.className = 'exercise-card';

  const muscles = Array.isArray(exercise.primaryMuscleGroup)
    ? exercise.primaryMuscleGroup.join(', ')
    : exercise.primaryMuscleGroup;

  card.innerHTML = `
    <img src="${exercise.thumbnail}" alt="${exercise.alt}" loading="lazy">
    <h3>${exercise.name}</h3>
    <p>${muscles}</p>
    <p>${exercise.movementType}</p>
    <p>${exercise.defaultSets} sets &times; ${exercise.defaultReps}</p>
    <button class="add-btn" type="button">+ Add to Routine</button>
  `;

    card.querySelector('.add-btn').addEventListener('click', () => addToRoutine(exercise));

  return card;
}

// Render a list of exercises into the container
function renderCards(list) {
  cardsContainer.innerHTML = '';

  if (list.length === 0) {
    cardsContainer.innerHTML = '<p class="no-results">No exercises found.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();
  list.forEach(exercise => fragment.appendChild(createCard(exercise)));
  cardsContainer.appendChild(fragment);
}

// Filter exercises as the user types
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = exercises.filter(exercise => {
    const muscles = Array.isArray(exercise.primaryMuscleGroup)
      ? exercise.primaryMuscleGroup.join(' ').toLowerCase()
      : exercise.primaryMuscleGroup.toLowerCase();

    return (
      exercise.name.toLowerCase().includes(query) ||
      muscles.includes(query) ||
      exercise.movementType.toLowerCase().includes(query)
    );
  });

  renderCards(filtered);
});

let routine = [];

function addToRoutine(exercise) {
  routine.push({ ...exercise }); // copy so edits don't touch the original data
  renderRoutine();
}

function removeFromRoutine(index) {
  routine.splice(index, 1);
  renderRoutine();
}


function renderRoutine() {
  const list = document.getElementById('routine-list');
  list.innerHTML = '';

  if (routine.length === 0) {
    list.innerHTML = '<li class="routine-empty">No exercises added yet.</li>';
    return;
  }

  routine.forEach((exercise, index) => {
    const muscle = Array.isArray(exercise.primaryMuscleGroup)
      ? exercise.primaryMuscleGroup[0]
      : exercise.primaryMuscleGroup;

    const li = document.createElement('li');
    li.className = 'routine-item';
    li.innerHTML = `
      <div class="routine-item-info">
        <strong>${exercise.name}</strong>
        <span>${muscle}</span>
      </div>
      <div class="routine-item-actions">
        <button class="delete-btn" aria-label="Remove">&#128465;</button>
      </div>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => removeFromRoutine(index));

    list.appendChild(li);
  });
}

document.getElementById('save-routine-btn').addEventListener('click', () => {
  const nameInput = document.getElementById('routine-name');
  const name = nameInput.value.trim();

  if (!name) {
    alert('Please name your routine before saving.');
    return;
  }
  if (routine.length === 0) {
    alert('Add at least one exercise to your routine.');
    return;
  }

  const saved = JSON.parse(localStorage.getItem('savedRoutines') || '[]');
  saved.push({ name, exercises: routine });
  localStorage.setItem('savedRoutines', JSON.stringify(saved));

  alert(`"${name}" saved!`);
  routine = [];
  nameInput.value = '';
  renderRoutine();
});

renderRoutine();

