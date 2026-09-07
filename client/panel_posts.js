import { API_URL } from "./config.js";
import { formatDate } from "./helpers.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("news");

let currentEditingPostId = null;

async function view_posts(posts) {
  const box_posts = document.getElementById("box_posts");
  let ret = "";

  for (const key of posts.reverse()) {
    ret += `
      <div class="d-flex gap-2 align-items-center post-item">
        <div class="d-flex justify-content-between text-light w-100 p-3 rounded text-decoration-none posts_hover_bg">
          <span class="text-danger">${key.title}</span>

          <div>
            <span class="text-warning small">
              ${formatDate(key.createdAt)}
            </span>
          </div>
        </div>

        <div class="d-flex gap-2">
          <button 
            type="button" 
            class="btn btn-secondary btn-edit small focus-ring focus-ring-secondary" 
            data-id="${key._id}">
            Edit
          </button>

          <button class="btn btn-danger focus-ring focus-ring-danger btn-delete" data-id="${key._id}">Delete</button>
        </div>
      </div>
    `;

    box_posts.innerHTML = ret;
  }

  box_posts.querySelectorAll(".btn-edit").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();

      const button = e.currentTarget;
      const postId = button.dataset.id;

      box_posts.querySelectorAll(".btn-edit").forEach(otherBtn => {
        otherBtn.textContent = "Edit";
      });

      box_posts.querySelectorAll(".posts_hover_bg").forEach(post => {
        post.classList.remove("post-editing");
      });

      button.innerHTML = `
        <div class="d-flex gap-2 align-items-center">
          <span>Editing</span>
          <span 
            class="spinner-border spinner-border-sm" 
            role="status"
            aria-hidden="true">
          </span>
        </div>
      `;

      const postItem = button.closest(".post-item");
      const postHover = postItem.querySelector(".posts_hover_bg");

      postHover.classList.add("post-editing");

      render_post(posts, postId);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  });

  box_posts.querySelectorAll(".btn-delete").forEach(btn => {
    btn.onclick = async (e) => {
      e.preventDefault();

      const postId = btn.dataset.id;
      console.log("id", postId);

      await deletePost(postId);
    };
  });
}

async function render_post(posts, target) {
  const post = posts.find(p => String(p._id) === String(target));

  if (post) {
    currentEditingPostId = post._id;

    document.getElementById("title_input").value = post.title ?? "";
    document.getElementById("text_input").value = post.text ?? "";
    document.getElementById("image_link_input").value = post.imageLink ?? "";

    btn_update.onclick = () => {
      updatePosts(currentEditingPostId, {
        title: title_input.value,
        text: text_input.value,
        imageLink: image_link_input.value,
      });
    }

    console.log("Post:", post);
  }
}

async function updatePosts(id, params) {
  const response = await fetch(API_URL + "/post?news=" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  });

  if (response.ok) {
    const post = await response.json();

    console.log(post);
  }
}

async function deletePost(id) {
  const msg = confirm("¿Quieres eliminar a esta publicación?");

  if (msg) {
    const response = await fetch(API_URL + "/post?news=" + id, {
      method: "DELETE",
    });

    if (response.ok) {
      const post = response.json();

      window.location.reload()
      console.log("Post Eliminado", post);
    } else {
      console.error("Error al eliminar el post:", response.status);
      alert("No se pudo eliminar la publicación.");
    }
  }
}

async function createdPost(params) {
  const response = await fetch(API_URL + "/add_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  });

  if (response.ok) {
    const post = await response.json();
    const msg = "POST CREADO";

    alert(msg);

    window.location.reload();
    console.log("POST CREADO", post);
  }
}

async function init() {
  const response = await fetch(API_URL + "/posts");
  const posts = await response.json();

  console.log(posts);

  view_posts(posts);
  render_post(posts, id);

  btn_create.onclick = () => {
    createdPost({
      title: title_input.value,
      text: text_input.value,
      imageLink: image_link_input.value,
    })
  }
}

window.onload = init;