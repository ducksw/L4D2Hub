import { API_URL } from "./config.js";

function calculatePorcent(players, key, value) {
  if (!players || players.length === 0) return "0.00";

  const MAX_ELO = 20000;
  const BASE_ELO = 300;

  const MAX_VALUES = {
    elo: MAX_ELO,
    points: 1000,
    damage: 200000,
    kills: 10000,
    win: 10000,
    losser: 10000,
    draw: 10000,
  };

  if (key === "elo") {
    return (
      ((Math.max(value - BASE_ELO, 0)) /
        (MAX_ELO - BASE_ELO)) *
      100
    ).toFixed(2);
  }

  const max = MAX_VALUES[key] || 1;

  return ((value / max) * 100).toFixed(2);
}

async function selectListPlayer(players) {
  const player = [...players];

  player.sort((a, b) => b.elo - a.elo);

  const res = document.getElementById("res");

  let ret = `
    <select id="select" class="d-flex form-select bg bg-dark border-0 text-light">
      <option value="0">Select Players</option>
  `;

  for (const p of player) {
    ret += `
      <option value="${p.displayName}">
        ${p.displayName}
      </option>
    `;
  }

  ret += `</select>`;

  res.innerHTML += ret;

  const select = document.getElementById("select");

  select.addEventListener("change", function () {
    const selectValue = this.value;

    const player = players.find(
      p => p.displayName === selectValue
    );

    if (player) {
      window.location = `player.html?steamid=${player.steamId}`;
    }
  });
}

async function renderPlayerDetails(
  player,
  key,
  subTitle,
  porcentTitle,
  porcent,
  containerId
) {
  const container = document.getElementById(containerId);

  if (!player) {
    container.innerHTML = "<p>Jugador no encontrado</p>";
    return;
  }

  const playerTitle = document.getElementById("playerTitle");
  const playerTitle2 = document.getElementById("playerTitle2");

  if (playerTitle) {
    playerTitle.innerHTML = `
            <span class="text-warning">
                ${player.displayName}
            </span>
        `;
  }

  if (playerTitle2) {
    playerTitle2.innerHTML = `
            <span class="text-warning">
                ${player.displayName}
            </span>
        `;
  }

  const value = player[key];

  let ret = `
        <div class="d-flex justify-content-between align-items-center text-light p-1">

            <div class="d-flex flex-column gap-2" style="width: 10%;">
                <span class="text-danger">#</span>
                <b class="text-warning">${subTitle}</b>
            </div>

            <div class="d-flex flex-column gap-2" style="width: 30%;">
                <span class="text-secondary">Player</span>

                <div class="d-flex align-items-center gap-2">
                    <a href="${player.profileurl}" target="_blank">
                        <img 
                            src="${player.avatar}" 
                            class="image-ranking rounded"
                            style="max-width: 100%;"
                        >
                    </a>

                    <span>${player.displayName}</span>
                </div>
            </div>

            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-danger fw-bold">${subTitle}</span>
                <b>${value}</b>
            </div>

            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-secondary fw-bold">${porcentTitle}</span>
                <span>${porcent}%</span>
            </div>

            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-secondary fw-bold">Rounds Played</span>
                <span>${player.match}</span>
            </div>

        </div>
    `;

  container.innerHTML = ret;
}

function capture() {
  const div = document.getElementById("main");
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
      link.download = `stats_${date}.png`;

      link.click();
    });
  }, 500);
}

document
  .getElementById("download-stats")
  .addEventListener("click", function (e) {
    e.preventDefault();
    capture();
  });

async function viewProfile(players) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("steamid");

  const linkProfile = document.getElementById("link-profile");

  const player = players.find(
    p => p.steamId === id
  );

  if (player && linkProfile) {
    linkProfile.innerHTML = `
      <a href="profile.html?steamid=${player.steamId}" class="link-info text-decoration-none link_hover">Profile</a>
    `;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(API_URL + "/players");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const players = await response.json();
    const params = new URLSearchParams(window.location.search);

    const id = params.get("steamid");

    const player = players.find(
      p => p.steamId === id
    );

    title.textContent = "Stats of " + player.displayName; // title html

    const containerId = "player-details";

    if (!player) {
      document.getElementById(containerId).innerHTML =
        "<p>Jugador no encontrado</p>";

      return;
    }

    renderPlayerDetails(
      player,
      "elo",
      "Elo",
      "Elo / e",
      calculatePorcent(players, "elo", player.elo),
      "res-elo"
    );

    renderPlayerDetails(
      player,
      "damage",
      "Damage",
      "Damage / d",
      calculatePorcent(players, "damage", player.damage),
      "res-damage"
    );

    renderPlayerDetails(
      player,
      "kills",
      "Kills",
      "Kills / k",
      calculatePorcent(players, "kills", player.kills),
      "res-kill"
    );

    renderPlayerDetails(
      player,
      "win",
      "Wins",
      "Wins / w",
      calculatePorcent(players, "win", player.win),
      "res-win"
    );

    renderPlayerDetails(
      player,
      "losser",
      "Loser",
      "Loser / l",
      calculatePorcent(players, "losser", player.losser),
      "res-loser"
    );

    renderPlayerDetails(
      player,
      "draw",
      "Draw",
      "Draw / d",
      calculatePorcent(players, "draw", player.draw),
      "res-draw"
    );

    renderPlayerDetails(
      player,
      "points",
      "Points",
      "Points / p",
      calculatePorcent(players, "points", player.points),
      "res-point"
    );

    renderPlayerDetails(player, "lastMatches", "Last Matches", "LastMatches / l", calculatePorcent(players, "draw", player.lastMatches.length), "res-matches");

    selectListPlayer(players);
    viewProfile(players);

  } catch (error) {
    console.error("Error cargando jugadores:", error);
  }
});
