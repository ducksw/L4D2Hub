import { matches } from "../models/matchs.js";

const list_matchs = document.getElementById("list_matchs");

function init() {
	console.log(matches);

	let ret = "";

	for (const key of matches.reverse()) {
		ret += `<h5 class="text-light">Partida ID: <a href="match.html?gameid=${key._id}" class="text-warning">${key._id}</a> - Fecha: <b class="text-info">${key.date}</b></h5>`;
	}

	list_matchs.innerHTML = ret;
}

window.onload = init;
