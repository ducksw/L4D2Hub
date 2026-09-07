const header_admin = document.getElementById("header_admin");
const nav_bar = document.getElementById("nav_bar");

header_admin.innerHTML = `
  <div class="d-flex justify-content-between bg bg-black p-3 border-bottom border-danger">
    <div>
      <span class="text-danger fs-4">L4D2hub <b class="text-warning color_glow">panel</b></span>
    </div>
    <div>
      <span>OSI</span>
    </div>
  </div>
`;

nav_bar.innerHTML = `
  <div class="d-flex flex-column bg bg-black p-2 gap-1 sidebar border-end border-dark" style="max-width: 100%; width: 250px;">
    <a href="panel.html" class="d-flex gap-2 nav-link p-2"><img src="../image/dashboard_icon.svg">Dashboard</a>
    <a href="../panel_players.html" class="d-flex gap-2 nav-link p-2"><img src="../image/users_icon.svg">Players</a>
    <a href="../panel_posts.html" class="d-flex gap-2 nav-link p-2"><img src="../image/news_icon.svg">Posts</a>
    <a href="" class="d-flex gap-2 nav-link p-2"><img src="../image/game_icon.svg">Matches</a>
    <a href="" class="d-flex gap-2 nav-link p-2"><img src="../image/poll_icon.svg">Poll</a>
  </div>
`;

const currentPath = window.location.pathname;
const links = nav_bar.querySelectorAll(".nav-link");

links.forEach(link => {
  const rawHref = link.getAttribute("href");
  
  if (!rawHref) return;

  const fileName = rawHref.split("/").pop();

  if (fileName && currentPath.includes(fileName)) {
    link.classList.add("active");
  } else if ((currentPath === "/" || currentPath.endsWith("/")) && fileName === "panel.html") {
    link.classList.add("active");
  }
});