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

  // Videojuegos reales con descripción breve y atractiva y nuevas imágenes
  const juegos = [
    {
      id: 1,
      nombre: "Minecraft",
      precio: 26.95,
      img: "https://www.mobygames.com/images/covers/l/363275-minecraft-playstation-4-edition-xbox-one-front-cover.png",
      descripcion: "Construye, explora y sobrevive en el mundo de bloques más famoso. ¡Creatividad y diversión sin límites!"
    },
    {
      id: 2,
      nombre: "Grand Theft Auto V",
      precio: 29.99,
      img: "https://tse3.mm.bing.net/th/id/OIP.XnY39z8vEhz3wBnEhST1IgHaJD?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      descripcion: "Vive la acción y la libertad en Los Santos. Tres historias, un mundo abierto y diversión garantizada."
    },
    {
      id: 3,
      nombre: "The Witcher 3: Wild Hunt",
      precio: 19.99,
      img: "https://tse2.mm.bing.net/th/id/OIP.7-BDYGbncGnVvbrHDTEB8QHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      descripcion: "Aventura épica, decisiones impactantes y un mundo lleno de misterios. Sé Geralt y vive la mejor fantasía RPG."
    },
    {
      id: 4,
      nombre: "FIFA 23",
      precio: 39.99,
      img: "https://fifauteam.com/images/covers/fifa23/small/standard-cg.webp",
      descripcion: "El fútbol más realista y emocionante. Compite, crea tu equipo y siente la pasión del deporte rey."
    },
    {
      id: 5,
      nombre: "Call of Duty: Modern Warfare II",
      precio: 59.99,
      img: "https://pics.filmaffinity.com/call_of_duty_modern_warfare_ii-915289579-large.jpg",
      descripcion: "Acción intensa, gráficos de última generación y multijugador competitivo. ¡Vive la guerra moderna!"
    },
    {
      id: 6,
      nombre: "Fortnite",
      precio: 0.00,
      img: "https://tse1.mm.bing.net/th/id/OIP.ofbhJULpKnSLiSFGjOz0OgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      descripcion: "El battle royale más popular. Construye, compite y personaliza tu estilo en partidas llenas de acción."
    },
    {
      id: 7,
      nombre: "Red Dead Redemption 2",
      precio: 49.99,
      img: "https://preview.redd.it/rdr2-art-covers-drawn-by-ai-v0-g14ogsd11kla1.jpg?width=960&format=pjpg&auto=webp&s=1fd5a37f613f930d5af236bdcd74dcd9b5e115e4",
      descripcion: "Explora el salvaje oeste, vive una historia inolvidable y disfruta de paisajes impresionantes."
    },
    {
      id: 8,
      nombre: "League of Legends",
      precio: 0.00,
      img: "https://tse3.mm.bing.net/th/id/OIP.LpYpUK1dV_YzIZgmADi7wQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      descripcion: "El MOBA más jugado. Elige tu campeón, compite en equipo y escala posiciones en partidas estratégicas."
    }
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
        <h3 style="color:#ff5e5e;">¡Descubre nuestros juegos destacados!</h3>
        <ul>
          <li><b>Minecraft:</b> Construye y explora mundos infinitos. ¡La creatividad no tiene límites!</li>
          <li><b>GTA V:</b> Vive la acción y la aventura en Los Santos, con misiones y libertad total.</li>
          <li><b>The Witcher 3:</b> Embárcate en una épica aventura llena de monstruos y misterios.</li>
          <li><b>FIFA 23:</b> Siente la emoción del fútbol con gráficos y jugabilidad de última generación.</li>
          <li><b>Red Dead Redemption 2:</b> Explora el salvaje oeste y vive una historia inolvidable.</li>
        </ul>
        <h3 style="color:#ff5e5e;margin-top:25px;">Opiniones de nuestros usuarios</h3>
        <div style="background:#232323;padding:15px 18px;border-radius:10px;margin-bottom:10px;display:flex;align-items:center;">
          <img src="https://www.mobygames.com/images/covers/l/363275-minecraft-playstation-4-edition-xbox-one-front-cover.png" alt="Minecraft" style="width:36px;height:36px;border-radius:6px;margin-right:12px;">
          <div>
            <b>Juan P. sobre Minecraft:</b>
            <p style="margin:0;">"¡Es el mejor juego para jugar con amigos y dejar volar la imaginación! 10/10."</p>
          </div>
        </div>
        <div style="background:#232323;padding:15px 18px;border-radius:10px;margin-bottom:10px;display:flex;align-items:center;">
          <img src="https://tse2.mm.bing.net/th/id/OIP.7-BDYGbncGnVvbrHDTEB8QHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="The Witcher 3" style="width:36px;height:36px;border-radius:6px;margin-right:12px;">
          <div>
            <b>Laura G. sobre The Witcher 3:</b>
            <p style="margin:0;">"La historia y los personajes son increíbles. Nunca me aburro de explorar su mundo."</p>
          </div>
        </div>
        <div style="background:#232323;padding:15px 18px;border-radius:10px;margin-bottom:10px;display:flex;align-items:center;">
          <img src="https://fifauteam.com/images/covers/fifa23/small/standard-cg.webp" alt="FIFA 23" style="width:36px;height:36px;border-radius:6px;margin-right:12px;">
          <div>
            <b>Carlos S. sobre FIFA 23:</b>
            <p style="margin:0;">"El modo online es súper competitivo y los gráficos están geniales. ¡Muy recomendado!"</p>
          </div>
        </div>
        <div style="background:#232323;padding:15px 18px;border-radius:10px;display:flex;align-items:center;">
          <img src="https://preview.redd.it/rdr2-art-covers-drawn-by-ai-v0-g14ogsd11kla1.jpg?width=960&format=pjpg&auto=webp&s=1fd5a37f613f930d5af236bdcd74dcd9b5e115e4" alt="Red Dead Redemption 2" style="width:36px;height:36px;border-radius:6px;margin-right:12px;">
          <div>
            <b>Andrea M. sobre Red Dead Redemption 2:</b>
            <p style="margin:0;">"La ambientación del oeste es espectacular. Es como estar en una película."</p>
          </div>
        </div>
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
      <div class="user-card">
        <div class="user-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="user-info">
          <p class="user-name"><strong>${username}</strong></p>
          <p class="user-email"><i class="fas fa-envelope"></i> ${correo}</p>
        </div>
      </div>
    `
  };

  // Modal para mostrar información del juego
  function crearModalJuego(juego) {
    // Elimina cualquier modal anterior
    let modal = document.getElementById("modalJuego");
    if (modal) modal.remove();

    modal = document.createElement("div");
    modal.id = "modalJuego";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.8)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";

    // Ajuste: modal más pequeño, scroll interno si el contenido es largo
    modal.innerHTML = `
      <div style="
        background:#222;
        padding:24px 18px 18px 18px;
        border-radius:16px;
        max-width:340px;
        width:95vw;
        max-height:90vh;
        color:#fff;
        position:relative;
        box-shadow:0 0 30px #000;
        overflow-y:auto;
        display:flex;
        flex-direction:column;
        align-items:center;
      ">
        <button id="cerrarModalJuego" style="position:absolute;top:10px;right:15px;background:none;border:none;color:#ff3c3c;font-size:22px;cursor:pointer;">&times;</button>
        <img src="${juego.img}" alt="${juego.nombre}" style="width:90%;max-width:180px;border-radius:10px;margin-bottom:15px;">
        <h2 style="color:#ff5e5e;font-size:1.3em;text-align:center;">${juego.nombre}</h2>
        <p style="margin-bottom:10px;font-size:0.98em;text-align:center;max-height:120px;overflow-y:auto;">
          ${juego.descripcion.length > 320 ? juego.descripcion.slice(0, 320) + '...' : juego.descripcion}
        </p>
        <p style="margin-bottom:0.5em;"><b>Precio:</b> $${juego.precio}</p>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("cerrarModalJuego").onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  }

  // Render catálogo
  function renderCatalogo() {
    const grid = document.getElementById("catalogoJuegos");
    if (!grid) return;
    const carrito = getCarrito();
    grid.innerHTML = juegos.map(j => {
      const enCarrito = carrito.some(c => c.id === j.id);
      return `
        <div class="language-card" data-id="${j.id}" style="cursor:pointer;">
          <img src="${j.img}" alt="${j.nombre}" style="width:100%;border-radius:8px;margin-bottom:10px;">
          <h3>${j.nombre}</h3>
          <p>Precio: $${j.precio}</p>
          <button class="btnAddCarrito" data-id="${j.id}" ${enCarrito ? "disabled" : ""} style="margin-top:10px;background:${enCarrito ? "#888" : "#ff3c3c"};color:#fff;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;">
            ${enCarrito ? "Agregado" : "Agregar al carrito"}
          </button>
        </div>
      `;
    }).join("");
    // Evento para mostrar info al hacer clic en la tarjeta (excepto el botón)
    grid.querySelectorAll(".language-card").forEach(card => {
      card.onclick = (e) => {
        if (e.target.classList.contains("btnAddCarrito")) return;
        const id = Number(card.dataset.id);
        const juego = juegos.find(j => j.id === id);
        crearModalJuego(juego);
      };
    });
    // Evento para agregar al carrito
    grid.querySelectorAll(".btnAddCarrito").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
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
