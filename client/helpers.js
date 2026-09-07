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