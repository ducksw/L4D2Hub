import { API_URL } from "./config.js";

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

async function selectProfile(players) {
  let res = document.getElementById('res');

  let ret = `
    <span class="text-danger fs-4">Selecciona Tu Perfil</span>

    <select id="select"
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
  res.innerHTML = ret;

  let select = document.getElementById('select');
  select.addEventListener('change', function () {
    const steamId = this.value;

    if (steamId === "0") return;

    localStorage.setItem("steamid", steamId); // solo se guarda el steamId

    window.location.reload();
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
          <img src="${profile.avatar}" alt="${profile.displayName}" class="border border-dark" style=" position: relative; width: 90px; height: 90px; object-fit: cover;">


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
            <span class="ms-2 fw-bold text-secondary fs-6">(<span class="text-danger">${profile.elo}</span>)</span>
          </div>
        </div>
      </div>

      <div class="mt-2" style=" height: 1px; margin: 0 15px; background: linear-gradient( 90deg, #dc3545, #333, transparent); " ></div>

      <div class="d-flex align-items-center justify-content-between px-3 py-2 small" >
        <a href="${profile.profileurl}" target="_blank" class="text-primary text-decoration-none" style=" font-size: 13px; font-weight: 500; " > Steam Profile </a>
        <span style=" color: #333;">//</span>

        <a href="#" id="log_out" class="text-primary text-decoration-none" style=" font-size: 13px; font-weight: 500;">Logout</a>
      </div>

    </div>
  `;

  document.getElementById("log_out").onclick = logout;
}


function onlyNews(posts) {
  let only = document.getElementById('only');

  let ret = `
  <div class="border border-dark w-100 p-2 rounded">
    <b class="d-flex justify-content-center fs-4 rounded p-2 w-100 title_osi" style="background: linear-gradient(135deg, #1a0000 0%, darkred 50%, #080808 100%);">
        Ultimas Noticias
    </b>
  `;

  const onlyPost = [...posts].reverse().slice(0, 1);

  onlyPost.forEach((post) => {
    ret += `
      <div class="mt-2">
        <h4 class="text-warning">
          ${post.title}
        </h4>
        <p style="color: darkgrey;">
          ${post.text}
        </p>
        <img src="${post.imageLink}" style="display: flex; max-width: 100%; margin: auto;">
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
      <div class="d-flex justify-content-between gap-1 align-items-center">
        <div class="d-flex gap-2 align-items-center">
          <img src="${key.avatar}" class="rounded" style="max-width: 100%; width: 30px; height: 30px;">
          <b style="white-space: normal; word-break: break-word;">${key.displayName}</b>
        </div>
        <div class="d-flex" style="margin-right: 5px;">
          <span class="text-secondary">(<span class="text-danger">${key.elo}</span>)</span>
        </div>
      </div>
    `;
  }

  cant_players.innerHTML = players.length;
}

async function viewMatch(matchs, players) {
  if (matchs.length) {
    for (const match of matchs.slice(0, 1).reverse()) {
      const survivors = match.survivors?.players;
      const infecteds = match.infecteds?.players;
      const survivors_points = match.survivors?.points;
      const infecteds_points = match.infecteds?.points;
      const live = match.live;

      if (live) {
        live_icon.src = "./image/live.svg";
        live_icon.classList.add("live-blink");
      }

      // cantidad total de players en el match
      cant_in_game.innerHTML = survivors.length + infecteds.length;

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
      const timeStr = getCurrentTime()

      let ret = "";

      ret += `<div class="d-flex align-items-center gap-1 mb-1">`;
      ret += `  <span class="text-secondary">${timeStr}</span>`;
      ret += `  <span class="fw-bold ms-1 text-warning">L4D2Hub:</span>`;
      ret += `  <span class="fw-bold text-primary">Survivors</span>`;

      for (const s of survivors) {
        // const p = players.find(player => player.id === s.id || player.displayName === s.displayName);

        // const avatarUrl = p.avatar
        // ret += `
        //   <span class="d-inline-flex align-items-center bg-dark text-light px-1 rounded border border-secondary" style="font-size: 12px;">
        //     <img src="${avatarUrl}" width="16" height="16" class="rounded-circle me-1">
        //     ${s.displayName}
        //     <span class="text-muted ms-1">[R]</span>
        //   </span>
        // `;
      }

      ret += `</div>`;

      log_survivors.innerHTML = ret;
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

  selectProfile(players);
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
