import { players } from '../models/player.js';

function listClasif() {
    let list = document.getElementById('list-cla');
    let ret = `<div class="d-flex flex-column gap-2">`;

    let topPlayer = players.slice(0,8);

    topPlayer.forEach((player) => {
        if (player.clasificado === true) {
            ret += `
                <span class="list-group-item bg-gradient bg-black text-light p-2 rounded border border-dark">
                    • ${player.displayName}
                </span>
            `;
        } else {
            ret += `
                <span class="list-group-item bg-gradient bg-black text-light p-2 rounded border border-dark">
                    • ......
                </span>
            `;
        }
    });

    ret += `</div>`;
    list.innerHTML = ret;
}

listClasif();
