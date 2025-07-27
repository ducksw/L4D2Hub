import { players } from '../models/player.js';

/*
 * GOAT
 * BEST
 * BUENO
 * F2
 * F1
 */

addEventListener("DOMContentLoaded", () => {
  let list_player = document.getElementById('list-player');
  var ret = "";

  for (const pl of players) {
    ret += `
      <figure class="d-flex" title="${pl.displayName}">
        <img src="${pl.avatar}" class="pl" draggable="true" style="width: 70px; cursor: pointer">
      </figure>
      `
  }
  
  list_player.innerHTML = ret;

  let player = document.querySelectorAll('#list-player .pl');
  let list_goat = document.getElementById('list-goat');
  let list_best = document.getElementById('list-best');
  let list_bueno = document.getElementById('list-bueno');
  let list_f2 = document.getElementById('list-f2');
  let list_f1 = document.getElementById('list-f1');

  for (let i = 0; i < player.length; i++) {
    player[i].setAttribute("id", "players" + i);
    player[i].setAttribute("draggable", "true");
    player[i].addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("pl", event.target.id);
      console.log(event.target.id);
    });
  }

  list_goat.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  list_best.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  list_bueno.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  list_f2.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  list_f1.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  list_player.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  list_goat.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.id === "list-goat") {
      let data = event.dataTransfer.getData('pl');
      console.log("data", data);
      let playerEl = document.getElementById(data);
      event.target.appendChild(playerEl);
    }
  });

  list_best.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.id === "list-best") {
      let data = event.dataTransfer.getData('pl');
      console.log("data", data);
      let playerEl = document.getElementById(data);
      event.target.appendChild(playerEl);
    }
  });

  list_bueno.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.id === "list-bueno") {
      let data = event.dataTransfer.getData('pl');
      console.log("data", data);
      let playerEl = document.getElementById(data);
      event.target.appendChild(playerEl);
    }
  });

  list_f2.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.id === "list-f2") {
      let data = event.dataTransfer.getData('pl');
      console.log("data", data);
      let playerEl = document.getElementById(data);
      event.target.appendChild(playerEl);
    }
  });

  list_f1.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.id === "list-f1") {
      let data = event.dataTransfer.getData('pl');
      console.log("data", data);
      let playerEl = document.getElementById(data);
      event.target.appendChild(playerEl);
    }
  });

  list_player.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.id === "list-player") {
      let data = event.dataTransfer.getData('pl');
      console.log("data", data);
      let playerEl = document.getElementById(data);
      event.target.appendChild(playerEl);
    }
  });

});

function capture() {
  const div = document.getElementById("tierlist");
  const date = new Date().toISOString().slice(0, 10);

  setTimeout(() => {
    html2canvas(div, {
      useCORS: true,
      allowTaint: false,
      scale: 2
    }).then(canvas => {
      const imgURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgURL;
      link.download = `tierlist_${date}.png`
      link.click();
    });
  }, 500)
}

document.getElementById("download").addEventListener('click', function (e) {
  e.preventDefault();
  capture();
});


