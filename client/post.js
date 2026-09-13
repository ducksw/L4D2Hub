import { API_URL } from "./config.js";
import { formatDate } from "./helpers.js";

const param = new URLSearchParams(window.location.search);
const id = param.get("news");

async function init() {
  const post_box = document.getElementById("post");

  const response = await fetch(API_URL + "/posts?news="+id);
  const post = await response.json();

  post_box.innerHTML = `
    <div class="d-flex flex-column p-2">
      <h2 class="text-warning color_glow_warning title_osi">${post.title}</h2>
      <p style="color: darkgrey;">${post.text}</p>
      <div class="d-flex justify-content-center">
        <a href="${post.imageLink}"><img src="${post.imageLink}" style="max-width: 100%; width: 400px;"></a>
      </div>

      <div class="d-flex justify-content-end">
        <span class="text-danger">${formatDate(post.createdAt)}</span>
      </div>
    </div>
  `;
}

window.onload = init;
