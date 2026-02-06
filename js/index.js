import { players } from "../models/player.js";
import { posts } from "../models/news.js";
import { matches } from "../models/matchs.js";

const list_players = document.getElementById("list_players");
const list_modal_players = document.getElementById("list_modal_players");
const profile = document.getElementById("profile");
const more_clip = document.getElementById("more_clip");

let id_global = null;

function viewProfile(avatar, name, elo, steamid) {
	const get_steamId = localStorage.getItem("steamId");

	let ret = "";

	ret += `
		<div class="d-flex justify-content-between align-items-center gap-2">
		  <div class="d-flex gap-3 align-items-center">
			<a href="profile.html?steamid=${steamid}"><img src="${avatar}" class="rounded border border-dark" style="width: 60px; height: 60px;"></a>
			<div class="d-flex align-items-center">
			  <b class="text-light">${name}</b>
			  <span class="box-elo">${elo}</span>
			</div>
		  </div>

		  <div class="d-flex gap-2">
			<a href="matchs.html?steamid=${steamid}" class="border border-dark rounded p-1"><img src="image/history.svg"></a>
			<a href="#" id="logout" class="border border-dark rounded p-1"><img src="image/logout.svg"></a>
		  </div>
		</div>
	`;

	profile.innerHTML = ret;
}

function log_out() {
	const msg = "¿Quieres cerrar sesión?";
	const cf = confirm(msg);

	if (cf) {
		localStorage.removeItem("steamId");
		window.location.reload();
	}
}

function players_modal(steamId, avatar, name, elo, steamid) {
	const div = document.createElement("div");
	div.classList.add("d-flex", "justify-content-between", "align-items-center", "gap-2");

	const aea = document.createElement("div");

	const btn_select = document.createElement("button");
	btn_select.classList.add("btn", "btn-warning");
	btn_select.textContent = "Seleccionar";

	const pr = document.createElement("div");
	pr.classList.add("d-flex", "align-items-center", "gap-2");

	const link_profile = document.createElement("a");
	link_profile.href = "profile.html?steamid="+steamid;
	link_profile.setAttribute("target", "_blank");

	const image = document.createElement("img");
	image.classList.add("rounded");
	image.src = avatar;
	image.width = 40;
	image.height = 40;

	const span = document.createElement("span");
	span.classList.add("text-light");
	span.innerHTML = name;

	link_profile.append(image);
	aea.append(btn_select);
	pr.append(link_profile, span);
	div.append(pr, aea);
	list_modal_players.append(div);

	btn_select.onclick = () => {
		id_global = steamId;
		localStorage.setItem("steamId", id_global);

		title_aea.style.display = "none";
		btn_player.style.display = "none";

		viewProfile(avatar, name, elo, steamid);
		setTimeout(function () {
			window.location.reload();
		}, 800);
	}
}

function appendListPlayers(avatar, name, elo, steamid) {
	const div = document.createElement("div");
	div.classList.add("d-flex", "justify-content-between", "align-items-center", "gap-2");

	const aea = document.createElement("div");

	const el = document.createElement("span");
	el.classList.add("box-elo");
	el.innerHTML = elo;

	const pr = document.createElement("div");
	pr.classList.add("d-flex", "align-items-center", "gap-2");

	const link_profile = document.createElement("a");
	link_profile.href = "profile.html?steamid="+steamid;

	const image = document.createElement("img");
	image.classList.add("rounded");
	image.src = avatar;
	image.width = 40;
	image.height = 40;

	const span = document.createElement("span");
	span.classList.add("text-light");
	span.innerHTML = name;

	link_profile.append(image);
	aea.append(el);
	pr.append(link_profile, span);
	div.append(pr, aea);
	list_players.append(div);
}

function viewMatch(array) {
	if (array.length) {
		for (const match of array.slice(0,1).reverse()) {
			const survivors = match.survivors?.players;
			const infecteds = match.infecteds?.players;
			const survivors_points = match.survivors?.points;
			const infecteds_points = match.infecteds?.points;

			if (survivors) {
				image_player01.src = "../image/survivors.png";
				image_player01.width = 140;
				name_player01.innerHTML = "Survivors";
				points_survivors.innerHTML = `<span class="fs-6">Points <span class="text-danger">${survivors_points}</span></span>`;
			}

			if (infecteds) {
				image_player02.src = "../image/infected.webp";
				image_player02.width = 140;
				name_player02.innerHTML = "Infecteds";
				points_infecteds.innerHTML = `<span class="fs-6">Points <span class="text-danger">${infecteds_points}</span></span>`;
			}
		}
	}

	if (!array.length) {
		image_player01.src = "../image/none.jpg";
		name_player01.innerHTML = "None";
		image_player01.width = 140;

		image_player02.src = "../image/none.jpg";
		name_player02.innerHTML = "None";
		image_player02.width = 140;
	}
}

function viewNews(id, title, link_image, idDoc, bg_key) {
	const ct = document.getElementById(idDoc);
	let ret = "";

	ret += `
        <a href="noticia.html?news=${id}" class="d-flex align-items-center gap-2 bg ${bg_key} border border-dark p-2 rounded text-decoration-none link-warning" style="background-color: ${bg_key}">
          <img src="${link_image}" class="rounded" style="max-width: 100%; width: 50px; height: 50px;">
          <span class="">${title}</span>
        </a>
    `

	ct.innerHTML += ret;
}

function init() {
	for (const key of players.sort((a, b) => (b.elo) - (a.elo))) {
		appendListPlayers(key.avatar, key.displayName, key.elo, key.steamId);
		players_modal(key.steamId, key.avatar, key.displayName, key.elo, key.steamId);
	}

	const savedId = localStorage.getItem("steamId");
	if (savedId) {
		const player = players.find(p => p.steamId === savedId);
		if (player) {
			title_aea.style.display = "none";
			btn_player.style.display = "none";

			id_global = player.steamId;
			//profile.style.display = "flex";
			viewProfile(player.avatar, player.displayName, player.elo, player.steamId, players);

			const logout = document.getElementById("logout");

			logout.onclick = () => log_out();
		}
	}

	for (const p of posts.reverse().slice(0, 4)) {
		viewNews(p._id, p.title, p.imageLink, "list_news", "bg-black");
	}

	for (const osi of posts) {
		viewNews(osi._id, osi.title, osi.imageLink, "list_modal_noticias", "bg-black");
	}

	viewMatch(matches);

	more_clip.onclick = () => alert("No hay clips publicado");

}

window.onload = init;
