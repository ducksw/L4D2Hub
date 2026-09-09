const footer = document.getElementById("footer");

footer.innerHTML = `
  <div class="d-flex flex-column" style="margin-top: 70px;">
    <div class="d-flex justify-content-between p-4 w-100 align-items-center" style="border-top: 1px solid #333; border-bottom: 1px solid #333;">
      <div class="d-flex flex-column gap-4">
        <img src="./image/title.png" alt="title" style="max-width: 100%; width: 200px;">
        <i class="text-secondary">L4D2Hub competitive</i>
      </div>
      <div class="d-flex gap-5">
        <a href="../faq.html" class="text-secondary text-decoration-none footer-link-hover">FAQ</a>
        <a href="" class="text-secondary text-decoration-none footer-link-hover">Rules</a>
        <a href="" class="text-secondary text-decoration-none footer-link-hover">Contact</a>
      </div>
    </div>

    <div class="d-flex justify-content-between p-2 w-100 mt-3" id="footer_copy">
      <span class="text-warning">© L4D2Hub</span>
      <span class="text-warning">La página web fue desarrolada por <b class="text-danger">ducks</b> y con la ayuda de <b class="text-danger">aldo</b>.</span>
      <a href="https://discord.gg/5ThYEdqYuV" class="text-light text-decoration-none small link_hover_footer" target="_blank" class="text-warning"><img src="./image/discord_icon.svg" style="max-width: 100%; width: 20px;"> Discord Group</a>
    </div>
  </div>
`;