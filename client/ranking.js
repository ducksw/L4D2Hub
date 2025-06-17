import { players } from '../models/player.js'

function calculatePorcent(key, low = false) {
    const MAX_ELO = 20000;
    const BASE_ELO = 300;

    const MAX_VALUES = {
        elo: MAX_ELO,
        points: 100000,
        damage: 200000,
        kills: 10000,
        win: 10000,
    }

    if (low === true) {
        const topPlayer = [...players].sort((a, b) => a[key] - b[key])[0];

        const value = + topPlayer[key] || 0;

        if (key === 'elo') {
            return (((Math.max(value - BASE_ELO, 0)) / (MAX_ELO - BASE_ELO)) * 100).toFixed(2);
        }

        if (MAX_VALUES[key]) {
            return (value / MAX_VALUES[key] * 100).toFixed(2);
        }
    }

    // copy players
    const topPlayer = [...players].sort((a, b) => b[key] - a[key])[0];

    // convierto a numero
    const value = + topPlayer[key] || 0;

    // convertir a porcentajes
    if (key === 'elo') {
        return (((Math.max(value - BASE_ELO, 0)) / (MAX_ELO - BASE_ELO)) * 100).toFixed(2);
    }

    if (MAX_VALUES[key]) {
        return (value / MAX_VALUES[key] * 100).toFixed(2);
    }

    return 0;
}

function renderRanking(title, players, key, subTitle, porcentTitle, porcent, docId) {
    const topPlayer = [...players].sort((a, b) => b[key] - a[key]).slice(0, 1);
    const container = document.getElementById(docId);

    let ret = `
    <div class="d-flex justify-content-between align-items-center text-light p-1">
        <div class="d-flex flex-column gap-2" style="width: 10%;">
        <span class="text-danger">#</span>
        <b class="text-warning">${title}</b>
    </div>
    `

    topPlayer.forEach((player) => {
        ret += `
            <div class="d-flex flex-column gap-2" style="width: 30%;">
                <span class="text-secondary">Player</span>
                <div class="d-flex align-items-center gap-2">
                    <a href="${player.profileurl}"><img src="${player.avatar}" class="image-ranking rounded" style="max-width: 100%; width: 25px;"></a>
                    <span>${player.displayName}</span>
                </div>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-danger">${subTitle}</span>
                <b>${player[key]}</b>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-secondary">${porcentTitle}</span>
                <span>${porcent}</span>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-secondary">Rounds Played</span>
                <span>${player.match}</span>
            </div>
        `
    });

    container.innerHTML = ret;
}

function renderLeaderboard(players, key, containerId, valueColor = 'text-danger') {
    const sorted = [...players].sort((a, b) => b[key] - a[key]).slice(0, 10);
    const container = document.getElementById(containerId);

    let html = '';
    sorted.forEach((player, index) => {
        html += `
            <div class="d-flex justify-content-between p-1">
                <div class="d-flex gap-2">
                    <span class="text-warning">#${index + 1}</span>
                    <span>${player.displayName}</span>
                </div>
                <span class="${valueColor}">${player[key]}</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderRankingNoob(title, players, key, subTitle, docId, porcent, porcentTitle) {
    const topPlayer = [...players].sort((a, b) => a[key] - b[key]).slice(0, 1);
    const container = document.getElementById(docId);

    let ret = `
        <div class="d-flex justify-content-between align-items-center text-light p-1">
            <div class="d-flex flex-column gap-2" style="width: 10%;">
            <span class="text-danger">#</span>
            <b class="text-warning">${title}</b>
        </div>
    `

    topPlayer.forEach((player) => {
        ret += `
        <div class="d-flex flex-column gap-2" style="width: 30%;">
            <span class="text-secondary">Player</span>
            <div class="d-flex align-items-center gap-2">
                <a href="${player.profileurl}"><img src="${player.avatar}" class="image-ranking rounded"></a>
                <span>${player.displayName}</span>
            </div>
        </div>
        <div class="d-flex flex-column gap-2" style="width: 15%;">
            <span class="text-danger">${subTitle}</span>
            <b>${player[key]}</b>
        </div>
        <div class="d-flex flex-column gap-2" style="width: 15%;">
            <span class="text-secondary">${porcentTitle}</span>
            <span>${porcent}</span>
        </div>
        <div class="d-flex flex-column gap-2" style="width: 15%;">
            <span class="text-secondary">Rounds Played</span>
            <span>${player.match}</span>
        </div>
    `
    });

    container.innerHTML = ret;
}

function selectListPlayer() {
    const player = players;
    player.sort((a, b) => (b.elo) - (a.elo));

    let res = document.getElementById('res3')
    let ret = `
        <select id="select" class="form-select" aria-label="Default select example">
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

    select.addEventListener('click', function (e) {
        const selectValue = this.value;

        for (const pl of player) {
            if (selectValue === pl.displayName) {
                window.location = `player.html?id=${pl.steamId}`;
                break;
            }
        }
    });
}

// only boards
renderLeaderboard(players, 'elo', 'elo-leaderboard', 'text-warning');
renderLeaderboard(players, 'win', 'wins-leaderboard', 'text-danger');
renderLeaderboard(players, 'damage', 'damage-leaderboard', 'text-danger');
renderLeaderboard(players, 'kills', 'kills-leaderboard', 'text-danger');
renderLeaderboard(players, 'match', 'matchs-leaderboard', 'text-danger');
renderLeaderboard(players, 'rank', 'rank-leaderboard', 'text-danger');
renderLeaderboard(players, 'losser', 'loser-leaderboard', 'text-danger');

renderRanking('🟡 Elo', players, 'elo', 'Elo', 'Elo / e', calculatePorcent('elo'), 'res-elo');
renderRanking('💥 Damage', players, 'damage', 'Damage', 'Damage / d', calculatePorcent('damage'), 'res-damage');
renderRanking('💀 Kills', players, 'kills', 'Kills', 'Kills / k', calculatePorcent('kills'), 'res-kill');
renderRanking('🏆 Wins', players, 'win', 'Wins', 'Wins / w', calculatePorcent('win'), 'res-win');

renderRankingNoob('🟡 Elo', players, 'elo', 'Elo', 'res-elo-noob', calculatePorcent('elo', true), 'Elo / e');
renderRankingNoob('💥 Damage', players, 'damage', 'Damage', 'res-damage-noob', calculatePorcent('damage', true), 'Damage / d');
renderRankingNoob('💀 Kills', players, 'kills', 'Kills', 'res-kill-noob', calculatePorcent('kills', true), 'Kills / k');
renderRankingNoob('🏆 Wins', players, 'win', 'Wins', 'res-win-noob', calculatePorcent('win', true), 'Wins / w');

selectListPlayer();
