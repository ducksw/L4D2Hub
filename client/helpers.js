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

export function exportCONST(players, name_export, name) {
  const jsonString = JSON.stringify(players, null, 2);

  let cleanJsString = jsonString.replace(/"([^"]+)":/g, '$1:');

  const fileContent = `export const ${name_export} = ${cleanJsString}`;


  const  blob = new Blob([fileContent], { type: "text/javascript;charset=utf-8" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.js`

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url)
}