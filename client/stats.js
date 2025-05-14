import { players } from '../models/player.js'

function stats() {
    let res = document.getElementById('res');
    let rec = `<table>
        <tr>
            <th>#</th>
            <th>Name:</th>
            <th>Profile:</th>
            <th>Steam Id:</th>
            <th>Elo:</th>
            <th>Damage:</th>
            <th>Kills:</th>
            <th>Win:</th>
            <th>Loser:</th>
            <th>Empate:</th>
            <th>Matchs:</th>
            <th>Rank:</th>
        </tr>
    `

    players.sort((a, b) => (b.elo) - (a.elo));

    players.forEach((player, index) => {
    rec +=`
    <tr>
        <td><b>${index + 1}</b></td>
        <td>${player.name}</td>
        <td class="avatar"><a target="_blank" href="${player.profileurl}"><img src="${player.avatar}"/></a></td>
        <td class="steamid" style="color: darkorange;">${player.steamId}</td>
        <td class="elo">${player.elo}</td>
        <td>${player.damage}</td>
        <td>${player.kills}</td>
        <td>${player.win} 🏆</td>
        <td>${player.losser}</td>
        <td>${player.draw}</td>
        <td>${player.match}</td>
        <td class="rank-color"><img class="rank-image" src="image/brozen.svg" style="max-width: 100%; width: 50px;"></td>
    </tr>`;
    });
    rec += "</table>";

    res.innerHTML = rec;

    const rankElements = document.querySelectorAll('.rank-image');
    rankElements.forEach((el, i) => {
    const rank = players[i].rank;
        if (rank === "Brozen") {
            //el.src = "image/bronze.svg"
        } else if (rank === "Silver") {
            el.src = "image/silver.svg"
            // el.classList.add('silver');
        } else if (rank === "Gold") {
            el.src = "image/gold.svg"
        } else if (rank === "Platinum") {
            el.src = "image/platinum.svg"
        } else if (rank === "Diamond") {
            el.src = "image/diamond.svg"
        } else if (rank === "Champions") {
            el.src = "image/champions.svg"
        }
    });
}

function rankingElo() {
    let table_elo = document.getElementById('table-elo');

    players.sort((a, b) => (b.elo) - (a.elo));
    let rec = `<table class="table">
        <tr>
          <th class="th">#</th>
          <th class="th">Name:</th>
          <th class="th">Profile:</th>
          <th class="th">Elo:</th>
        </tr>
    `
    let topPlayers  = players.slice(0,5);
    topPlayers.forEach((player, index) => {
    rec +=`
        <tr>
            <td class="td"><b>${index + 1}</b></td>
            <td class="td">${player.name}</td>
            <td class="avatar td"><img src="${player.avatar}"/></td>
            <td class="elo td">${player.elo}</td>
        </tr>`;
    });
    rec += "</table>";

    table_elo.innerHTML = rec;
}

function rankingDamage() {
    let table_damage = document.getElementById('table-damage');

    players.sort((a, b) => (b.damage) - (a.damage));
    let rec = `<table class="table">
        <tr>
            <th class="th">#</th>
            <th class="th">Name:</th>
            <th class="th">Profile:</th>
            <th class="th">Damage:</th>
        </tr>
    `
    let topPlayers  = players.slice(0,5);
    topPlayers.forEach((player, index) => {
    rec +=`
        <tr>
            <td class="td"><b>${index + 1}</b></td>
            <td class="td">${player.name}</td>
            <td class="avatar td"><img src="${player.avatar}"/></td>
            <td class="elo td">${player.damage}</td>
        </tr>`;
    });
    rec += "</table>";

    table_damage.innerHTML = rec;
}

function rankingKill() {
    let table_kill = document.getElementById('table-kill');

    players.sort((a, b) => (b.kills) - (a.kills));
    let rec = `<table class="table">
    <tr>
        <th class="th">#</th>
        <th class="th">Name:</th>
        <th class="th">Profile:</th>
        <th class="th">Kills:</th>
    </tr>
    `
    let topPlayers  = players.slice(0,5);
    topPlayers.forEach((player, index) => {
    rec +=`
    <tr>
        <td class="td"><b>${index + 1}</b></td>
        <td class="td">${player.name}</td>
        <td class="avatar td"><img src="${player.avatar}"/></td>
        <td class="elo td">${player.kills}</td>
    </tr>`;
    });
    rec += "</table>";

    table_kill.innerHTML = rec;
}

function rankingWin() {
    let table_win = document.getElementById('table-win');

    players.sort((a, b) => (b.win) - (a.win));
    let rec = `<table class="table">
    <tr>
        <th class="th">#</th>
        <th class="th">Name:</th>
        <th class="th">Profile:</th>
        <th class="th">Wins:</th>
    </tr>
    `
    let topPlayers  = players.slice(0,5);
    topPlayers.forEach((player, index) => {
    rec +=`
    <tr>
        <td class="td"><b>${index + 1}</b></td>
        <td class="td">${player.name}</td>
        <td class="avatar td"><img src="${player.avatar}"/></td>
        <td class="elo td">${player.win} 🏆</td>
    </tr>`;
    });
    rec += "</table>";

    table_win.innerHTML = rec;
}

function rankingLoser() {
    let table_loser = document.getElementById('table-loser');

    players.sort((a, b) => (b.losser) - (a.losser));
    let rec = `<table class="table">
    <tr>
        <th class="th">#</th>
        <th class="th">Name:</th>
        <th class="th">Profile:</th>
        <th class="th">Loser:</th>
    </tr>
    `
    let topPlayers  = players.slice(0,5);
    topPlayers.forEach((player, index) => {
        rec +=`
        <tr>
            <td class="td"><b>${index + 1}</b></td>
            <td class="td">${player.name}</td>
            <td class="avatar td"><img src="${player.avatar}"/></td>
            <td class="elo td">${player.losser}</td>
        </tr>`;
    });
    rec += "</table>";

    table_loser.innerHTML = rec;
}

rankingLoser();
rankingWin();
rankingKill();
rankingDamage();
rankingElo();
stats();
