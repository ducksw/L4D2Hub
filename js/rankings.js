import { players } from "../models/player.js";

function calculatePorcent(key, low = false, players) {
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

async function renderRankingPro(title, players, key, subTitle, porcentTitle, porcent, docId, pro = false) {
	const topPlayer = [...players].sort((a, b) => b[key] - a[key]).slice(0, 1);
	const noobPlayer = [...players].sort((a, b) => a[key] - b[key]).slice(0, 1);
	const container = document.getElementById(docId);

	if (pro === true) {
		let ret = `
		  <div class="d-flex justify-content-between align-items-center text-light p-1">
			<div class="d-flex flex-column gap-2" style="width: 10%;">
			<span class="text-danger">#</span>
			<b class="text-warning">${title}</b>
		  </div>
		`;

		topPlayer.forEach((player) => {
			ret += `
			<div class="d-flex flex-column gap-2" style="width: 30%;">
			  <span class="text-secondary">Player</span>
			  <div class="d-flex align-items-center gap-2">
				  <a href="profile.html?steamid=${player.steamId}"><img src="${player.avatar}" class="image-ranking rounded" style="max-width: 100%; width: 25px;"></a>
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
		  `;
		});

		container.innerHTML = ret;
	}

	if (pro === false) {
		let ret = `
		  <div class="d-flex justify-content-between align-items-center text-light p-1">
			<div class="d-flex flex-column gap-2" style="width: 10%;">
			<span class="text-danger">#</span>
			<b class="text-warning">${title}</b>
		  </div>
		`;

		noobPlayer.forEach((player) => {
			ret += `
			<div class="d-flex flex-column gap-2" style="width: 30%;">
			  <span class="text-secondary">Player</span>
			  <div class="d-flex align-items-center gap-2">
				  <a href="profile.html?steamid=${player.steamId}"><img src="${player.avatar}" class="image-ranking rounded" style="max-width: 100%; width: 25px;"></a>
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
		  `;
		});

		container.innerHTML = ret;
	}
}

async function init() {
	renderRankingPro('🟡 Elo', players, 'elo', 'Elo', 'Elo / e', calculatePorcent('elo', false, players), 'res-elo', true);
	renderRankingPro('💥 Damage', players, 'damage', 'Damage', 'Damage / d', calculatePorcent('damage', false, players), 'res-damage', true);
	renderRankingPro('💀 Kills', players, 'kills', 'Kills', 'Kills / k', calculatePorcent('kills', false, players), 'res-kill', true);
	renderRankingPro('🏆 Wins', players, 'win', 'Wins', 'Wins / w', calculatePorcent('win', false, players), 'res-win', true);

	renderRankingPro('🟡 Elo', players, 'elo', 'Elo', 'Elo / e', calculatePorcent('elo', true, players), 'res-noob-elo', false);
	renderRankingPro('💥 Damage', players, 'damage', 'Damage', 'Damage / d', calculatePorcent('damage', true, players), 'res-noob-damage', false);
	renderRankingPro('💀 Kills', players, 'kills', 'Kills', 'Kills / k', calculatePorcent('kills', true, players), 'res-noob-kill', false);
	renderRankingPro('🏆 Wins', players, 'win', 'Wins', 'Wins / w', calculatePorcent('win', true, players), 'res-noob-win', false);

	const get_steamid = localStorage.getItem("steamId");

	if (get_steamid) {
		my_stats.href = "player.html?steamid=" + get_steamid;
	}
}

window.onload = init;
