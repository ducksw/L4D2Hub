import { players } from "../models/player.js";

const table_liga = document.getElementById("table_liga");

function getBorderColor(index) {
    if (index < 4) return "4px solid #448aff"; // champions bulls
    if (index === 4) return "4px solid green"; // Play Off Champions bulls
    if (index >= 5 && index <= 8) return "4px solid orange"; // Fase de grupos Marquez League
    if (index >= 11 && index <= 14) return "4px solid red"; // Descenso
    return "none";
}

function renderMatchResult(letter) {
    let color = "#383b42", glow = "";
    if (letter === "W") {
        color = "#66bb6a";
        glow = "limegreen";
    } else if (letter === "L") {
        color = "#ef5350";
        glow = "red";
    } else if (letter === "D") {
        color = "#b0bec5";
        glow = "gray";
    }

    return `<span style="display:inline-block;width:10px;height:10px;background-color:${color};border-radius:50%;margin:2px;${glow ? `box-shadow: 0px 0px 10px ${glow};` : ''}"></span>`;
}

async function table_liga_render(array) {
    let ret = `<table>
        <thead class="border-bottom border-dark">
        <tr class="text-danger">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col" class="text-center">Profile</th>
            <th scope="col" class="text-center">Steam Id</th>
            <th scope="col" class="text-center">Puntos</th>
            <th scope="col" class="text-center">Último 5</th>
        </tr>
        </thead>
    `;

    array.sort((a, b) => (b.points) - (a.points)).forEach((player, index) => {
        ret += `
            <tr class="text-light">
                <th style="border-left: ${getBorderColor(index)}">${index + 1}</th>
                <td>${player.displayName}</td>
                <td><a href="profile.html?steamid=${player.steamId}" class="d-flex justify-content-center" class=""><img src="${player.avatar}" style="max-width: 100%; width: 25px; border-radius: 5px;"></a></td>
                <td class="text-warning text-center">${player.steamId}</td>
                <td class="text-center"><span class="points">${player.points}</span></td>
                <td class="text-center">${player.lastMatches.map(renderMatchResult).join('')}</td>
            </tr>
        `;
    });

    table_liga.innerHTML = ret;
}

async function init() {
    table_liga_render(players);
}

window.onload = init;