import { matches } from "../models/matchs.js";
import { players } from "../models/player.js";

const box_match = document.getElementById("box_match");

const params = new URLSearchParams(window.location.search);
const id = params.get("gameid");

function init() {
	const match = matches.find(m => m._id === id);

	const id_match = document.createElement("span");
	id_match.innerHTML = `<h5 class="text-light">Partida ID: <span class="text-warning">${match._id}</span> - Fecha: <b class="text-info">${match.date}</b></h5>`;

	box_match.appendChild(id_match);

	const title = document.createElement("span");
	title.innerHTML = `<span class="text-secondary">[ <span class="text-danger">Survivors</span> ]</span>`;

	box_match.appendChild(title);


	for (const surv of match.survivors.players) {
		const divSurv = document.createElement("div");
		let ret = "";

		for (const pl of players) {
			if (pl.steamId == surv.steamId) {
				ret = `
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
			}
		}

		if (ret !== "") {
			divSurv.innerHTML = ret;
			box_match.appendChild(divSurv);
		}
	}

	const titleInf = document.createElement("span");
	titleInf.innerHTML = `<span class="text-secondary">[ <span class="text-warning">Infecteds</span> ]</span>`;
	box_match.appendChild(titleInf);

	for (const infec of match.infecteds.players) {
		const divInfect = document.createElement("div");
		let ret = "";

		for (const pl of players) {
			if (pl.steamId == infec.steamId) {
				ret = `
					<div class="d-flex flex-column mt-1">
						<div class="d-flex align-items-center gap-2 mb-1">
							<a href="profile.html?steamid=${pl.steamId}"><img  src="${pl.avatar}" class="rounded" style="width: 25px;"></a>
							<span class="text-danger">${infec.displayName}</span>
							<div class="d-flex align-items-center">
								<span class="text-secondary">[ <span class="text-danger">${pl.elo}</span> ]</span>
							</div>
						</div>
					</div>
				`;
			}
		}

		if (ret !== "") {
			divInfect.innerHTML = ret;
			box_match.appendChild(divInfect);
		}
	}



}

window.onload = init;