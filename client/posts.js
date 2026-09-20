import { URL_WEB_APP_POST } from "./config.js";
import { formatDate } from "./helpers.js";

const box_posts = document.getElementById("posts");

function getSkeletonHTML(count = 5) {
  return Array.from({ length: count })
    .map(
      () => `
      <div class="d-flex flex-column mb-2 placeholder-wave">
        <div class="d-flex justify-content-between align-items-center gap-2 rounded bg-prin p-2">
          <div class="d-flex align-items-center gap-2 flex-grow-1">
            <!-- Imagen esqueleto -->
            <div class="placeholder rounded bg-secondary" style="width: 60px; height: 60px; min-width: 60px;"></div>
            <!-- Título esqueleto -->
            <span class="placeholder col-7 bg-secondary rounded py-2"></span>
          </div>
          <div>
            <!-- Fecha esqueleto -->
            <span class="placeholder col-12 bg-warning rounded px-4 py-2"></span>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

async function view_posts(posts) {
  if (!Array.isArray(posts) || posts.length === 0) {
    box_posts.innerHTML = `<p class="text-light">No hay noticias disponibles.</p>`;
    return;
  }

  const reversedPosts = [...posts].reverse();

  box_posts.innerHTML = reversedPosts
    .map(
      (key) => `
      <div class="d-flex flex-column mb-2">
        <a href="noticia.html?news=${key._ID}" class="d-flex justify-content-between align-items-center gap-2 rounded bg-prin p-2 text-decoration-none">
          <div class="d-flex align-items-center gap-2">
            <img src="${key.IMAGELINK || 'placeholder.jpg'}" style="width: 60px; height: 60px; object-fit: cover;" class="rounded" alt="${key.TITLE || 'Imagen'}">
            <span class="text-light">${key.TITLE || "Sin título"}</span>
          </div>
          <div>
            <span class="text-warning">${key.Timestamp ? formatDate(key.Timestamp) : ""}</span>
          </div>
        </a>
      </div>
    `
    )
    .join("");
}

async function init() {
  box_posts.innerHTML = getSkeletonHTML(5);

  try {
    const response = await fetch(URL_WEB_APP_POST);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const posts = await response.json();

    if (posts.success === false) {
      throw new Error(posts.error || "Error al obtener las publicaciones.");
    }

    view_posts(posts);
  } catch (error) {
    console.error("Error al obtener las noticias:", error);
    box_posts.innerHTML = `<p class="text-danger">Ocurrió un error al cargar las noticias: ${error.message}</p>`;
  }
}

window.onload = init;