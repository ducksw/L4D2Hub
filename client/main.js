import { posts } from '../models/posts.js';
import { players } from '../models/player.js';

function selectProfile() {
  let res = document.getElementById('res');
  let ret = `
      <span class="text-danger fs-4">¿Que jugador eres?</span>
      <select id="select" class="form-select w-75 mx-auto mt-2 border-0 bg bg-dark text-light" aria-label="Default select example">
      <option value="0">Select Players</option>
    `;
  for (let pl of players) {
    ret += `
      <option value="${pl.displayName}">${pl.displayName}</option>
    `
  }

  ret += `</select>`;

  res.innerHTML += ret;

  let select = document.getElementById('select');

  select.addEventListener('change', function () {
    const selectValue = this.value;
    let arr = JSON.parse(localStorage.getItem('profile')) || [];
    let resProfile = document.getElementById('profile');

    for (const pl of players) {
      if (selectValue === pl.displayName) {
        const profile = { 
          steamId: pl.steamId,
          displayName: pl.displayName,
          avatar: pl.avatar,
          profileurl: pl.profileurl,
          match: pl.match,
          elo: pl.elo,
          points: pl.points,
          rank: pl.rank,
        }

        if (profile) {
          res.style.display = "none";
          resProfile.innerHTML = `
            <div class="d-flex justify-content-center align-items-center w-100">
              <div class="d-flex align-items-center mt-4 rounded">
                <img src="${profile.avatar}" class="rounded me-2 border border-danger" style="width: 100px; height: 100px; object-fit: cover;">
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between gap-2">
                      <span class="text-sencondary fw-bold">[<span class="text-danger">${profile.elo}</span>]</span>
                            <span class="text-light fw-bold">${profile.displayName}</span>
                        </div>
                        <div class="border border-danger"></div> 
                        <div>
                          <a href="profile.html?steamid=${profile.steamId}" class="text-primary text-decoration-none">My Profile</a> |
                          <a href="" id="logout" class="text-primary text-decoration-none">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
          `
          document.getElementById('logout').addEventListener('click', function(e) {
            localStorage.removeItem('profile');
            location.reload();
            e.preventDefault();
          });

          console.log(profile.displayName, profile.avatar, profile.elo);
        }

        arr.push(profile);

        localStorage.setItem('profile', JSON.stringify(arr));
        console.log(pl.displayName);
        break;
      }
    }
  });
}

function viewProfile() {
  let get_profile = JSON.parse(localStorage.getItem('profile')) || [];
  let res = document.getElementById('res');
  let resProfile = document.getElementById('profile');
  if (get_profile) {
    get_profile.forEach(profile => {
      res.style.display = "none";
      resProfile.innerHTML = `
        <div class="d-flex justify-content-center align-items-center w-100">
            <div class="d-flex align-items-center mt-4 rounded">
                <img src="${profile.avatar}" class="rounded me-2 border border-danger" style="width: 100px; height: 100px; object-fit: cover;">
                <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between gap-2">
                        <span class="text-sencondary fw-bold">[<span class="text-danger">${profile.elo}</span>]</span>
                        <span class="text-light fw-bold">${profile.displayName}</span>
                    </div>
                    <div class="border border-danger"></div> 
                    <div>
                        <a href="profile.html?steamid=${profile.steamId}" class="text-primary text-decoration-none">My Profile</a> |
                        <a href="" id="logout" class="text-primary text-decoration-none">Logout</a>
                    </div>
                </div>
            </div>
        </div>
      `

      document.getElementById('logout').addEventListener('click', function(e) {
        localStorage.removeItem('profile');
        location.reload();
        e.preventDefault();
      });

      console.log(profile.displayName, profile.avatar, profile.elo);
    });
  } else {
    console.log("NO HAY PROFILE SELECCIONADO");
  }
}


function onlyNews() {
  let only = document.getElementById('only');
  let ret = `<div class="border border-dark w-100 p-2 rounded">
    <b class="d-flex justify-content-center fs-5 rounded bg-gradient bg-dark p-2 w-100">Ultimas Noticias</b>
  `;
  const onlyPost = [...posts].reverse().slice(0, 1);

  onlyPost.forEach((post) => {
    ret += `
        <div class="mt-2">
        <h4>${post.title}</h4>
        <p style="color: darkgrey;">${post.text}</p>
        <img src="${post.imageLink}" style="display: flex; max-width: 100%; width: 300px; margin: auto;">
        </div>
      </div>
    `

    only.innerHTML = ret;
    console.log(post.title);
  });
}

viewProfile();
onlyNews();
selectProfile();

function modifyElo() {
  let get_profile = JSON.parse(localStorage.getItem('profile')) || [];
  players.forEach(profile => {
    if (get_profile[0].displayName == profile.displayName) {
      if (get_profile[0].elo !== profile.elo) {
        get_profile[0].elo = profile.elo;
        localStorage.setItem('profile', JSON.stringify(get_profile));
      }
    }
  });
}

modifyElo();
