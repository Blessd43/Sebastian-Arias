document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("userInfo");
  const username = localStorage.getItem("usuarioGuardado") || "Invitado";
  userInfo.innerText = `Sesión iniciada como: ${username}`;

  const contenido = document.getElementById("contenido");
  const titulo = document.getElementById("titulo");

  const secciones = {
    inicio: `<h2>¡Bienvenido a mi pagina!</h2>
      <p>Explora la plataforma para descubrir herramientas útiles para desarrolladores y entusiastas de la programación.</p>`,

    usuario: `<h2>👤 Perfil de Usuario</h2>
      <p>Nombre de usuario: <strong>${username}</strong></p>
      <p>Correo asociado: ${username.toLowerCase()}@correo.com (ficticio)</p>`,

    lenguajes: `<h2>🧠 Lenguajes de Programación</h2>
      <p><strong>JavaScript:</strong> Ideal para crear páginas web interactivas.</p>
      <p><strong>Python:</strong> Ampliamente usado en ciencia de datos, automatización y desarrollo web.</p>
      <p><strong>Java:</strong> Muy usado en apps móviles y sistemas empresariales.</p>
      <p><strong>C++:</strong> Potente para sistemas operativos, videojuegos y software de alto rendimiento.</p>`
  };

  function mostrarSeccion(id) {
    contenido.innerHTML = secciones[id];
    titulo.innerText = id.charAt(0).toUpperCase() + id.slice(1);
  }

  // Carga por defecto
  mostrarSeccion("inicio");

  // Botones del panel lateral
  const botones = document.querySelectorAll(".sidebar li");
  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.id === "logout") {
        localStorage.removeItem("usuarioGuardado");
        window.location.href = "index.html";
        return;
      }

      botones.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      mostrarSeccion(btn.dataset.content);
    });
  });
});
