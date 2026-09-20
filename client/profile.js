import { Players } from "../models/PlayersModels.js";
import { Matchs } from "../models/MatchModels.js";
import { calculatePorcent, formatDate } from "./helpers.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("steamid");

const profile_box = document.getElementById("profile_box");
const list_match = document.getElementById("list_match");

async function share() {
	const URL = window.location.href;
	await navigator.clipboard.writeText(URL);
	alert("Link copiado");
}

async function renderProfile(players, matches) {
	for (const player of players) {

		if (player.steamId === id) {

			let ac = "offline";
			if (player.active) {
				ac = "online"
			}

			let ret = `
				<div>
				<a href="index.html" style="font-size: 25px;">Volver</a><br/><br/>profile:<br/>
				<h1>${player.displayName}</h1>
				<a href="${player.avatar}"><img id="avatar_image" src="${player.avatar}"></a><br/>
				<div style="display: flex; gap: 10px; align-items: center; margin-top: 10px;">
					<a href="#" id="public_link" style="text-decoration: none;">[Compartir link]</a>
					<a href="player.html?steamid=${player.steamId}" style="text-decoration: none;">[Stats]</a>
				</div>
				<hr/>
				steamId: <span class="dark">[<span class="danger">${player.steamId}</span>]</span><br/>
				nickname: <span><span class="dark">[<span class="danger">${player.displayName}</span>]</span></span><br/>
				elo: <span><span class="dark">[<span class="danger">${player.elo}</span>]</span> - [${calculatePorcent(player, 'elo', player.elo)}%]</span><br/>
				damage: <span><span class="dark">[<span class="danger">${player.damage}</span>]</span> - [${calculatePorcent(player, 'damage', player.damage)}%]</span><br/>
				win: <span><span class="dark">[<span class="danger">${player.elo}</span>]</span> - [${calculatePorcent(player, 'win', player.win)}%]</span><br/>
				loser: <span><span class="dark">[<span class="danger">${player.losser}</span>]</span> - [${calculatePorcent(player, 'losser', player.losser)}%]</span><br/> draw: <span><span class="dark">[<span class="danger">${player.draw}</span>]</span> - [${calculatePorcent(player, 'draw', player.draw)}%]</span><br/>
				match: <span><span class="dark">[<span class="danger">${player.match}</span>]</span> - [${calculatePorcent(player, 'match', player.match)}%]</span><br/>
				status: <span class="dark">[<span class="danger">${ac}</span>]</span><br/>
				liga points: <span><span class="dark">[<span class="danger">${player.points}</span>]</span> - [${calculatePorcent(player, 'points', player.points)}%]</span><br/>
				rank: <span class="dark">[<span class="danger">${player.rank}</span>]</span><br/>
				es_admin?: <span class="dark">[<span class="danger">${player.isAdmin}</span>]</span><br/>
				steam profile: <a href="${player.profileurl}" target="_blank">click aquí...</a><br/>
				Ultimos 5: <span class="dark">[<span class="danger">${player.lastMatches}</span>]</span><br/>
				<br/><br/>
				</div>
			`;

			title.innerHTML = "Profile | " + player.displayName;

			const matchesFound = matches.filter(match =>
				match.survivors.players.some(s => s.steamId === id) ||
				match.infecteds.players.some(i => i.steamId === id)
			);

			if (matchesFound.length > 0) {
				for (const matchs of matchesFound.reverse()) {
					list_match.innerHTML += `
            <div>
							<span>(Date) <span style="color: darkgrey;">${formatDate(matchs.createdAt)}</span></span> 
							[<a href="match.html?gameid=${matchs._id}">${matchs._id}</a>]
            </div>
					`;
					console.log(matchs.createdAt);
				}
			}

			profile_box.innerHTML = ret;

			// badges
			if (player.badges.length) {
			} else {
				badges_box.innerHTML = "No tienes badges ganados";
			}

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

async function init() {
	const players = Players;
	const matchs = Matchs;

	renderProfile(players, matchs);
}

window.onload = init;
