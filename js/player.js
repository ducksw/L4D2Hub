import { players } from "../models/player.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("steamid");

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

	if (key === 'elo') {
		return (((Math.max(value - BASE_ELO, 0)) / (MAX_ELO - BASE_ELO)) * 100).toFixed(2);
	}

	const max = MAX_VALUES[key] || 1;
	return ((value / max) * 100).toFixed(2);
}

async function downloadDataJSON(args, obj) {
	let data, filename, link;
	let json = 'data:text/json;charset=utf-8,' + JSON.stringify(obj);

	filename = args.filename;
	data = encodeURI(json);

	link = document.createElement('a');
	link.setAttribute('href', data);
	link.setAttribute('download', filename);
	link.click();
}

function renderPlayerDetails(player, key, subTitle, porcentTitle, porcent, containerId) {
	const container = document.getElementById(containerId);
	// let playerTitle = document.getElementById('playerTitle');
	// let playerTitle2 = document.getElementById('playerTitle2');

	// playerTitle.innerHTML = `<span class="text-warning">${player.displayName}</span>`
	// playerTitle2.innerHTML = `<span class="text-warning">${player.displayName}</span>`

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
		  <a href="profile.html?steamid=${player.steamId}">
			  <img src="${player.avatar}" class="image-ranking rounded" style="max-width: 100%; width: 25px;">
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
	  <span>${porcent}%</span>
	  </div>

	  <div class="d-flex flex-column gap-2" style="width: 15%;">
	  <span class="text-secondary">Rounds Played</span>
	  <span>${player.match}</span>
	  </div>
	  </div>
  `;

	container.innerHTML = ret;
}

function init() {
	for (const player of players) {
		if (player.steamId === id) {
			renderPlayerDetails(player, 'elo', 'Elo', 'Elo / e', calculatePorcent(player, 'elo', player.elo), 'res-elo');
			renderPlayerDetails(player, 'damage', 'Damage', 'Damage / d', calculatePorcent(player, 'damage', player.damage), 'res-damage');
			renderPlayerDetails(player, 'kills', 'Kills', 'Kills / k', calculatePorcent(player, 'kills', player.kills), 'res-kill');
			renderPlayerDetails(player, 'win', 'Wins', 'Wins / w', calculatePorcent(player, 'win', player.win), 'res-win');
			renderPlayerDetails(player, 'losser', 'Loser', 'Loser / l', calculatePorcent(player, 'losser', player.losser), 'res-loser');
			renderPlayerDetails(player, 'draw', 'Draw', 'Draw / d', calculatePorcent(player, 'draw', player.draw), 'res-draw');

			// LIGA
			renderPlayerDetails(player, 'points', 'Points', 'Poinst / p', calculatePorcent(player, 'points', player.points), 'res-point');
			renderPlayerDetails(player, 'lastMatches', 'Last Matches', 'LastMatches / l', calculatePorcent(player, 'draw', player.lastMatches.length), 'res-matches');

			player_name.innerHTML = player.displayName;
			player_name_liga.innerHTML = player.displayName;

			download_data.onclick = () => downloadDataJSON({ filename: `data_${player.displayName}.json` }, player);

			steam_id.innerHTML = id;
		}
	}

}

window.onload = init;
