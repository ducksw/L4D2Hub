import { players } from "../models/player.js";

const header = document.getElementById("header");
header.innerHTML = `
  <nav class="d-flex align-items-center gap-3" id="nav">
    <a href="index.html"><img src="./image/title.png" style="max-width: 100%; width: 200px;"></a>
    <a href="index.html" class="link-warning text-decoration-none">Home</a>
    <a href="stats.html" class="link-warning text-decoration-none">Stats</a>
    <a href="liga.html" class="link-warning text-decoration-none">Liga/Champions</a>
    <a href="#" id="btn_click" class="link-warning text-decoration-none">Teams</a>
  </nav>
  <div class="d-flex">
    <div id="header_profile"></div>
  </div>
`;

const header_profile = document.getElementById("header_profile");
const get_profile = localStorage.getItem("steamId");

function warning() {
  const msg = "En proceso...";
  alert(msg);
}

btn_click.onclick = () => warning();

function viewProfile() {
  let ret = "";

  if (get_profile) {
    for (const key of players) {
      if (get_profile == key.steamId) {
        ret += `
          <div class="d-flex align-items-center gap-2">
            <a href="profile.html?steamid=${key.steamId}"><img class="rounded border border-dark" src="${key.avatar}" style="width: 35px; height: 35px;"></a>
            <b class="text-light">${key.displayName}</b>
            <span class="box-elo">${key.elo}</span>
          </div>
        `;
      }
    }
  }

  header_profile.innerHTML = ret;
}

viewProfile();