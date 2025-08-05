document.addEventListener("DOMContentLoaded", () => {
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