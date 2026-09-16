import { API_URL } from "./config.js";
import { formatDate } from "./helpers.js";

const iconArrow = document.getElementById("icon_arrow");
let ultimoScroll = 0;

window.addEventListener("scroll", function () {
  let scrollActual = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollActual > 100 && scrollActual > ultimoScroll) {
    iconArrow.classList.add("visible");
  } else {
    iconArrow.classList.remove("visible");
  }

  ultimoScroll = scrollActual <= 0 ? 0 : scrollActual;
});

// function up arrow
function up_arrow() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function viewProfile(players) {
  const steamId = localStorage.getItem("steamid");

  const res = document.getElementById('res');
  const resProfile = document.getElementById('profile');

  if (!steamId) {
    console.log("NO HAY PROFILE SELECCIONADO");
    return;
  }

  const profile = players.find(pl => pl.steamId === steamId);

  if (!profile) {
    console.log("NO SE ENCONTRÓ EL PROFILE");
    return;
  }

  res.style.display = "none";
  res.classList.remove("d-flex");

  resProfile.innerHTML = `
    <div class="d-flex flex-column w-100">
      <div class="d-flex align-items-center w-100 justify-content-between p-2 title_profile_rounded border-bottom border-dark" style="background-color: #0d0d0d;" >
        <div>
          <span class="text-secondary">PERSONAL PANEL</span>
        </div>

        <div style="min-width: 0; max-width: 60%;">
          <span class="text-danger small fw-bold d-block text-end" style="word-break: break-word;">
            #${profile.displayName}
          </span>
        </div>
      </div>

      <div class="d-flex justify-content-center p-2 gap-5 mt-3" style="margin: auto;">
        <!-- avatar -->
        <div class="position-relative me-3" style=" width: 90px; height: 90px; flex-shrink: 0; " >
          <div class="border border-secondary" style=" position: absolute; width: 100%; height: 100%; transform: rotate(3deg);"></div>
          <a href="profile.html?steamid=${profile.steamId}"><img src="${profile.avatar}" alt="${profile.displayName}" class="border border-dark" style=" position: relative; width: 90px; height: 90px; object-fit: cover;"></a>


          <span class="position-absolute top-0 start-100 translate-middle">
            <img src="image/rank_${profile.rank.toLowerCase()}.svg" class="image_rank" style="width: 40px; height: 40px;">
          </span>
        </div>
        
        <!-- INFO -->
        <div class="d-flex flex-column" style="min-width: 0; flex: 1;">

          <span class="text-light fw-bold fs-4" style="margin-top: 3px; white-space: normal; word-break: break-word;" > ${profile.displayName} </span>

          <div class="text-secondary" style=" font-size: 11px; letter-spacing: 1px; margin-top: 2px; " > STEAM PLAYER </div>

          <!-- ELO -->
          <div class="mt-3">
            <span style=" color: #555558; font-size: 13px; " > ELO </span>
            <span class="ms-2 fw-bold text-secondary fs-6">[<span class="text-danger">${profile.elo}</span>]</span>
          </div>
        </div>
      </div>

      <div class="mt-2" style=" height: 1px; margin: 0 15px; background: linear-gradient( 90deg, #dc3545, #333, transparent); " ></div>

      <div class="d-flex align-items-center justify-content-between px-3 py-2 small" >
        <a href="profile.html?steamid=${profile.steamId}" class="text-primary text-decoration-none border border-dark rounded p-1"><img src="./image/profile.svg" style="max-width: 100%; width: 25px;"></a>
        <span style=" color: #333;">//</span>

        <a href="#" id="log_out" class="text-primary text-decoration-none border border-dark rounded p-1"><img src="./image/log_out.svg" style="max-width: 100%; width: 25px;"></a>
      </div>

    </div>
  `;

  document.getElementById("log_out").onclick = logout;
}


function onlyNews(posts) {
  let only = document.getElementById('only');

  let ret = `
  <div class=" w-100">
    <b class="d-flex justify-content-center fs-4 rounded p-2 w-100 title_osi" style="background: linear-gradient(135deg, #1a0000 0%, darkred 50%, #080808 100%);">
        Ultimas Noticias
    </b>
  `;

  const onlyPost = [...posts].reverse().slice(0, 1);

  onlyPost.forEach((post) => {
    ret += `
      <div class="p-2 mt-2">
        <h4 class="text-warning">
          ${post.title}
        </h4>
        <p style="color: darkgrey;">
          ${post.text}
        </p>
        <img src="${post.imageLink}" style="display: flex; max-width: 100%; margin: auto;">

        <div class="d-flex justify-content-between mt-5">
          <div>
            <a class="text-decoration-none text-secondary link_hover" href="noticia.html?news=${post._id}">[View Post]</a>
          </div>
          <div>
            <span class="text-danger">${formatDate(post.createdAt)}</span>
          </div>
        </div>
      </div>
    `;
  });

  ret += `</div>`;

  only.innerHTML = ret;
}

async function list_players_index(players) {
  const list_players = document.getElementById("list_players");
  const cant_players = document.getElementById("cant_players");

  for (const key of players.sort((a, b) => b.elo - a.elo)) {
    list_players.innerHTML += `
      <a href="profile.html?steamid=${key.steamId}" class="d-flex link_hover_players text-decoration-none text-light justify-content-between align-items-center">
        <div class="d-flex gap-2 align-items-center">
          <img src="${key.avatar}" class="rounded" style="max-width: 100%; width: 30px; height: 30px;">
          <span style="white-space: normal; word-break: break-word;">${key.displayName}</span>
        </div>
        <div class="d-flex" style="margin-right: 5px;">
          <span class="text-secondary">[<span class="text-danger">${key.elo}</span>]</span>
        </div>
      </a>
    `;
  }

  cant_players.innerHTML = players.length;
}

async function viewMatch(matchs, players) {

  // not matchs 
  if (!matchs.length) {
    game_match.classList.remove("d-flex");
    game_match.classList.add("d-none");
  }

  if (matchs.length) {
    for (const match of matchs.reverse().slice(0, 1)) {
      const survivors = match.survivors?.players;
      const infecteds = match.infecteds?.players;
      const survivors_points = match.survivors?.points;
      const infecteds_points = match.infecteds?.points;
      const live = match.live;
      const map_name = match.map_name;

      // cantidad total de players en el match
      cant_in_game.innerHTML = survivors.length + infecteds.length;

      if (live) {
        live_icon.src = "./image/live.svg";
        live_icon.classList.add("live-blink");
      }

      if (!live) {
        game_match.classList.remove("d-flex");
        game_match.classList.add("d-none");
        cant_in_game.innerHTML = "0";
      }

      if (survivors) {
        survivol_image.src = "./image/survivors.png";
        // survivol_image.width = "55";
        name_survivors.innerHTML = "Survivors";
        points_survivors.innerHTML = `<span class="text-light mt-2">Score: <span style="color: #555555;">[<span class="text-danger">${survivors_points}</span>]</span></span>`
      }

      if (infecteds) {
        infected_image.src = "./image/infected.webp";
        // infected_image.width = "55";
        name_infecteds.innerHTML = "Infecteds";
        points_infecteds.innerHTML = `<span class="text-light">Score: <span style="color: #555555;">[<span class="text-danger">${infecteds_points}</span>]</span></span>`
      }

      /** **** CHAT LOG **** **/

      const log_survivors = document.getElementById("log_survivors");
      const log_infecteds = document.getElementById("log_infecteds");
      const log_map = document.getElementById("log_map");
      const timeStr = getCurrentTime()

      let ret = "";

      ret += `<div class="d-flex align-items-center gap-1 mb-1">`;
      ret += `  <span class="text-secondary">${timeStr}</span>`;
      ret += `  <span class="fw-bold ms-1 text-warning">L4D2Hub:</span>`;
      ret += `  <span class="fw-bold text-primary">Survivors</span>`;

      for (const s of survivors) {
        const p = players.find(player => player._id === s._id || player.steamId === s.steamId);
        const elos = p.elo

        ret += `
          <div class="d-flex" style="margin-left: 10px;">
            <span class="d-inline-flex gap-2 align-items-center text-light p-1 rounded" style="background-color: #222222;">
              <a href="profile.html?steamid=${s.steamId}"><img src="${s.avatar}" width="20" height="20" class="rounded"></a>
              ${s.displayName}
              <span class="text-secondary ms-1">[<span class="text-danger">${elos}</span>]</span>
            </span>
          </div>
        `;
      }

      ret += `</div>`;
      log_survivors.innerHTML = ret;

      // --- LOG INFECTEDS ---
      let retInfecteds = "";
      retInfecteds += `<div class="d-flex align-items-center gap-2 mb-1">`;
      retInfecteds += `  <span class="text-secondary">${timeStr}</span>`;
      retInfecteds += `  <span class="fw-bold ms-1 text-warning">L4D2Hub:</span>`;
      retInfecteds += `  <span class="fw-bold text-danger">Infecteds</span>`;

      if (infecteds && Array.isArray(infecteds)) {
        for (const inf of infecteds) {
          const p = players.find(player => player._id === inf._id || player.steamId === inf.steamId);
          const elos = p?.elo ?? "N/A";

          retInfecteds += `
            <div class="d-flex" style="margin-left: 10px;">
              <span class="d-inline-flex gap-2 p-1 align-items-center text-light rounded" style="background-color: #222222;">
                <a href="profile.html?steamid=${inf.steamId}"><img src="${inf.avatar}" width="20" height="20" class="rounded"></a>
                ${inf.displayName}
                <span class="text-secondary ms-1">[<span class="text-danger">${elos}</span>]</span>
              </span>
            </div>
          `;
        }
      }

      retInfecteds += `</div>`;
      log_infecteds.innerHTML = retInfecteds;

      // --- LOG MAP ---
      let retMap = "";
      retMap += `<div class="d-flex align-items-center gap-2 mb-1">`;
      retMap += `  <span class="text-secondary">${timeStr}</span>`;
      retMap += `  <span class="fw-bold ms-1 text-warning">L4D2Hub:</span>`;
      retMap += `  <span class="ms-1 text-light">Mapa seleccionado <b class="text-info">${map_name}</b></span>`;

      log_map.innerHTML = retMap;

    }
  }

  if (!matchs.length) {
    survivol_image.src = "../image/none.jpg";
    infected_image.src = "../image/none.jpg"
  }

}

function getCurrentTime() {
  const now = new Date();
  console.log(now);
  return now.toTimeString().substring(0, 5);
}

function logout() {
  const msg = "¿Quieres cerrar sesión?";
  const cf = confirm(msg);

  if (cf) {
    localStorage.removeItem("steamid");
    window.location.reload();
  }
}

async function init() {
  const steam_id = localStorage.getItem("steamid");

  const response = await fetch(API_URL + "/players");
  const response_post = await fetch(API_URL + "/posts");
  const response_match = await fetch(API_URL + "/match");

  const players = await response.json();
  const posts = await response_post.json();
  const matchs = await response_match.json();

  list_players_index(players);
  viewMatch(matchs, players);

  if (steam_id) {
    viewProfile(players);
  }

  onlyNews(posts);

  // icon up click
  icon_arrow.onclick = () => {
    up_arrow();
  }
}

window.onload = init;
