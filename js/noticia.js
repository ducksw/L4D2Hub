import { posts } from "../models/news.js";

const view_post = document.getElementById("post_view");
const list_news = document.getElementById("list_news");
const params = new URLSearchParams(window.location.search);
const id = params.get("news");

async function renderPost(key) {
    title_post.innerHTML = key.title;
    let ret = "";

    ret += `<title>L4D2 Hub | ${key.title}</title>`
    if (key.imageLink) {
        ret += `
            <div class="d-flex flex-column">
                <p class="text-light">${key.text}</p>
                <a href="${key.imageLink}"><img src="${key.imageLink}" class="rounded" style="max-width: 100%; width: 350px;"></a>
            </div>
        `;
    } else {
        ret += `
            <div class="d-flex flex-column">
                <p class="text-light">${key.text}</p>
            </div>
        `;
    }

    view_post.innerHTML = ret;
}

async function otherNews(new_id, title, imageLink) {
    let ret = "";
    ret += `
        <div class="d-flex flex-column">
            <a href="noticia.html?news=${new_id}" class="d-flex gap-2 text-decoration-none link-warning align-items-center">
                <img src="${imageLink}" class="rounded" style="width: 50px; height: 50px;">
                <span>${title}</span>
            </a>
        </div>
    `;

    list_news.innerHTML += ret;
}

async function init() {
    for (const key of posts) {
        if (key._id === id) {
            for (const news of posts.reverse()) {
                otherNews(news._id, news.title, news.imageLink);
            }
            renderPost(key);
        }
    }

}

window.onload = init;