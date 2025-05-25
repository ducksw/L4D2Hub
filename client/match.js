import { players } from '../models/player.js'

function getBarClass(index) {
  if (index < 4) return 'bar-blue';
  //if (index < 8) return 'bar-orange';
  //if (index < 9) return 'bar-green';
}

function stats() {
  let res = document.getElementById('liga');
  let rec = `<table>
    <tr>
      <th>#</th>
      <th>Name:</th>
      <th>Profile:</th>
      <th>Steam Id:</th>
      <th class="coin">Puntos</th>
      <th>Ultimo 5</th>
    </tr>
  `
  players.sort((a, b) => (b.points) - (a.points));

  players.forEach((player, index) => {
  /*
  const wins = parseInt(player.win) || 0;
  const losses = parseInt(player.losser) || 0;
  const draws = parseInt(player.draw) || 0;
  const pj = wins + losses + draws;
  const pts = (wins * 3) + (draws * 1);
  console.log(pts);
  */

  // Mostrar últimos 5 como íconos
  const last = (player.lastMatches || []).map(r => {
    let className = ""
    if (r === 'W') className = 'dot dot-win';
    if (r === 'L') className = 'dot dot-loss';
    if (r === 'D') className = 'dot dot-draw';
    if (r === 'N') className = 'dot dot-none';
    return `<div class="${className}"></div>`;
  }).join('');
  rec +=`
  <tr>
    <td class="${getBarClass(index)}"><b>${index + 1}</b></td>
    <td>${player.name}</td>
    <td class="avatar"><a target="_blank" href="${player.profileurl}"><img src="${player.avatar}" crossorigin="anonymous"/></a></td>
    <td class="steamid" style="color: darkorange;">${player.steamId}</td>
    <td><div class="elo">${player.points}</div></td>
    <td class="last-matches">${last}</td>
  </tr>`;
  });
  rec += "</table>";

  res.innerHTML = rec;
}

document.getElementById('ch').addEventListener('click', function() {
  alert("Primero, se deben clasificar los jugadores para que pueda comenzar la Champions Bulls.");
  preventDefault();
});

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
      link.download = `stats_${date}.png`;
      link.click();
    });
  }, 500);
}

document.getElementById("download-stats").addEventListener('click', function(e) {
  e.preventDefault();
  capture();
});



stats();
