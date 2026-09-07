import { API_URL } from "./config.js";
import { formatDate } from "./helpers.js";

const stat_player = document.getElementById("stat_player");
const stat_post = document.getElementById("stat_post");
const stat_match = document.getElementById("stat_match");
const stat_poll = document.getElementById("stat_poll");

async function latest_players(players) {
  const latest_player = document.getElementById("latest_player");

  let ret = `
    <div class="d-flex flex-column bg bg-black p-2 rounded border border-dark">
      <div class="d-flex justify-content-between align-items-center w-100">
        <div class="d-flex align-items-center gap-2">
          <img src="../image/users_icon.svg" style="max-width: 100%; width: 30px;">
          <span class="text-warning">Latest Players</span>
        </div>
        <div>
          <a href="panel_players.html" class="btn btn-warning focus-ring focus-ring-warning">Add Player</a>
        </div>
      </div>
  `

  ret += `
    <table class="table-dark w-100 mt-4">
    <thead>
      <tr class="text-center border-bottom border-dark text-danger">
        <th scope="col">#</th>
        <th scope="col">Profile</th>
        <th scope="col">Name</th>
        <th scope="col">Steam Id</th>
      </tr>
    </thead>
  `
  players.reverse().slice(0,3).forEach((player, index) => {
    ret += `
      <tr class="text-center">
        <th class="p-3" scope="row">${index + 1}</th>
        <td><a href="${player.profileurl}" target="_blank"><img src="${player.avatar}" class="rounded" style="max-width: 100%; width: 25px;"></a></td>
        <td class="text-light">${player.displayName}</td>
        <td class="text-warning">${player.steamId}</td>
      </tr>
    `;
  });

  ret += `
    </div>
  `
  latest_player.innerHTML = ret;

}

async function latest_news(posts) {
  const latest_news = document.getElementById("latest_news");


  let ret = `
    <div class="d-flex flex-column bg bg-black rounded border border-dark mt-4">
      <div class="d-flex justify-content-between title_custom align-items-center">
        <div>
          <img src="../image/news_icon.svg" style="max-width: 100%; width: 30px;">
          <span class="text-warning">Latest Post</span>
        </div>

        <div>
          <a href="panel_posts.html" class="btn btn-danger focus-ring focus-ring-danger">Add Post</a>
        </div>
      </div>

      <div class="d-flex flex-column">
        <span></span>
      </div>
  `
  posts.reverse().slice(0,1).forEach((post) => {
    ret += `
      <div class="d-flex flex-column p-2">
        <span class="text-danger fs-5 fw-bold">${post.title}</span>
        <div class="mt-1">
          <img src="../image/clock_icon.svg">
          <span class="text-secondary">${formatDate(post.createdAt)}</span>
        </div>
        <p class="text-light mt-2">${post.text}</p>
      </div>
    `
  });

  ret += `
    </div>
  `

  latest_news.innerHTML = ret;

}

async function init() {
  const response = await fetch(API_URL + "/players");
  const responsePost = await fetch(API_URL + "/posts");
  const responseMatch = await fetch(API_URL + "/match");

  const players = await response.json();
  const posts = await responsePost.json();
  const matchs = await responseMatch.json();

  stat_player.innerHTML = players.length;
  stat_post.innerHTML = posts.length;
  stat_match.innerHTML = matchs.length;
  stat_poll.innerHTML = "0";

  latest_players(players);
  latest_news(posts);
}

window.onload = init;
