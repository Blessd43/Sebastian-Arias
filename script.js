document.addEventListener("DOMContentLoaded", () => {
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
