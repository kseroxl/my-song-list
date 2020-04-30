class Song {
  constructor(title, singer, isbn) {
    this.title = title;
    this.singer = singer;
    this.isbn = isbn;
  }
}

class UI {
  static displayList() {
    let songs = JSON.parse(localStorage.getItem("songs"));
    if (songs) {
      songs.forEach((song) => {
        UI.addSong(song);
      });
    }
  }

  static addSong(song) {
    const tbody = document.querySelector("table").querySelector("tbody");

    const newSong = document.createElement("tr");
    newSong.innerHTML = `<td>${song.title}</td>
      <td>${song.singer}</td>
      <td>${song.isbn}</td>
      <span style="cursor:pointer" class="badge badge-danger p-2 m-2" id=${song.isbn}>&times;</span>`;

    tbody.appendChild(newSong);
  }

  static clearFields() {
    const title = (document.querySelector("#title").value = "");
    const singer = (document.querySelector("#singer").value = "");
    const isbn = (document.querySelector("#isbn").value = "");
  }

  static removeSong(song) {
    if (song.classList.contains("badge")) {
      song.parentElement.remove();
      Store.removeSong(song.getAttribute("id"));
      UI.showAlert("Song was deleted successfully", "success");
    }
  }
  static showAlert(message, type) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} mt-4 mb-4`;
    alert.innerText = message;
    const form = document.querySelector(".form");
    const container = document.querySelector(".container");
    container.insertBefore(alert, form);
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

class Store {
  static addSong(song) {
    let songs = JSON.parse(localStorage.getItem("songs"));
    if (songs === null) {
      songs = [];
    }
    songs.push(song);
    localStorage.setItem("songs", JSON.stringify(songs));
    setTimeout(() => {
      console.log(JSON.parse(localStorage.getItem("songs")));
    }, 1000);
  }

  static removeSong(song) {
    let songs = JSON.parse(localStorage.getItem("songs"));
    songs = songs.filter((el) => el.isbn !== song);
    localStorage.setItem("songs", JSON.stringify(songs));
  }
}

const submit = document.querySelector("button");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const singer = document.querySelector("#singer").value;
  const isbn = document.querySelector("#isbn").value;

  if (title === "" || singer === "" || isbn === "") {
    UI.showAlert("Please fill in all the fields", "danger");
  } else {
    const song = new Song(title, singer, isbn);
    Store.addSong(song);
    UI.addSong(song);
    UI.showAlert("Song was added successfully", "success");
    UI.clearFields();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  UI.displayList();
  let songs = JSON.parse(localStorage.getItem("songs"));
  console.log(songs);
});

document
  .querySelector("table")
  .querySelector("tbody")
  .addEventListener("click", (e) => {
    UI.removeSong(e.target);
  });
