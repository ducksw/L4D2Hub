import { Players } from "../models/PlayersModels.js";

let playersData = [];

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

async function renderTable(array) {
  const res = document.getElementById('res');

  let ret = `<table class="table-dark w-100 table_osi">
    <thead>
      <tr class="text-center border-bottom border-dark text-danger">
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

  array.sort((a, b) => (b.elo) - (a.elo)).forEach((player, index) => {
    ret += `
      <tr class="text-center">
        <th class="p-3" scope="row">${index + 1}</th>
        <td><a href="profile.html?steamid=${player.steamId}"><img src="${player.avatar}" class="rounded" style="max-width: 100%; width: 25px;"></a></td>
        <td class="text-light name_player_table">${player.displayName}</td>
        <td class="text-warning">${player.steamId}</td>
        <td class="badge_default" style="margin-top: 14px;"><span>${player.elo}</span></td>
        <td>${player.damage}</td>
        <td>${player.kills}</td>
        <td>${player.win}</td>
        <td>${player.draw}</td>
        <td>${player.losser}</td>
        <td>${player.match}</td>
        <td><a href="player.html?steamid=${player.steamId}" class="text-decoration-none" id="stats_link">Stats</a></td>
      </tr>
    `;
  });

  res.innerHTML = ret;
}

document.getElementById("searchInput").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = playersData.filter(player =>
    player.displayName.toLowerCase().includes(value) ||
    player.steamId.includes(value)
  );
  renderTable(filtered);
});

async function init() {
  const get_steamid = localStorage.getItem("steamid");
  playersData = Players;

  if (get_steamid) {
    steam_id.innerHTML = get_steamid;
    my_stats.href = "player.html?steamid=" +get_steamid;
  } else {
    steam_id.innerHTML = "unknown";
    my_stats.onclick = () => {
      alert("NO TIENES UNA CUENTA SELECCIONADA");
    }
  }

  renderTable(playersData)

  download_data.onclick = () => downloadDataJSON({ filename: "DATA_L4D2HUB.json" }, playersData);

}

window.onload = init;
