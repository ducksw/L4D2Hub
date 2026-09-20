import { URL_WEB_APP_POST } from "./config.js";
import { formatDate } from "./helpers.js";

const param = new URLSearchParams(window.location.search);
const id = param.get("news");

// HTML del esqueleto usando utilidades y placeholders de Bootstrap
const skeletonHTML = `
  <div class="d-flex flex-column p-2 placeholder-wave">
    <!-- Título esqueleto -->
    <h2 class="title_osi mb-3">
      <span class="placeholder col-8 bg-warning rounded"></span>
    </h2>

    <!-- Párrafos de texto esqueleto -->
    <p class="mb-2">
      <span class="placeholder col-12 bg-secondary rounded"></span>
      <span class="placeholder col-12 bg-secondary rounded"></span>
      <span class="placeholder col-10 bg-secondary rounded"></span>
      <span class="placeholder col-6 bg-secondary rounded"></span>
    </p>

    <!-- Contenedor de la imagen esqueleto -->
    <div class="d-flex justify-content-center my-3">
      <div class="placeholder rounded bg-secondary" style="width: 400px; height: 250px; max-width: 100%;"></div>
    </div>

    <!-- Fecha esqueleto -->
    <div class="d-flex justify-content-end mt-3">
      <span class="placeholder col-3 bg-danger rounded"></span>
    </div>
  </div>
`;

async function init() {
  const post_box = document.getElementById("post");

  if (!id) {
    post_box.innerHTML = `<p class="text-danger">No se especificó ninguna noticia en la URL.</p>`;
    return;
  }

  // 1. Mostrar el esqueleto de carga inmediatamente
  post_box.innerHTML = skeletonHTML;

  try {
    const response = await fetch(URL_WEB_APP_POST);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const posts = await response.json();

    if (posts.success === false) {
      throw new Error(posts.error || "Error al obtener las publicaciones.");
    }

    // Buscar la noticia que coincida con el ID recibido en la URL
    const post = posts.find(
      (item) => item._ID && item._ID.toString().trim() === id.trim()
    );

    if (!post) {
      post_box.innerHTML = `<p class="text-warning">No se encontró la noticia seleccionada.</p>`;
      return;
    }

    const postDate = post.Timestamp || post.createdAt;

    // 2. Reemplazar el esqueleto con la noticia real
    post_box.innerHTML = `
      <div class="d-flex flex-column p-2">
        <h2 class="text-warning color_glow_warning title_osi">${post.TITLE || "Sin título"}</h2>
        <p style="color: darkgrey;">${post.TEXT || ""}</p>
        
        ${
          post.IMAGELINK
            ? `
          <div class="d-flex justify-content-center">
            <a href="${post.IMAGELINK}" target="_blank" rel="noopener noreferrer">
              <img src="${post.IMAGELINK}" style="max-width: 100\%; width: 400px;" alt="${post.TITLE || 'Imagen de la noticia'}">
            </a>
          </div>
        `
            : ""
        }

        <div class="d-flex justify-content-end mt-3">
          <span class="text-danger">${postDate ? formatDate(postDate) : ""}</span>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error al cargar la noticia:", error);
    post_box.innerHTML = `<p class="text-danger">Ocurrió un error al cargar la noticia: ${error.message}</p>`;
  }
}

window.onload = init;