import { Players } from "../models/PlayersModels.js";

const box_players = document.getElementById("box_players");

function renderPlayers(players) {
  box_players.innerHTML = ""; // Limpiar contenido previo


  for (const key of players) {
    box_players.innerHTML += `
      <div class="d-flex rounded" style="max-width: 100%; width: 235px; background-color: #111111;">
        <div class="d-flex flex-column rounded w-100">
          <img src="${key.avatar}" class="rounded" style="max-width: 100%; width: 100%;">
          <div class="p-3 d-flex flex-column flex-grow-1" style="min-width: 0;">
            <span class="text-danger fs-6" style="display: block; white-space: normal; word-break: break-word;">${key.displayName}</span>
            <br/><br/>
            <div class="d-flex mt-auto pt-2">
              <a href="#" class="btn w-100 btn-dark select" data-id="${key.steamId}" style="font-size: 13px;">Select</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachButtonEvents();
}

function attachButtonEvents() {
  const select = document.querySelectorAll(".select");

  select.forEach(btn => {
    const steamId = btn.getAttribute("data-id");

    btn.onclick = () => {
      select.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.classList.add("disabled");
          otherBtn.style.pointerEvents = "none";
          otherBtn.style.opacity = "0.5";
        }
      });

      localStorage.setItem("steamid", steamId);
      btn.textContent = "Load info...";

      callback(steamId, () => { 
        btn.textContent = "Sign in...";

        setTimeout(() => {
          location.href = "index.html";
        }, 1000);
      });
    }
  });
}

function callback(steamId, callback) {
  setTimeout(() => {
    callback()
  }, 2000)
} 

async function init() {
  const players = Players;

  renderPlayers(players);
}

window.onload = init;