document.addEventListener("DOMContentLoaded", () => {
  // Mejorar experiencia en móviles: hacer scroll al enfocar inputs
  const allInputs = document.querySelectorAll('input');
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
  const form = document.getElementById("recuperarForm");
  const emailInput = document.getElementById("email");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (!usuarioRegistrado) {
      alert("❌ No hay usuarios registrados.");
      return;
    }

    if (email === usuarioRegistrado.correo) {
      alert(`✅ Solicitud recibida. Se ha enviado un correo a ${email} para recuperar tu contraseña.`);
      // Aquí podrías implementar lógica real de envío de email si tienes backend.
    } else {
      alert("❌ El correo no coincide con ninguna cuenta registrada.");
    }
  });
});
