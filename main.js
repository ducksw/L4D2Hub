import { players } from './models/player.js'

function player() {
  let pl = document.getElementById('player-cant');
  let plLength = players.length;
  pl.innerHTML = plLength
}

player();
