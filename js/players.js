import { API_URL } from "./config.js";

const list_players = document.getElementById("list_players");
const input_player = document.getElementById("input_player");

async function playerList(array) {
	let ret = "";
	for (const key of array) {
		ret += `
			<div class="d-flex align-items-center gap-2 justify-content-between">
				<div class="d-flex gap-2 align-items-center">
					<img src="${key.avatar}" class="rounded" style="max-width: 100%; width: 40px; height: 40px;">
					<span class="text-light fw-bold">${key.displayName}</span>
				</div>

				<div class="d-flex align-items-center gap-2">
					<b class="text-danger">|</b>
					<div class="d-flex gap-2">
						<a href="profile.html?steamid=${key.steamId}" target="_blank" class="bg bg-dark rounded p-1"><img src="../image/user.svg"></a>
						<a href="${key.profileurl}" target="_blank" class="bg bg-dark rounded p-1"><img src="../image/steamIcon.svg"></a>
					</div>
				</div>
			</div>
		`;
	}

	list_players.innerHTML = ret;
}

async function init() {
	const response = await fetch(API_URL + "/players");
	const players = await response.json();

	playerList(players);
}

window.onload = init;
