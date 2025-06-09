import { players } from '../models/player.js';


players.forEach((player) => {

    if (player.clasificado === true) {
        console.log("JUGADOR CLASIFICADO: ", player.displayName);
    } else {
        console.log("NO HAY JUGADORES CLASIFICADOS");
    }
});
