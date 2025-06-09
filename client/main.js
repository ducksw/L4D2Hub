import { posts } from '../models/posts.js';

function onlyNews() {
  let only = document.getElementById('only');
  let ret = `<div class="border border-dark w-100 p-2 rounded">
        <b class="d-flex justify-content-center fs-5 rounded bg-gradient bg-dark p-2 w-100">Ultimas Noticias</b>
        `;
  const onlyPost = [...posts].reverse().slice(0,1);

  onlyPost.forEach((post) => {
    ret += `
      <div class="mt-2">
          <h4>${post.title}</h4>
          <p style="color: darkgrey;">${post.text}</p>
          <img src="${post.imageLink}" style="display: flex; max-width: 100%; width: 300px; margin: auto;">
      </div>
  </div>
    `

    only.innerHTML = ret;
    console.log(post.title);
  });
}

onlyNews();
