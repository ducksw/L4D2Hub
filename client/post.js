import { posts } from '../models/posts.js';

let box = document.getElementById('boxx');
let ret = "";
for (let post of posts) {
  ret += `
  <div class="anun2">
    <a href="" class="title-anun"><b>${post.title}</b></a>
    <p>${post.parr}</p>
    <a href="${post.image}"><img src="${post.image}"></a>
    <p>Publicado el: <b class="highlight-red">${post.fecha}</b></p>
    </div>
    <br/>
  `
}
box.innerHTML = ret
