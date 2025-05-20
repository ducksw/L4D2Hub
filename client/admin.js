import { players } from '../models/player.js'

function enableDamageEdit(playerEl) {
  let damageSpan = playerEl.querySelector('.damage');

  if (playerEl.querySelector('.add-damage')) return;

  let input = document.createElement("input");
  input.type = "number";
  input.min = 0;
  input.placeholder = "Agregar daño";
  input.className = "add-damage";
  input.style.marginLeft = "10px";

  let btn = document.createElement("button");
  btn.textContent = "➕";
  btn.style.marginLeft = "5px";

  btn.addEventListener("click", () => {
    let current = parseInt(damageSpan.textContent);
    let added = parseInt(input.value);
    if (!isNaN(added)) {
      let total = current + added;
      damageSpan.textContent = total;
      input.value = "";
    }
  });

  damageSpan.parentNode.appendChild(input);
  damageSpan.parentNode.appendChild(btn);
}


addEventListener("DOMContentLoaded", (event) => {
  let list = document.getElementById('player-list');
  let ret = "<h1>Players</h1><br/>"

  for (let player of players) {
    ret += `<div class="pl" draggable="true">
    <img src="${player.avatar}">
      ${player.name} [💥<span class="damage">${player.damage}</span>]
    </div>`;
  }

  list.innerHTML = ret;

  let pl = document.querySelectorAll('#player-list .pl');
  let box = document.getElementById('box');
  let box2 = document.getElementById('box2');

  for (let i = 0; i < pl.length; i++) {
    pl[i].setAttribute("id", "players" + i);
    pl[i].setAttribute("draggable", "true");
    pl[i].addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("player", event.target.id);
    });
  }

  box.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  box.addEventListener("drop", (event) => {
  event.preventDefault();
    if (event.target.id === "box") {
      let data = event.dataTransfer.getData('player');
      let playerEl = document.getElementById(data);
      event.target.appendChild(playerEl);

      let playerName = playerEl.textContent.trim();
      let li = document.createElement("li");
      li.innerText = playerName;
      document.getElementById("player-log").appendChild(li);

      enableDamageEdit(playerEl);
    }
  });

  box2.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  box2.addEventListener("drop", (event) => {
  event.preventDefault();
    if (event.target.id === "box2") {
      let data = event.dataTransfer.getData('player');
      let playerEl = document.getElementById(data);
      event.target.appendChild(playerEl);

      let playerName = playerEl.textContent.trim();
      let li = document.createElement("li");
      li.innerText = playerName;
      document.getElementById("player-log2").appendChild(li);

      enableDamageEdit(playerEl);
    }
  });

  list.addEventListener("dragover", (event) => {
    event.preventDefault();
  });


  list.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.id === "player-list") {
      let data = event.dataTransfer.getData('player');
      event.target.appendChild(document.getElementById(data));
    }
  });

});

// prevenir a que se recargue la pagina
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
