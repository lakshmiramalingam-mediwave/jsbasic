let movielist = [
  {
    id: "1",
    title: "purple heart",
    categories: "English",
  },
  {
    id: "2",
    title: "FRIDAY Night PLAN",

    categories: "HINDI",
  },
  {
    id: "3",
    title: " VISIRI",

    categories: "TAMIL",
  },
  {
    id: "4",
    title: " WEDDING SEASON",

    categories: "HINDI",
  },
  {
    id: "5",
    title: " THROUGH MY WINDOW",

    categories: "ENGLISH",
  },
  {
    id: "6",
    title: " Sitha raman",

    categories: "TAMIL",
  },
  {
    id: "7",
    title: "THRISHANKUL",

    categories: "MALAYALAM",
  },
  {
    id: "8",
    title: "VARANE AVASHYMUND",

    categories: "MALAYALAM",
  },
  {
    id: "9",
    title: "raataan LAMBIYAN",

    categories: "HINDI",
  },git push -u origin main
  {
    id: "11",
    title: " THE KISSING BOOTH",

    categories: "ENGLISH",
  },
  {
    id: "12",
    title: "ELEPHANT WHISPER",

    categories: "TAMIL ",
  },
];
function makemoviediv(movie) {
  //outer div
  const div = document.createElement("div");
  div.setAttribute("class", "movie-card");
  // ID
  const id = `movie-${movie["id"]}`;
  div.setAttribute("id", id);

  // title
  const h2 = document.createElement("h2");
  h2.innerText = movie["title"];
  // categories
  const h3 = document.createElement("h3");
  h3.innerText = movie["categories"];
  //BUTTON
  const button = document.createElement("button");
  button.innerText = "delete";
  button.addEventListener("click", function () {
    div.remove();
  });

  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(button);

  return div;
}
// append child
function appendtoappwrap(m) {
  const app = document.querySelector("#appwrap");
  app.appendChild(m);
}
// loop 
for (let i = 0; i < movielist.length; i++) {
  let moviediv = makemoviediv(movielist[i]);
  appendtoappwrap(moviediv);
}
