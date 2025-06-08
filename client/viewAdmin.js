import { players } from '../models/player.js'

function viewAdmin() {
    const table_admin = document.getElementById('table-admin');
    let html = '';

    players.forEach((player) => {
        if (player.isAdmin === true) {
            html += `
                <tr>
                    <th>
                        <a href="${player.profileurl}">
                            <img class="rounded mt-2" src="${player.avatar}" width="40" height="40">
                        </a>
                    </th>
                    <th>${player.displayName}</th>
                    <th>
                        ${player.online
                            ? '<span class="text-success">Online</span>'
                            : '<span class="text-secondary">Offline</span>'}
                    </th>
                </tr>
            `;
        }
    });

    table_admin.insertAdjacentHTML('afterend', html);
    table_admin.remove(); 
}

document.addEventListener('DOMContentLoaded', viewAdmin);
