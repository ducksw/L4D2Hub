import { players } from "../models/player.js";

function calculatePorcent(key, low = false) {
  const MAX_ELO = 20000;
  const BASE_ELO = 300;

  const MAX_VALUES = {
    elo: MAX_ELO,
    points: 100000,
    damage: 200000,
    kills: 10000,
    win: 10000,
    losser: 10000,
    draw: 10000,
  };

  if (!players || players.length === 0) return "0.00";

  const sortedPlayers = [...players].sort((a, b) =>
    low ? a[key] - b[key] : b[key] - a[key]
  );

  const topPlayer = sortedPlayers[0];
  const value = Number(topPlayer[key]) || 0;

  if (key === "elo") {
    const percentage = ((Math.max(value - BASE_ELO, 0)) / (MAX_ELO - BASE_ELO)) * 100;
    return percentage.toFixed(2);
  }

  const maxValue = MAX_VALUES[key];
  if (typeof maxValue === "number" && maxValue > 0) {
    return ((value / maxValue) * 100).toFixed(2);
  }

  return "0.00";
}

function selectListPlayer() {
  const player = players;

  let res = document.getElementById('res')
  let ret = `
    <select id="select" class="form-select" aria-label="Default select example">
      <option value="0">Select Players</option>
  `;

  for (const p of player) {
    ret += `
      <option value="${p.displayName}">${p.displayName}</option>
    `
  }

  ret += `</select>`

  res.innerHTML += ret;

  let select = document.getElementById('select');

  select.addEventListener('click', function(e) {
    const selectValue = this.value;

    for (const pl of player) {
      if (selectValue === pl.displayName) {
        window.location.href = `player.html?id=${pl.steamId}`;
        break;
      }
    }
  });
}

function renderPlayerDetails(player, key, subTitle, porcentTitle, porcent, containerId) {
  const container = document.getElementById(containerId);
  let playerTitle = document.getElementById('playerTitle');

  playerTitle.innerHTML = `<span class="text-warning">${player.displayName}</span>`

  if (!player) {
    container.innerHTML += "<p>Jugador no encontrado</p>";
    return;
  }

  let ret = `
    <title>Player : ${player.displayName}</title>
    
    <div class="d-flex justify-content-between align-items-center text-light p-1">
      <div class="d-flex flex-column gap-2" style="width: 10%;">
        <span class="text-danger">#</span>
        <b class="text-warning">${subTitle}</b>
      </div>

      <div class="d-flex flex-column gap-2" style="width: 30%;">
        <span class="text-secondary">Player</span>
        <div class="d-flex align-items-center gap-2">
          <a href="${player.profileurl}">
            <img src="${player.avatar}" class="image-ranking rounded">
          </a>
          <span>${player.displayName}</span>
        </div>
      </div>

      <div class="d-flex flex-column gap-2" style="width: 15%;">
        <span class="text-danger">${subTitle}</span>
        <b>${player[key]}</b>
      </div>

      <div class="d-flex flex-column gap-2" style="width: 15%;">
        <span class="text-secondary">${porcentTitle}</span>
        <span>${porcent}</span>
      </div>

      <div class="d-flex flex-column gap-2" style="width: 15%;">
        <span class="text-secondary">Rounds Played</span>
        <span>${player.match}</span>
      </div>
    </div>
  `;

  container.innerHTML = ret;
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const player = players.find(p => p.steamId === id);
  const containerId = 'player-details';

  if (!player) {
    document.getElementById(containerId).innerHTML = "<p>Jugador no encontrado</p>";
    return;
  }

  renderPlayerDetails(player, 'elo', 'Elo', 'Elo / e', calculatePorcent('elo'), 'res-elo');
  renderPlayerDetails(player, 'damage', 'Damage', 'Damage / d', calculatePorcent('damage'), 'res-damage');
  renderPlayerDetails(player, 'kills', 'Kills', 'Kills / k', calculatePorcent('kills'), 'res-kill');
  renderPlayerDetails(player, 'win', 'Wins', 'Wins / w', calculatePorcent('win'), 'res-win');
  renderPlayerDetails(player, 'losser', 'Loser', 'Loser / l', calculatePorcent('losser'), 'res-loser');
  renderPlayerDetails(player, 'draw', 'Draw', 'Draw / d', calculatePorcent('draw'), 'res-draw');

  selectListPlayer();
});