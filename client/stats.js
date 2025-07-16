import { players } from '../models/player.js';

function stats() {
  const res = document.getElementById('res');

  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search")?.toLowerCase() || '';

  let ret = `<table class="table-dark w-100">
    <thead>
      <tr class="text-center border-bottom border-dark text-danger">
        <th scope="col">#</th>
        <th scope="col">Profile</th>
        <th scope="col">Name</th>
        <th scope="col">Steam Id</th>
        <th scope="col">Elo</th>
        <th scope="col">Damage</th>
        <th scope="col">(I)Kills</th>
        <th scope="col">Win</th>
        <th scope="col">Draw</th>
        <th scope="col">Loser</th>
        <th scope="col">Match</th>
        <th scope="col">Stats</th>
      </tr>
    </thead>
    `;

  players.sort((a, b) => b.elo - a.elo);

  const filteredPlayers = searchQuery
    ? players.filter(player => player.displayName.toLowerCase().includes(searchQuery))
    : players;

  filteredPlayers.forEach((player, index) => {
    ret += `
      <tr class="text-center">
        <th class="p-3" scope="row">${index + 1}</th>
        <td><a href="${player.profileurl}"><img src="${player.avatar}" class="rounded" style="max-width: 100%; width: 25px;"></a></td>
        <td class="text-light">${player.displayName}</td>
        <td class="text-warning">${player.steamId}</td>
        <td class="text-danger"><b>${player.elo}</b></td>
        <td>${player.damage}</td>
        <td>${player.kills}</td>
        <td>${player.win}</td>
        <td>${player.draw}</td>
        <td>${player.losser}</td>
        <td>${player.match}</td>
        <td><a href="player.html?steamid=${player.steamId}">Stats</a></td>
      </tr>
    `;
  });

  if (filteredPlayers.length === 0) {
    ret += `<tr><td colspan="10" class="text-center text-light">No player found for "${searchQuery}"</td></tr>`;
  }

  ret += `</table>`;
  res.innerHTML = ret;
}

stats();
