import { posts } from '../models/posts.js';

let box = document.getElementById('boxx');
let ret = "";
posts.reverse();

for (let post of posts) {
  ret += `
    <div class="d-flex flex-column border border-dark p-2 rounded mt-3">
        <b class="text-light fs-3">${post.title}</b>
        <hr class="border border-danger"/>
        <p style="color: darkgrey;">${post.text}</p>
        <a href="${post.imageLink}" class="d-flex justify-content-center">
            <img src="${post.imageLink}" class="rounded" style="max-width: 100%; width: 500px; box-shadow: 0px 0px 20px darkred;">
        </a>
    </div>`;
}

box.innerHTML = ret;

