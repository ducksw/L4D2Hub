import { exportCONST } from "./helpers.js";
import { API_URL } from "./config.js";

const input_steamid = document.getElementById("input_steamid");
const input_displayname = document.getElementById("input_displayname");
const input_avatar = document.getElementById("input_avatar");
const input_profileurl = document.getElementById("input_profileurl");

const btn_add_player = document.getElementById("btn_add_player");

let playersData = [];

async function deletePlayer(id, params) {
  const msg = confirm("¿Quieres eliminar a este jugador?");

  if (msg) {
    const response = await fetch(API_URL + "/player?steamid=" + id, {
      method: "DELETE",
      body: JSON.stringify(params)
    });

    if (response.ok) {
      const player = await response.json();
      console.log("Player Eliminado", player);
      window.location.reload();
    }
  }
}

async function list_players(players) {
  const list_player = document.getElementById("list_players")

  let ret = `<table class="table-dark bg bg-black rounded w-100" id="table_players">
    <thead>
      <tr class="text-center border-bottom border-dark text-danger">
        <th scope="col">#</th>
        <th scope="col">Profile</th>
        <th scope="col">Name</th>
        <th scope="col">Steam Id</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
  `;

  players.forEach((player, index) => {
    ret += `
      <tr class="text-center">
        <th class="p-3" scope="row">${index + 1}</th>
        <td><a href="${player.profileurl}" target="_blank"><img src="${player.avatar}" class="rounded" style="max-width: 100%; width: 25px;"></a></td>
        <td class="text-light">${player.displayName}</td>
        <td class="text-warning">${player.steamId}</td>
        <td class="text-warning">
          <a href="panel_players_edit.html?steamid=${player.steamId}" class="btn btn-primary focus-ring focus-ring-primary">Edit</a>
          <a href="#" class="btn btn-danger focus-ring focus-ring-danger" id="btn_delete" data-id="${player.steamId}">Delete</a>
        </td>
      </tr>
    `;
  });

  list_player.innerHTML = ret;

  document.querySelectorAll("#btn_delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const steamId = btn.getAttribute("data-id");
      console.log(steamId);
      deletePlayer(steamId);
    });
  });
}

document.getElementById("searchInput").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = playersData.filter(player =>
    player.displayName.toLowerCase().includes(value) ||
    player.steamId.includes(value)
  );
  list_players(filtered);
});

async function add_players(params) {
  const response = await fetch(API_URL + "/add_player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  });

  if (response.ok) {
    const player = await response.json();

    box_alert.innerHTML = `
      <div class="alert alert-success" role="alert">
        El player <b>${player.displayName}</b> fue agregado!!.
      </div>
    `;

    input_steamid.value = "";
    input_displayname.value = "";
    input_avatar.value = "";
    input_profileurl.value = "";

    console.log("PLAYER AGREGADO", player);
  }
}

async function init() {
  const response = await fetch(API_URL+"/players");
  playersData = await response.json();
  
  console.log("players data", playersData);

  list_players(playersData);

  btn_add_player.onclick = () => {
    add_players({
      steamId: input_steamid.value,
      displayName: input_displayname.value,
      avatar: input_avatar.value,
      profileurl: input_profileurl.value,
    });
  }

  btn_export.onclick = () => {
    exportCONST(playersData, "Players", "PlayersModels");
  }

  stat_online.innerHTML = playersData.length;
}

window.onload = init;
