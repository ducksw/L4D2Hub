import { players } from "../models/player.js";

function viewOnlyProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("steamid");

  console.log("ID", id);

  let res = document.getElementById('pro');
  let ret = `
    <div class="mx-auto bg bg-black border border-dark border-top-0 " style="max-width: 100%; width: 950px;" id="profile">
    `
  for (let pl of players) {
    if (pl.steamId === id) {
      ret += `
        <title>Profile :: ${pl.displayName}</title>
        <div class="d-flex justify-content-between p-3" id="header">
          <div class="d-flex gap-3">
            <a href="${pl.avatar}"><img src="${pl.avatar}" class="rounded border border-dark" style="max-width: 100%; width: 150px; height: 150px;"></a>
            <div class="d-flex flex-column">
              <span class="d-flex align-items-center gap-2 text-light mt-2 fs-4"><b>${pl.displayName}</b> <span class="badge bg bg-dark" style="font-size: 13px;">${pl.elo}</span></span>
              <div class="d-flex gap-2 align-items-center" style="font-size: 14px;">
                <span class="text-secondary"><a href="${pl.profileurl}">Steam Id</a></span> |
                <a href="player.html?steamid=${pl.steamId}">Stats</a> |
                <a href="#" id="download">Download</a>
              </div>
            </div>
          </div>
          <div class="d-flex gap-2 align-items-center justify-content-center">
            <span id="rk"></span>
          </div>
        </div>

        <section class="d-flex gap-3 text-light p-3">
          <section class="d-flex flex-column w-75" style="height: 100%;">
            <section class="d-flex flex-column gap-2 w-100 bg-profile rounded">
              <span class="bg bg-danger p-1 w-100" id="title-ins">Colección de insignias</span>
              <div class="p-2" id="box-insig">
              </div>
            </section>

            <section class="d-flex gap-2 w-100 bg-profile p-2 rounded mt-3">
              <div class="d-flex align-items-center flex-column w-50 bg bg-black rounded">
                <span class="fs-1">☀️</span>
                <span class="fs-3"><b>${pl.elo}</b></span>
                <span class="text-secondary">Elo</span>
              </div>
              <div class="d-flex align-items-center flex-column w-50 bg bg-black rounded">
                <span class="fs-1">🔥</span>
                <span class="fs-3"><b>${pl.points}</b></span>
                <span class="text-secondary">Liga Points</span>
              </div>
            </section>

            <section class="d-flex gap-2 w-100 bg-profile p-2 rounded mt-3">
              <div class="d-flex align-items-center flex-column w-50 bg bg-black rounded">
                <span class="fs-1">🏆</span>
                <span class="fs-3"><b>${pl.win}</b></span>
                <span class="text-secondary">Wins</span>
              </div>
              <div class="d-flex align-items-center flex-column w-50 bg bg-black rounded">
                <span class="fs-1">👎</span>
                <span class="fs-3"><b>${pl.losser}</b></span>
                <span class="text-secondary">Loser</span>
              </div>
              <div class="d-flex align-items-center flex-column w-50 bg bg-black rounded">
                <span class="fs-1">🇪</span>
                <span class="fs-3"><b>${pl.draw}</b></span>
                <span class="text-secondary">Empate</span>
              </div>
            </section>
          </section>

          <section class="d-flex flex-column w-50 bg-profile p-2 rounded">
            <span class="fs-3">Jugador de L4D2 Hub</span>
            <b class="text-danger" style="font-size: 14px;">Left 4 dead 2</b>

            <div class="d-flex flex-column mt-4">
              <span class="d-flex align-items-center gap-2" style="font-size: 14px;"><a href="" class="text-light text-decoration-none">Insignias</a> <span class="fs-5 text-secondary" id="l-insig">0</span></span>
              <span style="font-size: 13px;" id="insignia"></span>
            </div>

            <div class="d-flex flex-column mt-4">
              <span class="d-flex align-items-center gap-2" style="font-size: 14px;"><a href="" class="text-light text-decoration-none">Team</a> <span class="fs-5 text-secondary">0</span></span>
              <div class="d-flex align-items-center mt-2 bg bg-dark rounded p-1 gap-2">
                <img src="image/noicon-team.png" style="max-width: 100%; width: 50px;">
                <span style="font-size: 14px;">No team</span>
              </div>
            </div>

            <div class="d-flex flex-column mt-4">
              <span class="d-flex align-items-center gap-2" style="font-size: 14px;"><a href="" class="text-light text-decoration-none">Amigos</a> <span class="fs-5 text-secondary">${players.length}</span></span>
              <div class="d-flex flex-column gap-2 mt-3">
                ${players.slice(0,5).map(p => `
                  <div class="d-flex gap-2 justify-content-between">
                    <div>
                    <img src="${p.avatar}" class="rounded" style="max-width: 100%; width: 30px;">
                      <span style="font-size: 13px;"><a href="profile.html?steamid=${p.steamId}" class="text-decoration-none text-light">${p.displayName}</a></span>
                    </div>

                    <div>
                      <span class="badge bg bg-dark">${p.elo}</span>
                    </div>
                  </div>
                  `).join('')}
              </div>
            </div>
         </section>
        </section>
      </div>`
    }
  }

  res.innerHTML = ret;
}
viewOnlyProfile();

function viewRank() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("steamid");
  let rk = document.getElementById('rk');
  for (const player of players) {
    if (player.steamId == id) {
      if (player.rank === "Bronze") {
        rk.innerHTML = `<img id="image" src="image/brozen.svg">`;
      }
      if (player.rank === "Silver") {
        rk.innerHTML = `<img id="image" src="image/silver.svg">`;
      }
      if (player.rank === "Gold") {
        rk.innerHTML = `<img id="image" src="image/gold.svg">`;
      }
      if (player.rank === "Platinum") {
        rk.innerHTML = `<img id="image" src="image/platinum.svg">`;
      }
      if (player.rank === "Diamond") {
        rk.innerHTML = `<img id="image" src="image/diamond.svg">`;
      }
      if (player.rank === "Champions") {
        rk.innerHTML = `<img id="image" src="image/champions.svg">`;
      }
    }
  }
}
viewRank();

function viewInsignia() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("steamid");

  let l_insig = document.getElementById('l-insig');
  let insig = document.getElementById('insignia');
  let box_insig = document.getElementById('box-insig');

  for (const player of players) {
    if (player.steamId == id) {
      if (player.allInsignias.toString() == "Liga Bulls") {
        insig.innerHTML += `<figture id="photo" title="Campeón de la Liga Bulls"><img id="image-insig" src="image/liga-bulls-win.png"></figture>`;
        box_insig.innerHTML += `<figture id="photo" title="Campeón de la Liga Bulls"><img id="image-insig" src="image/liga-bulls-win.png"></figture>`;
        l_insig.innerHTML = player.allInsignias.length;
      } else {
        insig.innerHTML  = "No hay insignia...";
        box_insig.innerHTML  = "No hay insignia...";
      }
    }
  }
}
viewInsignia();

function capture() {
  const div = document.getElementById("profile");
  const date = new Date().toISOString().slice(0, 10);

  setTimeout(() => {
    html2canvas(div, {
      useCORS: true,
      allowTaint: false,
      scale: 2
    }).then(canvas => {
      const imgURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgURL;
      link.download = `profile_${date}.png`
      link.click();
    });
  }, 500)
}

document.getElementById("download").addEventListener('click', function (e) {
  e.preventDefault();
  capture();
});

