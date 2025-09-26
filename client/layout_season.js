const liga_season = document.getElementById("liga_season");

const params = new URLSearchParams(window.location.search);
const id = params.get("temp");

liga_season.innerHTML = `
    <b class="text-warning">Temporadas:</b>
    <div class="d-flex gap-1 text-dark" style="font-family: monospace;">
        <a href="seasons.html?temp=1" class="text-decoration-none text-danger n-temp" id="s_1">[1]</a> |
        <a href="liga.html" class="text-decoration-none text-danger n-temp color_glow" id="s_2">[2]</a>
    </div>
`;

const s_1 = document.getElementById("s_1");
const s_2 = document.getElementById("s_2");

if (s_2.href === window.location.href) {
    s_2.classList.add("ng");
    s_2.classList.add("color_glow");
}

if (id === "1") {
    s_2.classList.remove("color_glow");

    s_1.classList.add("ng");
    s_1.classList.add("color_glow");
}