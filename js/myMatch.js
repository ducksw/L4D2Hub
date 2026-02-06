import { matches } from "../models/matchs.js";
import { players } from "../models/player.js";

const box_matchs = document.getElementById("box_matchs");

const params = new URLSearchParams(window.location.search);
const id = params.get("steamid");

async function viewMatch(array, players) {
	const matchesFound = array.filter(match =>
		match.survivors.players.some(s => s.steamId === id) ||
		match.infecteds.players.some(i => i.steamId === id)
	);

	if (!matchesFound.length) {
		box_matchs.innerHTML = `<span class="text-secondary">No hay partidas.</span>`;
		return;
	}

	if (matchesFound.length > 0) {
		for (const match of matchesFound.reverse()) {
			const matchDiv = document.createElement("div");
			const title = document.createElement("span");
			title.innerHTML = `<span class="text-secondary">[ <span class="text-danger">Survivors</span> ]</span>`;

			matchDiv.classList.add("match");
			//matchDiv.style.background = "rgba(255, 0, 0, 0.1)";
			matchDiv.style.background = "rgba(0, 0, 0, 0.5)";
			matchDiv.style.padding = "10px";
			matchDiv.style.borderRadius = "10px";
			matchDiv.innerHTML = `<h5 class="text-light">Partida ID: <a style="color: orange;" href="match.html?gameid=${match._id}">${match._id}</a> - Fecha: <b class="text-info">${match.date}</b></h5>`;
			matchDiv.appendChild(title);

			for (const surv of match.survivors.players) {
				let ret = "";
				const survDiv = document.createElement("div");

				for (const pl of players) {
					if (pl.steamId == surv.steamId) {
						ret += `
							<div class="d-flex flex-column mt-1">
								<div class="d-flex align-items-center gap-2 mb-1">
									<a href="profile.html?steamid=${pl.steamId}"><img  src="${pl.avatar}" class="rounded" style="width: 25px;"></a>
									<span class="text-primary">${surv.displayName}</span>
									<div class="d-flex align-items-center">
										<span class="text-secondary">[ <span class="text-danger">${pl.elo}</span> ]</span>
									</div>
								</div>
							</div>
						`;

						if (surv.steamId == id) {
							ret = `
								<div class="d-flex flex-column">
									<div class="d-flex align-items-center gap-2">
										<a href="profile.html?steamid=${pl.steamId}"><img  src="${pl.avatar}" class="rounded" style="width: 25px;"></a>
										<span class="text-primary fw-bold glow_surv">${surv.displayName} (you)</span>
										<div class="d-flex align-items-center">
											<span class="text-secondary">[ <span class="text-danger">${pl.elo}</span> ]</span>
										</div>
									</div>
								</div>
							`;
						}
					}
				}

				survDiv.innerHTML = ret;
				matchDiv.appendChild(survDiv);
			}

			const titleInf = document.createElement("span");
			titleInf.innerHTML = `<span class="text-secondary">[ <span class="text-warning">Infecteds</span> ]</span>`;
			matchDiv.appendChild(titleInf);

			for (const infect of match.infecteds.players) {
				let ret = "";
				const infecDiv = document.createElement("div");

				for (const pl of players) {
					if (pl.steamId == infect.steamId) {
						ret += `
							<div class="d-flex flex-column mt-1">
								<div class="d-flex align-items-center gap-2 mb-1">
									<a href="profile.html?steamid=${pl.steamId}"><img  src="${pl.avatar}" class="rounded" style="width: 25px;"></a>
									<span class="text-danger">${infect.displayName}</span>
									<div class="d-flex align-items-center">
										<span class="text-secondary">[ <span class="text-danger">${pl.elo}</span> ]</span>
									</div>
								</div>
							</div>
						`;

						if (infect.steamId == id) {
							ret = `
								<div class="d-flex flex-column">
									<div class="d-flex align-items-center gap-2">
										<a href="profile.html?steamid=${pl.steamId}"><img  src="${pl.avatar}" class="rounded" style="width: 25px;"></a>
										<span class="text-danger fw-bold glow_inf">${infect.displayName} (you)</span>
										<div class="d-flex align-items-center">
											<span class="text-secondary">[ <span class="text-danger">${pl.elo}</span> ]</span>
										</div>
									</div>
								</div>
							`;
						}
					}
				}

				infecDiv.innerHTML = ret;
				matchDiv.appendChild(infecDiv);
			}

			if (match.survivors.victory === "true") {
				let ret = "";
				const div = document.createElement("div");

				ret += `
					<div class="d-flex mt-3 gap-3">
						<div class="d-flex gap-2">
							<b style="background-color: #51ff0033; color: #77dd77;"> Survivors Win</b>
							<span class="text-secondary">[ <span class="text-warning">${match.survivors.points}</span> ]</span>
						</div>
						<b class="text-secondary">VS</b>
						<div class="d-flex gap-2">
							<b style="background-color: #ff000033; color: #ff6961;"> Infecteds Loser</b>
							<span class="text-secondary">[ <span class="text-warning">${match.infecteds.points}</span> ]</span>
						</div>
					</div>
				`;

				div.innerHTML = ret;
				matchDiv.appendChild(div);
			}

			if (match.infecteds.victory === "true") {
				let ret = "";
				const div = document.createElement("div");

				ret += `
					<div class="d-flex mt-3 gap-3">
						<div class="d-flex gap-2">
							<b style="background-color: #ff000033; color: #ff6961;"> Survivors Loser</b>
							<span class="text-secondary">[ <span class="text-warning">${match.survivors.points}</span> ]</span>
						</div>
						<b class="text-secondary">VS</b>
						<div class="d-flex gap-2">
							<b style="background-color: #51ff0033; color: #77dd77;"> Infecteds Win</b>
							<span class="text-secondary">[ <span class="text-warning">${match.infecteds.points}</span> ]</span>
						</div>
					</div>
				`;

				div.innerHTML = ret;
				matchDiv.appendChild(div);
			}

			box_matchs.appendChild(matchDiv);
		}
	}
}

function init() {
	viewMatch(matches, players);
}

window.onload = init;
