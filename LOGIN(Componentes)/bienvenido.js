document.addEventListener("DOMContentLoaded", () => {
  // Ajustar tamaño de fuente en móviles
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


  // Obtener datos del usuario registrado
  let datosUsuario = null;
  try {
    datosUsuario = JSON.parse(localStorage.getItem("usuarioRegistrado"));
  } catch (e) {
    datosUsuario = null;
  }
  const username = (datosUsuario && datosUsuario.usuario) ? datosUsuario.usuario : (localStorage.getItem("usuarioGuardado") || "Invitado");
  const correo = (datosUsuario && datosUsuario.correo) ? datosUsuario.correo : "-";
  userInfo.innerText = `Bienvenido, ${username}`;

  const secciones = {
    Inicio: `
      <h2>Panel Principal</h2>
      <p>Explora tus herramientas de desarrollo en esta plataforma moderna.</p>
    `,
    Perfil: `
      <h2>Perfil</h2>
      <p><strong>Usuario:</strong> ${username}</p>
      <p><strong>Email:</strong> ${correo}</p>
    `,
    Lenguajes: `
      <h2>Lenguajes Dominados</h2>
      <div class="language-grid">
        <div class="language-card">
          <h3>JavaScript</h3>
          <p>Ideal para desarrollo web interactivo y frontend dinámico.</p>
        </div>
        <div class="language-card">
          <h3>Python</h3>
          <p>Potente en ciencia de datos, inteligencia artificial y automatización.</p>
        </div>
        <div class="language-card">
          <h3>Java</h3>
          <p>Ampliamente usado en aplicaciones móviles y sistemas empresariales.</p>
        </div>
        <div class="language-card">
          <h3>C++</h3>
          <p>Usado en motores de videojuegos, software de alto rendimiento y sistemas operativos.</p>
        </div>
      </div>
    `
  };

  const menuItems = document.querySelectorAll(".menu li");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      if (item.id === "logout" || item.id === "Salir") {
        localStorage.removeItem("usuarioGuardado");
        window.location.href = "index.html";
        return;
      }

      mainContent.classList.remove("slideIn");
      void mainContent.offsetWidth; // Forzar reflow
      const selected = item.dataset.content;
      mainContent.innerHTML = secciones[selected];
      sectionTitle.innerText = selected.charAt(0).toUpperCase() + selected.slice(1);
      mainContent.classList.add("slideIn");

      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Mostrar sección inicial
  mainContent.innerHTML = secciones.Inicio;
});
