import { posts } from '../models/posts.js';
import { players } from '../models/player.js';

function selectProfile() {
    let res = document.getElementById('res');
    let ret = `
      <span class="text-danger fs-4">Selecciona Tu Perfil</span>
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
                    fg_championsbulls: pl.fg_championsbulls,
                    playoff: pl.playoff,
                    fg_marquez_league: pl.fg_marquez_league,
                    descenso: pl.descenso,
                }

                window.location.reload();
                console.log(profile.displayName, profile.avatar, profile.elo);
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
                    <div class="d-flex align-items-center mt-4 rounded position-relative">
                    <div class="position-relative">
                        <a href="${profile.profileurl}" target="_blank"><img src="${profile.avatar}" class="rounded me-2 border border-danger" style="width: 100px; height: 100px; object-fit: cover;"></a>
                        ${profile.fg_championsbulls ? `
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                            FG Champions Bulls
                            </span>` : ''
                }
                        ${profile.playoff ? `
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                            Play Off
                            </span>` : ''
                }
                        ${profile.fg_marquez_league ? `
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                            FG Marquez League
                            </span>` : ''
                }
                        ${profile.descenso ? `
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            Descenso
                            </span>` : ''
                }
                    </div>
                    <div class="d-flex flex-column">
                        <div class="d-flex justify-content-between gap-2">
                        <span class="text-sencondary fw-bold">[<span class="text-danger">${profile.elo}</span>]</span>
                        <span class="text-light fw-bold">${profile.displayName}</span>
                        </div>
                        <div class="border border-danger"></div> 
                        <div>
                        <a href="${profile.profileurl}" target="_blank" class="text-primary text-decoration-none">Steam Profile</a> |
                        <a href="#" id="log_out" class="text-primary text-decoration-none" onclick="logout()">Logout</a>
                        </div>
                    </div>
                    </div>
                </div>
            `;

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
    });
}
viewProfile();
onlyNews();
selectProfile();

function modifyElo() {
    let get_profile = JSON.parse(localStorage.getItem('profile')) || [];
    if (!get_profile.length) {
        console.log("NO HAY DATOS EN EL LOCALSTORAGE");
        return 0;
    }

    if (get_profile) {
        players.forEach(profile => {
            if (get_profile[0].displayName == profile.displayName) {
                if (get_profile[0].elo !== profile.elo) {
                    get_profile[0].elo = profile.elo;
                    localStorage.setItem('profile', JSON.stringify(get_profile));
                }
            }
        });
    }
}
modifyElo();

function typesPhases() {
    const image01 = document.getElementById('fase-image01');
    const image02 = document.getElementById('fase-image02');
    const name01 = document.getElementById('fase-name01');
    const name02 = document.getElementById('fase-name02');
    const fWin = document.getElementById('fase-win');

    const playOffPlayers = players.filter(pl => pl.playoff);

    // play off versus
    if (playOffPlayers.length >= 2) {
        const p1 = playOffPlayers[0];
        const p2 = playOffPlayers[1];

        image01.src = p1.avatar;
        image01.style.width = "35px";
        image01.style.height = "35px";
        name01.innerHTML = p1.displayName

        image02.src = p2.avatar;
        image02.style.width = "35px";
        image02.style.height = "35px";
        name02.innerHTML = p2.displayName

        // GANADOR
        fWin.innerHTML = "-----";
    }

}
typesPhases();

function logout() {
    const msg = "¿Quieres cerrar sesión?"
    const cf = confirm(msg);

    if (cf) {
        localStorage.removeItem("profile");
        window.location.reload();
    }
}

function init() {
    log_out.onclick = () => logout();
}

window.onload = init;