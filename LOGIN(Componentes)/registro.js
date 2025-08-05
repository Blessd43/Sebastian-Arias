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
  const inputs = document.querySelectorAll(".input");
  const submitBtn = document.querySelector(".submit");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const usuario = inputs[0].value.trim();
    const correo = inputs[1].value.trim();
    const contraseña = inputs[2].value.trim();


    if (!usuario || !correo || !contraseña) {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    // Validar que el correo contenga '@'
    if (!correo.includes("@")) {
      alert("⚠️ El correo debe contener el símbolo '@'.");
      return;
    }

    // Validar que la contraseña tenga al menos 4 caracteres
    if (contraseña.length < 4) {
      alert("⚠️ La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    // Guardar los datos en localStorage
    const datosUsuario = {
      usuario,
      correo,
      contraseña
    };

    localStorage.setItem("usuarioRegistrado", JSON.stringify(datosUsuario));

    alert("✅ Cuenta creada correctamente.");
    window.location.href = "index.html"; // Redirige al login
  });
});