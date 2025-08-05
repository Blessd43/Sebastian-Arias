document.addEventListener("DOMContentLoaded", () => {
  // Mejorar experiencia en móviles: hacer scroll al enfocar inputs
  const allInputs = document.querySelectorAll('.input');
  allInputs.forEach(input => {
    input.addEventListener('focus', () => {
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    });
  });

  // Ajustar tamaño de fuente en móviles
  function ajustarFuenteResponsive() {
    if (window.innerWidth <= 600) {
      document.body.style.fontSize = '15px';
    } else {
      document.body.style.fontSize = '';
    }
  }
  window.addEventListener('resize', ajustarFuenteResponsive);
  ajustarFuenteResponsive();
  const usuarioInput = document.querySelectorAll(".input")[0];
  const passwordInput = document.querySelectorAll(".input")[1];
  const submitBtn = document.querySelector(".submit");
  const recordarCheck = document.getElementById("check");

  // Cargar usuario recordado si existe
  if (localStorage.getItem("usuarioGuardado")) {
    usuarioInput.value = localStorage.getItem("usuarioGuardado");
    recordarCheck.checked = true;
  }

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const usuario = usuarioInput.value.trim();
    const contraseña = passwordInput.value.trim();

    if (!usuario || !contraseña) {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (!usuarioRegistrado) {
      alert("❌ No hay usuarios registrados. Crea una cuenta primero.");
      return;
    }

    // Validar usuario y contraseña ingresados contra los datos guardados
    if (
      usuario === usuarioRegistrado.usuario &&
      contraseña === usuarioRegistrado.contraseña
    ) {
      if (recordarCheck.checked) {
        localStorage.setItem("usuarioGuardado", usuario);
      } else {
        localStorage.removeItem("usuarioGuardado");
      }

      alert(`✅ Bienvenido, ${usuario}`);
      window.location.href = "bienvenido.html";
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }
  });
});

