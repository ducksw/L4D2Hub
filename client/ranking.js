import { players } from '../models/player.js'

function rankingElo() {
  let res_elo = document.getElementById('res-elo');
  const topPlayer = [...players].sort((a, b) => b.elo - a.elo).slice(0, 1);
  let ret = `
    <div class="d-flex justify-content-between align-items-center text-light p-1">
        <div class="d-flex flex-column gap-2" style="width: 10%;">
            <span class="text-danger">#</span>
            <b class="text-warning">🟡 Elo</b>
        </div>

    `
  topPlayer.forEach((player, index) => {
    ret += `
        <div class="d-flex flex-column gap-2" style="width: 30%;">
            <span class="text-secondary">Profile</span>
            <div class="d-flex align-items-center gap-2">
                <a href="${player.profileurl}"><img src="${player.avatar}" class="image-ranking rounded"></a>
                <span>${player.displayName}</span>
            </div>
        </div>
        <div class="d-flex flex-column gap-2" style="width: 15%;">
            <span class="text-danger">Elo</span>
            <b>${player.elo}</b>
        </div>
        <div class="d-flex flex-column gap-2" style="width: 15%;">
            <span class="text-secondary">Rank</span>
            <span>${player.rank}</span>
        </div>
        <div class="d-flex flex-column gap-2" style="width: 15%;">
            <span class="text-secondary">Match</span>
            <span>${player.match}</span>
        </div>

        `
  });

  res_elo.innerHTML = ret;
}

function rankingDamage() {
  let res_damage = document.getElementById('res-damage');
  const topPlayer = [...players].sort((a, b) => b.damage - a.damage).slice(0, 1);

  let ret = `
        <div class="d-flex justify-content-between align-items-center text-light p-1">
            <div class="d-flex flex-column gap-2" style="width: 10%;">
                <span class="text-danger">#</span>
                <b class="text-warning">💥 Damage</b>
            </div>
    `

  topPlayer.forEach((player, index) => {
    ret += `
            <div class="d-flex flex-column gap-2" style="width: 30%;">
                <span class="text-secondary">Profile</span>
                <div class="d-flex align-items-center gap-2">
                    <a href="${player.profileurl}"><img src="${player.avatar}" class="image-ranking rounded"></a>
                    <span>${player.displayName}</span>
                </div>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-danger">Damage</span>
                <b>${player.damage}</b>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-secondary">Rank</span>
                <span>${player.rank}</span>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-secondary">Match</span>
                <span>${player.match}</span>
            </div>
        </div>
        `
  });

  res_damage.innerHTML = ret;
}

function rankingKills() {
  let res_kill = document.getElementById('res-kill');
  const topPlayer = [...players].sort((a, b) => b.kills - a.kills).slice(0, 1);

  let ret = `
        <div class="d-flex justify-content-between align-items-center text-light p-1">
            <div class="d-flex flex-column gap-2" style="width: 10%;">
                <span class="text-danger">#</span>
                <b class="text-warning"><i class="fa-solid fa-skull text-secondary"></i> Kills</b>
            </div>
    `;

  topPlayer.forEach((player, index) => {
    ret += `
            <div class="d-flex flex-column gap-2" style="width: 30%;">
                <span class="text-secondary">Profile</span>
                <div class="d-flex align-items-center gap-2">
                    <a href="${player.profileurl}"><img src="${player.avatar}" class="image-ranking rounded"></a>
                    <span>${player.displayName}</span>
                </div>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-danger">Kills</span>
                <b>${player.kills}</b>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-secondary">Rank</span>
                <span>${player.rank}</span>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-secondary">Match</span>
                <span>${player.match}</span>
            </div>
        </div>
        `

    res_kill.innerHTML = ret;
  });
}

function rankingWin() {
  let res_win = document.getElementById('res-win');
  const topPlayer = [...players].sort((a, b) => b.win - a.win).slice(0, 1);

  let ret = `
        <div class="d-flex justify-content-between align-items-center text-light p-1">
            <div class="d-flex flex-column gap-2" style="width: 10%;">
                <span class="text-danger">#</span>
                <b class="text-warning"><i class="fa-solid fa-trophy text-danger"></i> Wins</b>
            </div>
    `;

  topPlayer.forEach((player, index) => {
    ret += `
            <div class="d-flex flex-column gap-2" style="width: 30%;">
                <span class="text-secondary">Profile</span>
                <div class="d-flex align-items-center gap-2">
                    <a href="${player.profileurl}"><img src="${player.avatar}" class="image-ranking rounded"></a>
                    <span>${player.displayName}</span>
                </div>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-danger">Wins</span>
                <b>${player.win}</b>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-secondary">Rank</span>
                <span>${player.rank}</span>
            </div>
            <div class="d-flex flex-column gap-2" style="width: 15%;">
                <span class="text-secondary">Match</span>
                <span>${player.match}</span>
            </div>
        </div>
        `
  });

  res_win.innerHTML = ret;
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

  if (container) container.innerHTML = html;
}


renderLeaderboard(players, 'elo', 'elo-leaderboard', 'text-warning');
renderLeaderboard(players, 'win', 'wins-leaderboard', 'text-danger');
renderLeaderboard(players, 'damage', 'damage-leaderboard', 'text-danger');
renderLeaderboard(players, 'kills', 'kills-leaderboard', 'text-danger');
renderLeaderboard(players, 'match', 'matchs-leaderboard', 'text-danger');
renderLeaderboard(players, 'rank', 'rank-leaderboard', 'text-danger');
renderLeaderboard(players, 'losser', 'loser-leaderboard', 'text-danger');

rankingWin();
rankingKills();
rankingDamage();
rankingElo();
