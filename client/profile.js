import { API_URL } from "./config.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("steamid");

const pf = document.getElementById("profile");
const stat = document.getElementById("stat");

function calculateWinRate(profile) {

  const wins = Number(profile.win) || 0;
  const losses = Number(profile.losser) || 0;
  const draws = Number(profile.draw) || 0;

  const total = wins + losses + draws;
  console.log("total", total);

  if (total === 0) {
    return "0%";
  }

  return ((wins / total) * 100).toFixed(1) + "%";
}

async function profile(player, match) {
  let ac = "";
  let ret = "";

  if (player.active) {
    ac = `<span class="online fw-bold">Online</span>`;
  } else {
    ac = `<span class="offline fw-bold">Offline</span>`;
  }

  ret += `
    <div class="d-flex justify-content-between align-items-center p-2">
      <div class="d-flex position-relative me-3 gap-3 align-items-center">
      <div class="border rounded border-secondary" style=" position: absolute; width: 133px; height: 133px; transform: rotate(3deg);"></div>
        <img src="${player.avatar}" class="rounded" style=" position: relative; width: 130px; object-fit: cover;">

        <span class="position-absolute translate-middle" style="left: 130px; top: 15px;">
          <img src="image/rank_${player.rank.toLowerCase()}.svg" class="image_rank" style="width: 50px; height: 50px;">
        </span>
        <div class="d-flex flex-column justify-content-center">
          <span class="text-light fs-2 fw-bold" style="white-space: normal;word-break: break-word;">${player.displayName}</span>
          <span class="text-secondary small">${player.steamId}</span>
        </div>
      </div>
      
      <div class="d-flex align-items-start gap-3">
        <div class="d-flex justify-content-center align-items-center card_elo flex-column">
          <div class="fw-bold text-light border-bottom border-dark w-100 pb-1">ELO</div>
          <div class="text-secondary d-flex align-items-center justify-content-center mt-2 w-100 bg-osi p-1 rounded">
            (<span class="text-danger">${player.elo}</span>)
          </div>
        </div>

        <div class="d-flex justify-content-center align-items-center card_steam flex-column">
          <div class="fw-bold text-light border-bottom border-dark w-100 pb-1">STEAM</div>
          <a href="${player.profileurl}" class="d-flex gap-2 text-light text-decoration-none d-flex align-items-center justify-content-center mt-2 w-100 bg-osi p-1 rounded steam_link">
            <img src="../image/steam_icon.svg"> Profile
          </a>
        </div>

        <div class="d-flex justify-content-center align-items-center card_status flex-column">
          <div class="fw-bold text-light border-bottom border-dark w-100 pb-1">STATUS</div>
          <div class="text-secondary d-flex align-items-center justify-content-center mt-2 w-100 bg-osi p-1 rounded">
            <span>${ac}</span>
          </div>
        </div>

      </div>
    </div>
  `

  pf.innerHTML = ret;

  stat.innerHTML = `
    <div class="d-flex flex-column p-3">
      <nav class="d-flex gap-2 mb-3">
        <button class="nav_link active text-light d-flex align-items-center gap-2 border-0" data-target="stats">
          <span class="circle_red"></span> Competitive Stats
        </button>
        <button class="nav_link text-light d-flex align-items-center gap-2  border-0" data-target="badges">
          <span class="circle_red"></span> League Badges
        </button>
        <button class="nav_link text-light d-flex align-items-center gap-2 border-0" data-target="matches">
          <span class="circle_red"></span> Matches
        </button>
      </nav>

      <!-- Contenedores de contenido -->
      <div id="stats" class="tab-content mt-3">
        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <!-- POINTS -->
          <div class="box_stat">
            <div class="stat_title">Liga Points</div>
            <div class="stat_value">${player.points ?? 0}</div>
            <div class="stat_description">TOTAL</div>
          </div>

          <!-- ELO -->
          <div class="box_stat">
            <div class="stat_title">ELO Rating</div>
            <div class="stat_value">${player.elo ?? 300}</div>
            <div class="stat_description">RATING</div>
          </div>

          <!-- RANK -->
          <div class="box_stat">
            <div class="stat_title">Rank</div>
            <div class="stat_value">${player.rank ?? "Bronze"}</div>
            <div class="stat_description">CURRENT RANK</div>
          </div>

          <!-- GAMES -->
          <div class="box_stat">
            <div class="stat_title">Games Played</div>
            <div class="stat_value">${player.match ?? 0}</div>
            <div class="stat_description">TOTAL</div>
          </div>

          <!-- DAMAGE -->
          <div class="box_stat">
            <div class="stat_title">Damage</div>
            <div class="stat_value">${player.damage ?? 0}</div>
            <div class="stat_description">TOTAL DAMAGE</div>
          </div>

          <!-- KILLS -->
          <div class="box_stat">
            <div class="stat_title">Instant Kills</div>
            <div class="stat_value">${player.kills ?? 0}</div>
            <div class="stat_description">TOTAL INSTANT KILLS</div>
          </div>

          <!-- WINS -->
          <div class="box_stat">
            <div class="stat_title">Wins</div>
            <div class="stat_value">${player.win ?? 0}</div>
            <div class="stat_description">MATCHES WON</div>
          </div>

          <!-- LOSSES -->
          <div class="box_stat">
            <div class="stat_title">Losses</div>
            <div class="stat_value">${player.losser ?? 0}</div>
            <div class="stat_description">MATCHES LOST</div>
          </div>

          <!-- DRAWS -->
          <div class="box_stat">
            <div class="stat_title">Draws</div>
            <div class="stat_value">${player.draw ?? 0}</div>
            <div class="stat_description">MATCHES DRAWN</div>
          </div>

          <!-- WIN RATE -->
          <div class="box_stat">
            <div class="stat_title">Win Rate</div>
            <div class="stat_value">
              ${calculateWinRate(player)}
            </div>
            <div class="stat_description">WIN PERCENTAGE</div>
          </div>

          <!-- LAST MATCH -->
          <div class="box_stat">
            <div class="stat_title">Last Match</div>
            <div class="stat_value">
              ${player.lastMatches?.[0] ?? "N"}
            </div>
            <div class="stat_description">LATEST RESULT</div>
          </div>

          <!-- ACTIVE -->
          <div class="box_stat">
            <div class="stat_title">Status</div>
            <div class="stat_value">
              ${player.active ? "Active" : "Inactive"}
            </div>
            <div class="stat_description">PLAYER STATUS</div>
          </div>
        </div>
      </div>

      <div id="badges" class="tab-content mt-3 d-none">
        <p class="text-light">No tienes <b class="text-danger">badges</b> ganados.</p>
      </div>

      <div id="matches" class="tab-content d-none mt-3">
        <div id="box_match"></div>
      </div>
    </div>
  `;

  const box_match = document.getElementById("box_match");

  const matchesFound = match.filter(match =>
		match.survivors.players.some(s => s.steamId === id) ||
		match.infecteds.players.some(i => i.steamId === id)
	);

  if (!matchesFound.length) {
		box_match.innerHTML = `<span class="text-secondary">No hay partidas.</span>`;
		return;
	}

  for (const m of matchesFound.reverse()) {
    const allPlayersInMatch = [...m.survivors.players, ...m.infecteds.players];

    for (const p of allPlayersInMatch) {
      if (p.steamId === player.steamId) {
        console.log(m);
        break;
      }
    }
  }

  stat.querySelectorAll('.nav_link').forEach(button => {
    button.addEventListener('click', (e) => {
      const targetId = e.currentTarget.getAttribute('data-target');

      stat.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('d-none');
      });

      stat.querySelector(`#${targetId}`).classList.remove('d-none');

      stat.querySelectorAll('.nav_link').forEach(btn => btn.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });
}

async function init() {
  const response = await fetch(API_URL + "/players?steamid="+id)
  const response_match = await fetch(API_URL + "/match");

  const player = await response.json();
  const match = await response_match.json();

  console.log(match);

  profile(player, match)

  title.textContent = "Profile - " + player.displayName; // title html
}

window.onload = init;
