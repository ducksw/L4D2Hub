import { players } from '../models/player.js';

function champions(e) {
    const msg = "Primero, se deben clasificar los jugadores para que pueda comenzar la Champions Bulls.";
    alert(msg);
    e.preventDefault()
}

function aea(e) {
    alert("En proceso...");
    e.preventDefault()
}

function getBorderColor(index) {
    if (index < 4) return "4px solid #448aff";
    if (index === 4) return "4px solid orange";
    if (index >= 7 && index <= 10) return "4px solid red";
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

function liga() {
    const tbody = document.getElementById("liga-body");
    const topPlayer = [...players].sort((a, b) => b.points - a.points);
    tbody.innerHTML = "";

    topPlayer.forEach((player, index) => {
        const tr = document.createElement("tr");
        tr.style.borderTop = "1px solid #222";

        tr.innerHTML = `
      <td style="text-align: center; padding: 10px; border-left: ${getBorderColor(index)};">
          ${index + 1}
      </td>
      <td style="padding: 10px;">${player.displayName}</td>
      <td style="text-align: center; padding: 10px;">
          <a href="${player.profileurl}">
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

function capture() {
    const div = document.getElementById("liga");
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

document.addEventListener("DOMContentLoaded", liga);
//document.getElementById('champions').addEventListener("click", champions);
document.getElementById('aea').addEventListener("click", aea);
document.getElementById("download-stats").addEventListener('click', function (e) {
    e.preventDefault();
    capture();
});
