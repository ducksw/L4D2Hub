import { API_URL } from "./config.js";

const res_table = document.getElementById("res_table");

async function render_table(maps) {
  let ret = `<table class="table-dark w-100">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
  `;

  maps.forEach((map, index) => {
    ret += `
      <tr class="text-center">
        <th class="p-3" scope="row">${index + 1}</th>
        <td>${map.name}</td>
        <td>${map.description}</td>
      </tr>
    `;
  });

  res_table.innerHTML = ret;
}

async function init() {
  const response = await fetch(API_URL + "/maps");
  const maps = await response.json();

  render_table(maps);
}

init();
