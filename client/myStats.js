import { players } from "../models/player.js";

function calculatePorcent(players, key, value) {
    if (!players || players.length === 0) return "0.00";

    const MAX_ELO = 20000;
    const BASE_ELO = 300;

    const MAX_VALUES = {
        elo: MAX_ELO,
        points: 1000,
        damage: 200000,
        kills: 10000,
        win: 10000,
        losser: 10000,
        draw: 10000,
    };

    if (key === 'elo') {
        return (((Math.max(value - BASE_ELO, 0)) / (MAX_ELO - BASE_ELO)) * 100).toFixed(2);
    }

    const max = MAX_VALUES[key] || 1;
    return ((value / max) * 100).toFixed(2);

}

function selectListPlayer() {
    const player = players;
    player.sort((a, b) => (b.elo) - (a.elo));

    let res = document.getElementById('res');
    let ret = `
    <select id="select" class="d-flex form-select bg bg-dark border-0 text-light" aria-label="Default select example">
        <option value="0">Select Players</option>
    `;

    for (const p of player) {
        ret += `
        <option value="${p.displayName}">${p.displayName}</option>
    `
    }

    ret += `</select>`

    res.innerHTML += ret;

    let select = document.getElementById('select');

    select.addEventListener('click', function () {
        const selectValue = this.value;

        for (const pl of player) {
            if (selectValue === pl.displayName) {
                window.location = `player.html?steamid=${pl.steamId}`;
                break;
            }
        }
    });
}

function renderPlayerDetails(player, key, subTitle, porcentTitle, porcent, containerId) {
    const container = document.getElementById(containerId);
    let playerTitle = document.getElementById('playerTitle');
    let playerTitle2 = document.getElementById('playerTitle2');

    playerTitle.innerHTML = `<span class="text-warning">${player.displayName}</span>`
    playerTitle2.innerHTML = `<span class="text-warning">${player.displayName}</span>`

    if (!player) {
        container.innerHTML += "<p>Jugador no encontrado</p>";
        return;
    }

    let ret = `
    <title>Player : ${player.displayName}</title>

    <div class="d-flex justify-content-between align-items-center text-light p-1">
        <div class="d-flex flex-column gap-2" style="width: 10%;">
            <span class="text-danger">#</span>
            <b class="text-warning">${subTitle}</b>
        </div>

        <div class="d-flex flex-column gap-2" style="width: 30%;">
            <span class="text-secondary">Player</span>
            <div class="d-flex align-items-center gap-2">
                <a href="${player.profileurl}" target="_blank">
                    <img src="${player.avatar}" class="image-ranking rounded" style="max-width: 100%; width: 25px;">
                </a>
            <span>${player.displayName}</span>
        </div>
    </div>

    <div class="d-flex flex-column gap-2" style="width: 15%;">
        <span class="text-danger">${subTitle}</span>
        <b>${player[key]}</b>
    </div>

    <div class="d-flex flex-column gap-2" style="width: 15%;">
        <span class="text-secondary">${porcentTitle}</span>
        <span>${porcent}%</span>
    </div>

    <div class="d-flex flex-column gap-2" style="width: 15%;">
        <span class="text-secondary">Rounds Played</span>
        <span>${player.match}</span>
    </div>
    </div>
    `;

    container.innerHTML = ret;
}

function capture() {
    const div = document.getElementById("main");
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
            link.download = `stats_${date}.png`
            link.click();
        });
    }, 500)
}

document.getElementById("download-stats").addEventListener('click', function (e) {
    e.preventDefault();
    capture();
});

function viewProfile() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("steamid");

    let link_profile = document.getElementById('link-profile');
    for (const p of players) {
        if (p.steamId === id) {
            link_profile.innerHTML = `<a href="profile.html?steamid=${p.steamId}">Profile</a>`
            console.log(link_profile);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("steamid");

    const player = players.find(p => p.steamId === id);
    const containerId = 'player-details';

    if (!player) {
        document.getElementById(containerId).innerHTML = "<p>Jugador no encontrado</p>";
        return;
    }

    renderPlayerDetails(player, 'elo', 'Elo', 'Elo / e', calculatePorcent(players, 'elo', player.elo), 'res-elo');
    renderPlayerDetails(player, 'damage', 'Damage', 'Damage / d', calculatePorcent(players, 'damage', player.damage), 'res-damage');
    renderPlayerDetails(player, 'kills', 'Kills', 'Kills / k', calculatePorcent(players, 'kills', player.kills), 'res-kill');
    renderPlayerDetails(player, 'win', 'Wins', 'Wins / w', calculatePorcent(players, 'win', player.win), 'res-win');
    renderPlayerDetails(player, 'losser', 'Loser', 'Loser / l', calculatePorcent(players, 'losser', player.losser), 'res-loser');
    renderPlayerDetails(player, 'draw', 'Draw', 'Draw / d', calculatePorcent(players, 'draw', player.draw), 'res-draw');

    renderPlayerDetails(player, 'points', 'Points', 'Poinst / p', calculatePorcent(players, 'points', player.points), 'res-point');
    renderPlayerDetails(player, 'lastMatches', 'Last Matches', 'LastMatches / l', calculatePorcent(players, 'draw', player.lastMatches.length), 'res-matches');

    selectListPlayer();
    viewProfile();

});

