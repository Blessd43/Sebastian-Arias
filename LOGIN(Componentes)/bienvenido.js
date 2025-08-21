document.addEventListener("DOMContentLoaded", () => {
  // Responsive font
  function ajustarFuenteResponsive() {
    if (window.innerWidth <= 700) {
      document.body.style.fontSize = '15px';
    } else {
      document.body.style.fontSize = '';
    }
  }
  window.addEventListener('resize', ajustarFuenteResponsive);
  ajustarFuenteResponsive();

  const sectionTitle = document.getElementById("sectionTitle");
  const mainContent = document.getElementById("mainContent");
  const userInfo = document.getElementById("userInfo");

  // Usuario
  let datosUsuario = null;
  try {
    datosUsuario = JSON.parse(localStorage.getItem("usuarioRegistrado"));
  } catch (e) {
    datosUsuario = null;
  }
  const username = (datosUsuario && datosUsuario.usuario) ? datosUsuario.usuario : (localStorage.getItem("usuarioGuardado") || "Invitado");
  const correo = (datosUsuario && datosUsuario.correo) ? datosUsuario.correo : "-";
  userInfo.innerText = `Bienvenido, ${username}`;

  // Juegos de ejemplo (imágenes siempre visibles)
  const juegos = [
    { id: 1, nombre: "CyberStrike", precio: 29.99, img: "https://placehold.co/300x180/181818/ff3c3c?text=CyberStrike" },
    { id: 2, nombre: "Pixel Quest", precio: 19.99, img: "https://placehold.co/300x180/181818/ff3c3c?text=Pixel+Quest" },
    { id: 3, nombre: "Racing Thunder", precio: 24.99, img: "https://placehold.co/300x180/181818/ff3c3c?text=Racing+Thunder" },
    { id: 4, nombre: "Fantasy World", precio: 39.99, img: "https://placehold.co/300x180/181818/ff3c3c?text=Fantasy+World" },
    { id: 5, nombre: "Space Odyssey", precio: 34.99, img: "https://placehold.co/300x180/181818/ff3c3c?text=Space+Odyssey" },
    { id: 6, nombre: "Battle Arena", precio: 27.99, img: "https://placehold.co/300x180/181818/ff3c3c?text=Battle+Arena" },
    { id: 7, nombre: "Retro Mania", precio: 14.99, img: "https://placehold.co/300x180/181818/ff3c3c?text=Retro+Mania" },
    { id: 8, nombre: "Zombie Escape", precio: 22.99, img: "https://placehold.co/300x180/181818/ff3c3c?text=Zombie+Escape" }
  ];

  // Carrito en localStorage
  function getCarrito() {
    return JSON.parse(localStorage.getItem("carritoJuegos") || "[]");
  }
  function setCarrito(carrito) {
    localStorage.setItem("carritoJuegos", JSON.stringify(carrito));
  }

  // Secciones
  const secciones = {
    Blog: `
      <h2>Blog Gamer</h2>
      <div>
        <h3 style="color:#ff5e5e;">¡Bienvenido a GamerZone!</h3>
        <p>Descubre noticias, reseñas y novedades del mundo gamer. Explora nuestro catálogo y compra tus juegos favoritos.</p>
        <ul>
          <li><b>CyberStrike:</b> Nuevo DLC disponible.</li>
          <li><b>Pixel Quest:</b> ¡Actualización de niveles!</li>
          <li><b>Racing Thunder:</b> Torneo semanal abierto.</li>
        </ul>
      </div>
    `,
    Catalogo: `
      <h2>Catálogo de Juegos</h2>
      <div class="language-grid" id="catalogoJuegos"></div>
    `,
    Carrito: `
      <h2>Carrito de Compras</h2>
      <div id="carritoJuegos"></div>
    `,
    Perfil: `
      <h2>Perfil</h2>
      <p><strong>Usuario:</strong> ${username}</p>
      <p><strong>Email:</strong> ${correo}</p>
    `
  };

  // Render catálogo
  function renderCatalogo() {
    const grid = document.getElementById("catalogoJuegos");
    if (!grid) return;
    const carrito = getCarrito();
    grid.innerHTML = juegos.map(j => {
      const enCarrito = carrito.some(c => c.id === j.id);
      return `
        <div class="language-card">
          <img src="${j.img}" alt="${j.nombre}" style="width:100%;border-radius:8px;margin-bottom:10px;">
          <h3>${j.nombre}</h3>
          <p>Precio: $${j.precio}</p>
          <button class="btnAddCarrito" data-id="${j.id}" ${enCarrito ? "disabled" : ""} style="margin-top:10px;background:${enCarrito ? "#888" : "#ff3c3c"};color:#fff;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;">
            ${enCarrito ? "Agregado" : "Agregar al carrito"}
          </button>
        </div>
      `;
    }).join("");
    grid.querySelectorAll(".btnAddCarrito").forEach(btn => {
      btn.onclick = () => {
        let carrito = getCarrito();
        const id = Number(btn.dataset.id);
        const juego = juegos.find(j => j.id === id);
        if (!carrito.some(j => j.id === id)) {
          carrito.push(juego);
          setCarrito(carrito);
          renderCatalogo();
        }
      };
    });
  }

  // Render carrito
  function renderCarrito() {
    const div = document.getElementById("carritoJuegos");
    if (!div) return;
    let carrito = getCarrito();
    if (carrito.length === 0) {
      div.innerHTML = "<p>El carrito está vacío.</p>";
      return;
    }
    div.innerHTML = carrito.map(j => `
      <div style="display:flex;align-items:center;margin-bottom:15px;background:#262626;padding:10px;border-radius:8px;">
        <img src="${j.img}" alt="${j.nombre}" style="width:60px;height:60px;border-radius:8px;margin-right:15px;">
        <div style="flex:1;">
          <b>${j.nombre}</b><br>
          <span>Precio: $${j.precio}</span>
        </div>
        <button class="btnQuitar" data-id="${j.id}" style="background:#ff3c3c;color:#fff;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;">Quitar</button>
      </div>
    `).join("") + `
      <div style="margin-top:20px;">
        <b>Total: $${carrito.reduce((a,b)=>a+b.precio,0).toFixed(2)}</b>
        <button id="btnComprar" style="margin-left:20px;background:#ff5e5e;color:#fff;border:none;padding:8px 20px;border-radius:8px;cursor:pointer;">Comprar y Descargar</button>
      </div>
    `;
    div.querySelectorAll(".btnQuitar").forEach(btn => {
      btn.onclick = () => {
        let carrito = getCarrito().filter(j => j.id !== Number(btn.dataset.id));
        setCarrito(carrito);
        renderCarrito();
      };
    });
    div.querySelector("#btnComprar").onclick = () => {
      let carrito = getCarrito();
      if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
      }
      let nombre = prompt("Ingrese su nombre para la compra:");
      if (!nombre) {
        alert("Debe ingresar su nombre.");
        return;
      }
      let email = prompt("Ingrese su correo electrónico:");
      if (!email || !email.includes("@")) {
        alert("Debe ingresar un correo válido.");
        return;
      }
      alert(`¡Gracias por tu compra, ${nombre}! Tus juegos están listos para descargar (simulado).`);
      setCarrito([]);
      renderCarrito();
    };
  }

  // Navegación
  const menuItems = document.querySelectorAll(".menu li");
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      if (item.id === "logout" || item.id === "Salir") {
        localStorage.removeItem("usuarioGuardado");
        window.location.href = "index.html";
        return;
      }
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      const selected = item.dataset.content;
      mainContent.classList.remove("slideIn");
      void mainContent.offsetWidth;
      mainContent.innerHTML = secciones[selected];
      sectionTitle.innerText = selected.charAt(0).toUpperCase() + selected.slice(1);
      mainContent.classList.add("slideIn");
      // Render dinámico
      if (selected === "Catalogo") renderCatalogo();
      if (selected === "Carrito") renderCarrito();
    });
  });

  // Mostrar sección inicial (Blog)
  mainContent.innerHTML = secciones.Blog;
  sectionTitle.innerText = "Blog";
});
