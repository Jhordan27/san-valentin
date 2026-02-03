const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/* ============================
   INDEX: Botón NO que huye
   ============================ */
(() => {
  const noArea = document.getElementById("noArea");
  const btnNo = document.getElementById("btnNo");

  // Si no estamos en index.html, no hacemos nada
  if (!noArea || !btnNo) return;

  let pos = { x: 0, y: 0 };

  const placeNoButton = (x, y) => {
    pos.x = x;
    pos.y = y;
    btnNo.style.left = `${pos.x}px`;
    btnNo.style.top = `${pos.y}px`;
  };

  const init = () => {
    const r = noArea.getBoundingClientRect();
    placeNoButton(r.width / 2, r.height / 2);
  };

  window.addEventListener("resize", init);
  init();

  noArea.addEventListener("mousemove", (e) => {
    const area = noArea.getBoundingClientRect();
    const mx = e.clientX - area.left;
    const my = e.clientY - area.top;

    const bw = btnNo.offsetWidth;
    const bh = btnNo.offsetHeight;

    const bx = pos.x;
    const by = pos.y;

    const dx = mx - bx;
    const dy = my - by;
    const dist = Math.hypot(dx, dy);

    const dangerRadius = 90;

    if (dist < dangerRadius) {
      const nx = dx / (dist || 1);
      const ny = dy / (dist || 1);

      const push = (dangerRadius - dist) * 0.9;

      let nextX = bx - nx * push;
      let nextY = by - ny * push;

      const pad = 8;
      const minX = pad + bw / 2;
      const maxX = area.width - pad - bw / 2;
      const minY = pad + bh / 2;
      const maxY = area.height - pad - bh / 2;

      nextX = clamp(nextX, minX, maxX);
      nextY = clamp(nextY, minY, maxY);

      placeNoButton(nextX, nextY);
    }
  });

  btnNo.addEventListener("click", () => {
    alert("¡Uy! Casi 😅 Intenta otra vez...");
  });
})();

/* ============================
   SI.HTML: Mini galería
   ============================ */
(() => {
  const slide = document.getElementById("slide");
  const cap = document.getElementById("cap");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  if (!slide || !cap || !prev || !next) return;

  const photos = [
    { src: "img/juntos2.jpg", cap: "Un recuerdo bonito ✨" },
    { src: "img/juntos3.jpg", cap: "Contigo todo se siente mejor 💜" },
    { src: "img/juntos1.jpg", cap: "Mi lugar favorito es contigo 💖" }
  ];

  let i = 0;

  const render = () => {
    slide.style.opacity = "0";
    setTimeout(() => {
      slide.src = photos[i].src;
      cap.textContent = photos[i].cap;
      slide.style.opacity = "1";
    }, 140);
  };

  slide.style.transition = "opacity 0.18s ease";
  render();

  prev.addEventListener("click", () => {
    i = (i - 1 + photos.length) % photos.length;
    render();
  });

  next.addEventListener("click", () => {
    i = (i + 1) % photos.length;
    render();
  });
})();
