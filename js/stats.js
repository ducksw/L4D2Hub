import { players } from "../models/player.js";

const list_stats = document.getElementById("list_stats");
const download_data = document.getElementById("download_data");

let playersData = [];

function downloadDataJSON(args, obj) {
	let data, filename, link;
	let json = 'data:text/json;charset=utf-8,' + JSON.stringify(obj);

	filename = args.filename;
	data = encodeURI(json);

	link = document.createElement('a');
	link.setAttribute('href', data);
	link.setAttribute('download', filename);
	link.click();
}

function renderTable(array, nb) {
	let ret = `<table>
        <thead class="border-bottom border-dark">
          <tr class="text-danger">
            <th scope="col">#</th>
            <th scope="col">Profile</th>
            <th scope="col">Name</th>
            <th scope="col">Steam Id</th>
            <th scope="col">Elo</th>
            <th scope="col">Damage</th>
            <th scope="col">(I)Kills</th>
            <th scope="col">Win</th>
            <th scope="col">Draw</th>
            <th scope="col">Loser</th>
            <th scope="col">Match</th>
            <th scope="col">Stats</th>
          </tr>
        </thead>
    `;

	array.sort((a, b) => (b.elo) - (a.elo)).slice(0, nb).forEach((player, index) => {
		ret += `
	  <tr class="text-light">
		<th>${index + 1}</th>
		<td><a href="profile.html?steamid=${player.steamId}"><img src="${player.avatar}" style="max-width: 100%; width: 25px; border-radius: 5px;"></a></td>
		<td>${player.displayName}</td>
		<td id="steamId">${player.steamId}</td>
		<td class="text-secondary">[ <b class="text-danger">${player.elo}</b> ]</td>
		<td>${player.damage}</td>
		<td>${player.kills}</td>
		<td>${player.win}</td>
		<td>${player.draw}</td>
		<td>${player.losser}</td>
		<td>${player.match}</td>
		<td><a class="text-decoration-none" href="player.html?steamid=${player.steamId}">Stats</a></td>
	  </tr>
	`;
	});

	list_stats.innerHTML = ret;
}

document.getElementById("searchInput").addEventListener("input", e => {
	const value = e.target.value.toLowerCase();
	const filtered = playersData.filter(player =>
		player.displayName.toLowerCase().includes(value) ||
		player.steamId.includes(value)
	);
	renderTable(filtered);
});

function init() {
	playersData = players

	player_total.innerHTML = playersData.length;

	renderTable(playersData, parseInt(select_value.value));
	select_value.addEventListener("change", function () {
		renderTable(playersData, parseInt(this.value));
	});
	download_data.onclick = () => downloadDataJSON({ filename: "DATA_L4D2HUB.json" }, playersData);

	const get_steaId = localStorage.getItem("steamId");
	if (get_steaId) {
		my_stats.style.display = "flex";
		my_stats.innerHTML = "My stats";
		my_stats.href = "player.html?steamid=" + get_steaId;
	}
}

window.onload = init;
