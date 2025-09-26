import { season_01 } from "../SEASONS/season_01.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("temp");

// colocar bordes a la tabla
function getBorderColor(index) {
    if (index < 4) return "4px solid #448aff"; // champions bulls
    if (index === 4) return "4px solid green"; // Play Off Champions bulls
    if (index >= 5 && index <= 8) return "4px solid orange"; // Fase de grupos Marquez League
    if (index >= 11 && index <= 14) return "4px solid red"; // Descenso
    return "none";
}

// renderizar los colores segun el match
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

function liga() {
    const tbody = document.getElementById("liga-body");
    const topPlayer = [...season_01].sort((a, b) => b.points - a.points);
    tbody.innerHTML = "";

    topPlayer.forEach((player, index) => {
        const tr = document.createElement("tr");
        tr.style.borderTop = "1px solid #222";

        tr.innerHTML = `
            <title>L4D2 Hub | Temporada 01</title>
            <td style="text-align: center; padding: 10px; border-left: ${getBorderColor(index)};">
                ${index + 1}
            </td>
            <td style="padding: 10px;">${player.displayName}</td>
            <td style="text-align: center; padding: 10px;">
                <a href="${player.profileurl}" target="_blank">
                    <img src="${player.avatar}" alt="profile" class="rounded" style="max-width: 100%; width: 35px; border-radius: 5px;">
                </a>
            </td>
            <td style="padding: 10px; color: orange;">${player.steamId}</td>
            <td style="text-align: center; padding: 10px;">
                <span class="bg-black text-warning" style="display: inline-block; background-color: #111; padding: 6px 12px; border-radius: 10px; background: #111; border: 1px solid #333; font-weight: bold;" id="points">
                    ${player.points}
                </span>
            </td>
            <td style="text-align: center; padding: 10px;">
                ${player.lastMatches.map(renderMatchResult).join('')}
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function init() {
    liga();
}

window.onload = init;