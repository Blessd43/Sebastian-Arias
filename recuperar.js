document.addEventListener("DOMContentLoaded", () => {
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
