const header = document.getElementById("header");
const mobile = document.getElementById("mobile");

header.innerHTML = `
    <img style="max-width: 100%; width: 200px;" src="./image/title.png">
    <nav class="d-flex flex-column" style="position: relative;">
        <div class="d-flex gap-3">
            <a href="index.html" class="text-danger text-decoration-none">[Home]</a>
            <a href="stats.html" class="text-danger text-decoration-none">[Stats]</a>
            <a href="rankings.html" class="text-danger text-decoration-none">[Rankings]</a>
            <a href="" class="text-danger text-decoration-none">[Noticias]</a>
            <div class="d-flex" id="prof" style="position: absolute; left: 100%;">
            </div>
        </div>
        <div class="d-flex gap-3">
            <a href="liga.html" class="text-danger text-decoration-none">[Liga/Champions]</a>
            <a href="teams.html" class="text-danger text-decoration-none">[Teams]</a>
            <a href="admins.html" class="text-danger text-decoration-none">[Admins]</a>
        </div>
    </nav>
`;

mobile.innerHTML = `
    <a href="" class="text-decoration-none">
        <h1 class="text-warning text-title">L4D2 Hub</h1>
    </a>
    <button class="btn btn-dark focus-ring focus-ring-secondary" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"><i class="bi bi-list"></i></button>
  </div>

  <div class="offcanvas offcanvas-top bg-gradient bg-black h-50" tabindex="-1" id="offcanvasTop"
    aria-labelledby="offcanvasTopLabel">
    <div class="offcanvas-header text-center">
        <h3 class="text-center text-warning text-title" id="offcanvasTopLabel">L4D2 Hub</h3>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <nav class="d-flex flex-column text-center">
            <div class="d-flex flex-column gap-3">
                <a href="index.html" class="text-danger text-decoration-none">[Home]</a>
                <a href="stats.html" class="text-danger text-decoration-none">[Stats]</a>
                <a href="rankings.html" class="text-danger text-decoration-none">[Rankings]</a>
                <a href="" class="text-danger text-decoration-none">[Noticias]</a>
                <a href="liga.html" class="text-danger text-decoration-none">[Liga/Champions]</a>
                <a href="teams.html" class="text-danger text-decoration-none">[Teams]</a>
                <a href="admins.html" class="text-danger text-decoration-none">[Admins]</a>
            </div>
        </nav>
    </div>
`;

const get_profile = JSON.parse(localStorage.getItem("profile"));
const prof = document.getElementById("prof");

console.log(get_profile);

let ret = "";
if (get_profile) {
    for (const key of get_profile) {
        ret += `
            <div class="d-flex align-items-center gap-2" style="margin-left: 10px;">
                <a href="${key.profileurl}" target="_blank" style="width: 30px; height: 30px;"><img src="${key.avatar}" style="max-width: 100%; width: 30px; height: 30px;" class="rounded border border-dark"></a>
                <span class="text-warning">${key.displayName}</span>
                <span class="text-dark">[<span class="text-danger">${key.elo}</span>]</span>
            </div>
        `;
    }
}
prof.innerHTML = ret;
