import { API_URL } from "./config.js";
import { formatDate } from "./helpers.js";

let survivors = []; // array suvivors
let infecteds = []; // array infecteds
let maps_ = null;

async function select_players(players, maps) {
  const select_suvivors = document.getElementById("select_suvivors");
  const select_infecteds = document.getElementById("select_infecteds");
  const select_maps = document.getElementById("select_maps");

  let ret = `
    <select id="selectSurv"
      class="form-select w-75 mx-auto mt-2 border-0 bg-dark text-light">
      <option value="0">Select Players</option>
  `;
  for (let pl of players) {
    ret += `
      <option value="${pl.steamId}">
        ${pl.displayName}
      </option>
    `;
  }
  ret += `</select>`;

  // INFECTEDS

  let inf = `
    <select id="selectInf"
      class="form-select w-75 mx-auto mt-2 border-0 bg-dark text-light">
      <option value="0">Select Players</option>
  `;

  for (let pl of players) {
    inf += `
      <option value="${pl.steamId}">
        ${pl.displayName}
      </option>
    `;
  }
  inf += `</select>`;

  // *** MAPS ***

  let mp = `
    <select id="selectMap"
      class="form-select w-75 mx-auto mt-2 border-0 bg-dark text-light">
      <option value="0">MAPS</option>
  `;
  for (let m of maps) {
    mp += `
      <option value="${m._id}">
        ${m.name}
      </option>
    `;
  }
  mp += `</select>`;

  select_suvivors.innerHTML = ret;
  select_infecteds.innerHTML = inf;
  select_maps.innerHTML = mp;
  

  const box_suvivors = document.getElementById("box_suvivors");
  const box_infecteds = document.getElementById("box_infecteds");

  /** 
   ********************** SUVIVORS **********************
  **/

  selectMap.addEventListener("change", function () {
    const id_map = this.value;

    if (id_map === "0") return;

    const map = maps.find(m => m._id == id_map)

    // save maps
    maps_ = {
      name: map.name,
      image: map.image
    }

    console.log("MAPS_ ->", maps_);
  });

  selectSurv.addEventListener("change", function () {
    const steamId = this.value;

    if (steamId === "0") return;

    const player = players.find(p => p.steamId == steamId);

    if (!player) return;

    if (survivors.length >= 4) {
      return alert("MAXIMO 4 PLAYERS");
    }

    if (survivors.some(p => p.steamId === player.steamId)) {
      return alert("ESTE PLAYER YA ESTA AGREGADO");
    }

    if (infecteds.some(p => p.steamId === player.steamId)) {
      return alert("ESTE JUGADOR ES UN INFECTADO");
    }

    // save survivors
    survivors.push({
      steamId: player.steamId,
      displayName: player.displayName,
      avatar: player.avatar,
      elo: player.elo
    });


    box_suvivors.innerHTML += `
      <div class="d-flex align-items-center bg-primary p-2 rounded me-2">
        <div class="d-flex align-items-center">
          <img src="${player.avatar}" style="width: 45px; height: 45px; object-fit: cover;" class="rounded" >
          <b class="small ms-2" style="white-space: normal; word-break: break-word;"> ${player.displayName} </b>
        </div>

        <div class="ms-3">
          <span class="badge text-bg-dark fs-7"> ${player.elo} </span>
        </div>
      </div>
    `;

    console.log("SURVIVORS", survivors);
  });

  /** 
   ********************** INFECTEDS **********************
  **/

  selectInf.addEventListener("change", function () {
    const steamId = this.value;

    if (steamId === "0") return;

    const player = players.find(p => p.steamId == steamId);

    if (!player) return;

    if (infecteds.length >= 4) {
      return alert("MAXIMO 4 PLAYERS");
    }

    if (infecteds.some(p => p.steamId === player.steamId)) {
      return alert("ESTE PLAYER YA ESTA AGREGADO");
    }

    if (survivors.some(p => p.steamId === player.steamId)) {
      return alert("ESTE JUGADOR ES UN SUPERVIVIENTE");
    }

    // save infecteds
    infecteds.push({
      steamId: player.steamId,
      displayName: player.displayName,
      avatar: player.avatar,
      elo: player.elo
    });

    box_infecteds.innerHTML += `
      <div class="d-flex align-items-center bg-danger p-2 rounded me-2">
        <div class="d-flex align-items-center">
          <img src="${player.avatar}" style="width: 45px; height: 45px; object-fit: cover;" class="rounded" >
          <b class="small ms-2" style="white-space: normal; word-break: break-word;"> ${player.displayName} </b>
        </div>

        <div class="ms-3">
          <span class="badge text-bg-dark fs-7"> ${player.elo} </span>
        </div>
      </div>
    `;

    console.log("INFECTEDS", infecteds);
  });
}

console.log(survivors, infecteds);

async function createMatch() {
  if (survivors.length !== 4) {
    return alert("DEBES SELECCIONAR 4 SURVIVORS");
  }

  if (infecteds.length !== 4) {
    return alert("DEBES SELECCIONAR 4 INFECTEDS");
  }

  const match = {
    survivors: {
      players: survivors,
      victory: null,
      points: 0
    },

    infecteds: {
      players: infecteds,
      victory: null,
      points: 0
    },

    live: true,
    map_name: maps_.name,
    map_image: maps_.image
  }


  try {
    const response = await fetch(`${API_URL}/add_match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(match)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error creando match");
    }

    if (data.ok) {
      console.log("MATCH CREADO", data)

      alert("MATCH CREADO");
      window.location.reload();
    }

  } catch (error) {
    console.log("[ERROR] ", error);
    alert("ERROR AL CREAR EL MATCH");
  }
}

async function view_match(matches) {
  const box_matches = document.getElementById("box_matches");

  let ret = `
    <table class="table-dark w-100">
      <thead>
        <tr class="text-center border-bottom border-dark text-danger">
          <th>#</th>
          <th>Id</th>
          <th>Download</th>
          <th>Date</th>
          <th>Map</th>
          <th>Result</th>
          <th>Team (Survivors)</th>
          <th>Team (Infecteds)</th>
          <th>Score</th>
          <th>Score</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
  `;

  matches.reverse().forEach((match, index) => {

    const survivors = match.survivors.players
      .map(player => `
        <div class="d-flex align-items-center gap-2 mb-1">
          <img src="${player.avatar}" width="30" height="30" class="rounded" style="object-fit: cover;" >
          <span>${player.displayName}</span>
        </div>
      `)
      .join("");

    const infecteds = match.infecteds.players
      .map(player => `
        <div class="d-flex align-items-center gap-2 mb-1">
          <img src="${player.avatar}" width="30" height="30" class="rounded" style="object-fit: cover;">
          <span>${player.displayName}</span>
        </div>
      `)
      .join("");

    ret += `
      <tr class="text-center small">
        <th class="p-3 small" scope="row">${index + 1}</th>
        <td><span class="small">${match._id}</span> </td>
        <td><button class="btn btn-sm btn-dark small"> Download </button></td>
        <td class="small">${formatDate(match.createdAt)}</td>
        <td><div class="d-flex flex-column align-items-center"><img src="${match.map_image}" width="100" height="55" class="rounded" style="object-fit: cover;"> <span class="small mt-1">${match.map_name}</span></div>
        </td>
        <td>${match.live ? `<span class="badge text-bg-danger small">LIVE</span>` : `<span class="badge text-bg-dark small">FINISHED</span>`}</td>
        <td class="small">${survivors}</td>
        <td class="small">${infecteds}</td>
        <td><span class="badge text-bg-primary small"> ${match.survivors.points}</span></td>
        <td><span class="badge text-bg-danger small"> ${match.infecteds.points}</span></td>
        <td>
          <button class="btn btn-sm btn-outline-warning edit-match" data-id="${match._id}"> <i class="bi bi-pencil"></i>Edit</button>
        </td>
      </tr>
    `;
  });

  ret += `
    </tbody>
    </table>
  `;

  box_matches.innerHTML = ret;
}

async function init() {
  const response = await fetch(API_URL + "/match");
  const response_players = await fetch(API_URL + "/players");
  const response_maps = await fetch(API_URL + "/maps");

  const matches = await response.json();
  const players = await response_players.json();
  const maps = await response_maps.json();

  select_players(players, maps);
  view_match(matches);

  const create_match = document.getElementById("create_match");
  create_match.onclick = () => {
    createMatch()
  }
}

window.onload = init;