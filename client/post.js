import { API_URL } from "./config.js";

const param = new URLSearchParams(window.location.search);
const id = param.get("news");

function formatDate(date) {
  const d = new Date(date);

  return `${d.toLocaleDateString('es-ES', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })} ${d.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })}`;
}

async function init() {
  const post_box = document.getElementById("post");

  const response = await fetch(API_URL + "/posts?news="+id);
  const post = await response.json();

  post_box.innerHTML = `
    <div class="d-flex flex-column">
      <h1 class="text-warning color_glow_warning">${post.title}</h1>
      <p style="color: darkgrey;">${post.text}</p>
      <div class="d-flex justify-content-center">
        <img src="${post.imageLink}" style="max-width: 100%; width: 400px;">
      </div>

      <div class="d-flex justify-content-end">
        <span class="text-danger">${formatDate(post.createdAt)}</span>
      </div>
    </div>
  `;
}

window.onload = init;
