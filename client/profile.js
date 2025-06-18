var arr = JSON.parse(localStorage.getItem('profile')) || [];

function viewOnlyProfile() {
  let res = document.getElementById('res');
  let ret = `
    <div class="mx-auto bg bg-black border border-dark " style="max-width: 100%; width: 950px;">
    `
  for (let pl of arr) {
    ret += `
      <header class="d-flex justify-content-between p-3" id="header">
        <div class="d-flex gap-3">
          <img src="${pl.avatar}" class="rounded" style="max-width: 100%; width: 150px; height: 150px;">
          <span class="text-light">${pl.displayName}</span>
        </div>
        <div class="d-flex gap-2 align-items-center justify-content-center">
          <span class="fs-2 text-light">Rango</span> ${pl.rank}
        </div>
      </header>
    </div>`;
  }

  res.innerHTML = ret;
  console.log("hola");
}

viewOnlyProfile();
