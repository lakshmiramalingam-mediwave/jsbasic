// let movielist = [
//   {
//     id: "1",
//     title: "purple heart",
//     categories: "English",
//   },
//   {
//     id: "2",
//     title: "FRIDAY Night PLAN",

//     categories: "HINDI",
//   },
//   {
//     id: "3",
//     title: " VISIRI",

//     categories: "TAMIL",
//   },
//   {
//     id: "4",
//     title: " WEDDING SEASON",

//     categories: "HINDI",
//   },
//   {
//     id: "5",
//     title: " THROUGH MY WINDOW",

//     categories: "ENGLISH",
//   },
//   {
//     id: "6",
//     title: " Sitha raman",

//     categories: "TAMIL",
//   },
//   {
//     id: "7",
//     title: "THRISHANKUL",

//     categories: "MALAYALAM",
//   },
//   {
//     id: "8",
//     title: "VARANE AVASHYMUND",

//     categories: "MALAYALAM",
//   },
//   {
//     id: "9",
//     title: "raataan LAMBIYAN",

//     categories: "HINDI",
//   },
//   {
//     id: "11",
//     title: " THE KISSING BOOTH",

//     categories: "ENGLISH",
//   },
//   {
//     id: "12",
//     title: "ELEPHANT WHISPER",

//     categories: "TAMIL ",
//   },
//   {
//     id: "13",
//     title: "3",

//     categories: "TAMIL ",
//   },
// ];
let favMovies = [];

function makeMovieDiv(movie) {
  if (movie.isEdit) {
    const div = document.createElement("div");
    div.setAttribute("class", "movie-card");

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", `edit-${movie.id}-name`);
    nameInput.setAttribute("placeholder", "Enter movie name");
    nameInput.setAttribute("id", `edit-${movie.id}-name`);
    nameInput.setAttribute("value", movie.title);

    const yearInput = document.createElement("input");
    yearInput.setAttribute("type", "number");
    yearInput.setAttribute("name", `edit-${movie.id}-year`);
    yearInput.setAttribute("placeholder", "Enter movie year");
    yearInput.setAttribute("id", `edit-${movie.id}-year`);
    yearInput.setAttribute("value", movie.releaseDate);

    const button = document.createElement("button");
    button.innerText = "Update movie";

    button.addEventListener("click", function () {
      const newTitle = document.querySelector(`#edit-${movie.id}-name`).value;
      const newYear = document.querySelector(`#edit-${movie.id}-year`).value;
      if (!newTitle || !newYear) {
        alert("Enter all fields");
      } else {
        if (newYear > new Date().getFullYear()) {
          alert("enter correct year");
        } else if (newYear < 1895) {
          alert("enter correct year");
        } else {
          const toUpdateIndex = favMovies.findIndex((m) => m.id == movie.id);
          if (toUpdateIndex != -1) {
            favMovies[toUpdateIndex]["title"] = newTitle;
            favMovies[toUpdateIndex]["releaseDate"] = newYear;
            favMovies[toUpdateIndex]["isEdit"] = false;
            updateMovieListUI();
            saveToLocalStorage();
          }
        }
      }
    });

    div.appendChild(nameInput);
    div.appendChild(yearInput);
    div.appendChild(button);

    return div;
  } else {
    // show card
    // outer div
    const div = document.createElement("div");
    div.setAttribute("class", "movie-card");

    const id = `movie-${movie["id"]}`;
    div.setAttribute("id", id);

    // title
    const h2 = document.createElement("h2");
    h2.innerText = movie["title"];

    const h3 = document.createElement("h3");
    h3.innerText = movie["releaseDate"];

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", function () {
      removeMovie(movie["id"]);
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "Update";
    editBtn.addEventListener("click", function () {
      editMovie(movie["id"]);
    });

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);

    return div;
  }
}

function removeMovie(movieId) {
  console.log("Deleting ", movieId);

  const filteredArray = favMovies.filter((movie) => movie.id != movieId);
  favMovies = filteredArray;
  updateMovieListUI();
  saveToLocalStorage();
}

function editMovie(movieId) {
  console.log("Editing ", movieId);
  const toEditIndex = favMovies.findIndex((movie) => movie.id == movieId);
  if (toEditIndex != -1) {
    favMovies[toEditIndex]["isEdit"] = true;
    updateMovieListUI();
  }
}

function addMovie(movie) {
  favMovies.push(movie);
  updateMovieListUI();
  saveToLocalStorage();
}

function appendToApp(movieDiv) {
  const app = document.querySelector("#app");
  app.appendChild(movieDiv);
}

function clearApp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}

function updateMovieListUI() {
  clearApp();
  for (let i = 0; i < favMovies.length; i++) {
    const movieDiv = makeMovieDiv(favMovies[i]);
    appendToApp(movieDiv);
  }
}

function hookForm() {
  const form = document.querySelector("#add-movie-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#movie-name").value;
    const year = document.querySelector("#movie-year").value;
    if (year <= 2023 && year >= 1500) {
      const movie = {
        id: new Date().getTime(),
        title: name,
        releaseDate: year,
        isEdit: false,
      };
      addMovie(movie);
    } else {
      alert("not valid movie year");
    }
  });
}

function saveToLocalStorage() {
  const str = JSON.stringify(favMovies);
  localStorage.setItem("my-movie-list", str);
}

function getFromLocalStorage() {
  const str = localStorage.getItem("my-movie-list");
  if (!str) {
    favMovies = [];
  } else {
    favMovies = JSON.parse(str);
  }
}

getFromLocalStorage();
updateMovieListUI();
hookForm();
