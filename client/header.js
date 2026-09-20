import { Players } from "../models/PlayersModels.js";

const header = document.getElementById("header");
const mobile = document.getElementById("mobile");

header.innerHTML = `
<div class="d-flex w-100">
  <nav class="d-flex align-items-center w-100 gap-2">
    <a href="index.html"><img style="max-width: 100%; width: 200px;" class="p-2" src="./image/title.png"></a>
    <div class="d-flex gap-3 align-items-center" id="nav">
      <a href="index.html" class="text-warning text-decoration-none">Home</a>
      <a href="stats.html" class="text-warning text-decoration-none">Stats</a>
      <a href="noticias.html" class="text-warning text-decoration-none">Noticias</a>
      <a href="liga.html" class="text-warning text-decoration-none">Liga/Champions</a>
      <a href="faq.html" class="text-warning text-decoration-none">FAQ</a>
      <div class="dropdown">
        <a href="#" class="text-danger p-1 rounded text-decoration-none dropdown-toggle more_box" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          More
        </a>
        <ul class="dropdown-menu bg-prin border border-black">
          <div class="d-flex flex-column gap-2">
            <li>
              <a class="dropdown-item drop-link text-warning d-flex gap-2" href="maps.html"><img src="./image/maps.svg" style="max-width: 100%; width: 20px;">Maps</a>
            </li>
            <li>
              <a class="dropdown-item drop-link text-warning d-flex gap-2" target="_blank" href="https://discord.gg/5ThYEdqYuV"><img src="./image/discord_icon.svg">Discord</a>
            </li>
          </div>
        </ul>
      </div>
    </div>

    <div class="d-flex ms-auto" id="prof">
    </div>
  </nav>
</div>
`;

mobile.innerHTML = `
    <a href="" class="text-decoration-none">
        <h1 class="text-warning text-title">L4D2 Hub</h1>
    </a>
    <button class="btn btn-dark focus-ring focus-ring-secondary" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"><i class="bi bi-list"></i></button>
  </div>

  <div class="offcanvas offcanvas-top bg-gradient bg-black h-50" tabindex="-1" id="offcanvasTop"
    aria-labelledby="offcanvasTopLabel">
    <div class="offcanvas-header text-center">
        <h3 class="text-center text-warning text-title" id="offcanvasTopLabel">L4D2 Hub</h3>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <nav class="d-flex flex-column text-center">
            <div class="d-flex flex-column gap-3">
                <a href="index.html" class="text-warning text-decoration-none">[Home]</a>
                <a href="stats.html" class="text-warning text-decoration-none">[Stats]</a>
                <a href="rankings.html" class="text-warning text-decoration-none">[Rankings]</a>
                <a href="noticias.html" class="text-warning text-decoration-none">[Noticias]</a>
                <a href="liga.html" class="text-warning text-decoration-none">[Liga/Champions]</a>
                <a href="teams.html" class="text-warning text-decoration-none">[Teams]</a>
                <a href="" class="text-warning text-decoration-none">[Reports]</a>
            </div>
        </nav>
    </div>
`;

async function osi() {
  const prof = document.getElementById("prof");

  const players = Players;
  const get_profile = JSON.parse(localStorage.getItem("steamid"));

  if (get_profile) {
    prof.innerHTML = renderProfileCard(players, get_profile);
  }
}

function renderProfileCard(playersList, steamId) {
  const user = playersList.find((p) => p.steamId == steamId);
  if (!user) return "";

  const view_rank = user.rank 
    ? `<img id="image_rank" src="./image/rank_${user.rank.toLowerCase()}.svg">` 
    : "";

  return `
    <div class="d-flex align-items-center gap-2" style="margin-left: 10px; white-space: normal; word-break: break-word;">
      <span class="badge_default"><span>${user.elo || 0}</span></span>
      <div style="height: 32px; width: 1px; background-color: #222222;"></div>
      <a href="profile.html?steamid=${user.steamId}" style="width: 30px; height: 30px;">
        <img src="${user.avatar}" style="max-width: 100%; width: 30px; height: 30px;" class="rounded border border-dark">
      </a>
      <span>${view_rank}</span>
      <span class="text-danger">${user.displayName}</span>
    </div>
  `;
}


osi();