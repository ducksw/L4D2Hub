import { API_URL } from "./config.js";
import { formatDate } from "./helpers.js";


async function view_posts(posts) {
  const box_posts = document.getElementById("posts");

  for (const key of posts.reverse()) {
    box_posts.innerHTML += `
      <div class="d-flex flex-column">
        <a href="noticia.html?news=${key._id}" class="d-flex justify-content-between align-items-center gap-2 rounded bg-prin p-2 text-decoration-none">
          <div class="d-flex align-items-center gap-2">
            <img src="${key.imageLink}" style="width: 60px; height: 60px;">
            <span class="text-light">${key.title}</span>
          </div>
          <div>
            <span class="text-warning">${formatDate(key.createdAt)}</span>
          </div>
        </a>
      </div>
    `;
  }
}

async function init() {
  const response = await fetch(API_URL + "/posts");
  const posts = await response.json();

  view_posts(posts);
}

window.onload = init;
