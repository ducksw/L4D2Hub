import { API_URL } from "./config.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("gameid");

const gm = document.getElementById("gm_id");

async function renderMatch(match) {
  const survivorsList = match?.survivors?.players;
  const infectedList = match?.infecteds?.players;

  score_survivors.value = match.survivors.points;
  score_infecteds.value = match.infecteds.points;

  if (Array.isArray(survivorsList)) {
    for (const survivor of survivorsList) {
      box_survivors.innerHTML += `
        <div class="d-flex align-items-center bg-primary p-2 rounded me-2">
          <div class="d-flex align-items-center">
            <img src="${survivor.avatar}" style="width: 45px; height: 45px; object-fit: cover;" class="rounded" >
            <b class="small ms-2" style="white-space: normal; word-break: break-word;"> ${survivor.displayName} </b>
          </div>
        </div>
      `;
    }
  }

  if (Array.isArray(infectedList)) {
    for (const infected of infectedList) {
      box_infecteds.innerHTML += `
        <div class="d-flex align-items-center bg-danger p-2 rounded me-2">
          <div class="d-flex align-items-center">
            <img src="${infected.avatar}" style="width: 45px; height: 45px; object-fit: cover;" class="rounded" >
            <b class="small ms-2" style="white-space: normal; word-break: break-word;"> ${infected.displayName} </b>
          </div>
        </div>
      `;
    }
  }
}

async function updateMatch(id, params) {
  const response = await fetch(API_URL + "/match?gameid=" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  });

  const match = await response.json();

  console.log(match);
}

async function init() {
  const response = await fetch(API_URL + "/match?gameid="+id);
  const match = await response.json();

  score_survivors.value = match.survivors.points;
  score_infecteds.value = match.infecteds.points;

  update_match.onclick = async () => {
    updateMatch(id, {
      survivors: {
        ...match.survivors,
        points: Number(score_survivors.value),
      },
      infecteds: {
        ...match.infecteds,
        points: Number(score_infecteds.value),
      },
    });
  }

  renderMatch(match);
  gm.innerHTML = id;
}

window.onload = init;