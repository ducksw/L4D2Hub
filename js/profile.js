import { players } from "../models/player.js";
import { matches } from "../models/matchs.js";

const param = new URLSearchParams(window.location.search);
const id = param.get("steamid");

const profile_box = document.getElementById("profile_box");
const list_match = document.getElementById("list_match");

async function share() {
	const URL = window.location.href;
	await navigator.clipboard.writeText(URL);
	alert("Link copiado");
}

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
		match: 10000,
	};

	if (key === 'elo') {
		return (((Math.max(value - BASE_ELO, 0)) / (MAX_ELO - BASE_ELO)) * 100).toFixed(2);
	}

	const max = MAX_VALUES[key] || 1;
	return ((value / max) * 100).toFixed(2);
}

function init() {

	for (const player of players) {

		if (player.steamId === id) {

			let ac = "offline";
			if (player.active) {
				ac = "online"
			}

			let ret = `
				<div style="font-size: 20px;">
				<a href="index.html" style="font-size: 25px;">Volver</a><br/><br/>
				profile:<br/>
				<a href="${player.avatar}"><img id="avatar_image" src="${player.avatar}"></a><br/>
				<div style="display: flex; gap: 10px; align-items: center; margin-top: 10px;">
					<a href="#" id="public_link" style="text-decoration: none;">[Compartir link]</a>
					<a href="player.html?steamid=${player.steamId}" style="text-decoration: none;">[Stats]</a>
				</div>
				<hr/>
				steamId: <span>[${player.steamId}]</span><br/>
				nickname: <span>[${player.displayName}]</span><br/>
				elo: <span>[${player.elo}] - [${calculatePorcent(player, 'elo', player.elo)}%]</span><br/>
				damage: <span>[${player.damage}] - [${calculatePorcent(player, 'damage', player.damage)}%]</span><br/>
				win: <span>[${player.win}] - [${calculatePorcent(player, 'win', player.win)}%]</span><br/>
				loser: <span>[${player.losser}] - [${calculatePorcent(player, 'losser', player.losser)}%]</span><br/>
				draw: <span>[${player.draw}] - [${calculatePorcent(player, 'draw', player.draw)}%]</span><br/>
				match: <span>[${player.match}] - [${calculatePorcent(player, 'match', player.match)}%]</span><br/>
				status: <span>[${ac}]</span><br/>
				liga points: <span>[${player.points}] - [${calculatePorcent(player, 'points', player.points)}%]</span><br/>
				rank: <span>[${player.rank}]</span><br/>
				es_admin?: <span>[${player.isAdmin}]</span><br/>
				steam profile: <a href="${player.profileurl}" target="_blank">click aquí...</a><br/>
				Ultimos 5: <span>[${player.lastMatches}]</span><br/>
				<br/><br/>
				</div>
			`;

			title.innerHTML = "Profile | " + player.displayName;

			const matchesFound = matches.filter(match =>
				match.survivors.players.some(s => s.steamId === id) ||
				match.infecteds.players.some(i => i.steamId === id)
			);

			if (matchesFound.length > 0) {
				list_match.innerHTML = `<span style="font-size: 20px; font-weight: bold">Matchs history</span>`;
				for (const matchs of matchesFound.reverse()) {
					list_match.innerHTML += `
				<div>
					<span>(Date) ${matchs.date} :</span> [<a href="match.html?gameid=${matchs._id}">${matchs._id}</a>]
				</div>
			`;
				}
			}

			profile_box.innerHTML = ret;

			// compartir link
			const public_link = document.getElementById("public_link");
			public_link.onclick = () => share();

			if (player.active) {
				const avatar_image = document.getElementById("avatar_image");
				avatar_image.style.border = "2px solid lightgreen";
			}

			if (!player.active) {
				const avatar_image = document.getElementById("avatar_image");
				avatar_image.style.border = "2px solid red";
			}
		}
	}


}

window.onload = init;
