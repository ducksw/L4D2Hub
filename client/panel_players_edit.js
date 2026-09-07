import { API_URL } from "./config.js";

// inputs
const steamid_input = document.getElementById("steamid_input");
const displayname_input = document.getElementById("displayname_input");
const avatar_input = document.getElementById("avatar_input");
const profileurl_input = document.getElementById("profileurl_input");
const match_input = document.getElementById("match_input");
const elo_input = document.getElementById("elo_input");
const points_input = document.getElementById("points_input");
const damage_input = document.getElementById("damage_input");
const kills_input = document.getElementById("kills_input");
const wins_input = document.getElementById("wins_input");
const loser_input = document.getElementById("loser_input");
const draw_input = document.getElementById("draw_input");
const rank_input = document.getElementById("rank_input");

const params = new URLSearchParams(window.location.search);
const id = params.get("steamid");

async function updatePlayer(id, params) {
  const response = await fetch(API_URL + "/player?steamid=" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  });
}

async function init() {
  const response = await fetch(API_URL + "/players?steamid=" + id);
  const player = await response.json();

  name_player_edit.innerHTML = player.displayName;
  image_player_edit.src = player.avatar;

  // inputs value
  steamid_input.value = player.steamId;
  displayname_input.value = player.displayName;
  avatar_input.value = player.avatar;
  profileurl_input.value = player.profileurl;
  match_input.value = player.match;
  elo_input.value = player.elo;
  points_input.value = player.points;
  damage_input.value = player.damage;
  kills_input.value = player.kills;
  wins_input.value = player.win;
  loser_input.value = player.losser;
  draw_input.value = player.draw;
  rank_input.value = player.rank;

  btn_update.onclick = () => {
    updatePlayer(id, {
      steamId: steamid_input.value,
      displayName: displayname_input.value,
      avatar: avatar_input.value,
      profileurl: profileurl_input.value,
      match: match_input.value,
      elo: elo_input.value,
      points: points_input.value,
      damage: damage_input.value,
      kills: kills_input.value,
      win: wins_input.value,
      losser: loser_input.value,
      draw: draw_input.value,
      rank: rank_input.value,
    });
  }
}

window.onload = init;