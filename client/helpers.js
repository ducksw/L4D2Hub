export function formatDate(date) {
  const d = new Date(date);

  return `${d.toLocaleDateString('es-ES', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })} ${d.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: false
  })}`;
}


export function calculatePorcent(players, key, value) {
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
		match: 10000,
	};

	if (key === 'elo') {
		return (((Math.max(value - BASE_ELO, 0)) / (MAX_ELO - BASE_ELO)) * 100).toFixed(2);
	}

	const max = MAX_VALUES[key] || 1;
	return ((value / max) * 100).toFixed(2);
}