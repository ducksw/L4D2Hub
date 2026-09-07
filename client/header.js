import { API_URL } from "./config.js";

const header = document.getElementById("header");
const mobile = document.getElementById("mobile");

header.innerHTML = `
<div class="d-flex w-100">
  <nav class="d-flex align-items-center w-100 gap-2">
    <img style="max-width: 100%; width: 200px;" class="p-2" src="./image/title.png">
    <div class="d-flex gap-2">
      <a href="index.html" class="text-warning text-decoration-none">[Home]</a>
      <a href="stats.html" class="text-warning text-decoration-none">[Stats]</a>
      <a href="rankings.html" class="text-warning text-decoration-none">[Rankings]</a>
      <a href="noticias.html" class="text-warning text-decoration-none">[Noticias]</a>
      <a href="liga.html" class="text-warning text-decoration-none">[Liga/Champions]</a>
    </div>

    <div class="d-flex ms-auto" id="prof">
      hola
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
  const get_profile = JSON.parse(localStorage.getItem("steamid"));
  const prof = document.getElementById("prof");

  const response = await fetch(API_URL + "/players");
  const players = await response.json();

  console.log(get_profile);

  let ret = "";
  for (const key of players) {
    if (get_profile == key.steamId) {
      ret += `
        <div class="d-flex align-items-center gap-2" style="margin-left: 10px; white-space: normal; word-break: break-word; }">
          <a href="${key.profileurl}" target="_blank" style="width: 30px; height: 30px;"><img src="${key.avatar}" style="max-width: 100%; width: 30px; height: 30px;" class="rounded border border-dark"></a>
          <span class="text-danger">${key.displayName}</span>
          <span class="text-secondary">(<span class="text-danger">${key.elo}</span>)</span>
        </div>
      `;
    }
  }
  prof.innerHTML = ret;
}

osi();
