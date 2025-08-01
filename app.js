function login() {
  const user = document.getElementById('usuario').value;
  const pass = document.getElementById('clave').value;

  // Cambia por las credenciales que desees
  if (user === 'usuario' && pass === '1234') {
    sessionStorage.setItem('logueado', 'true');
    window.location.href = 'recetario.html';
  } else {
    document.getElementById('mensaje').textContent = 'Usuario o contraseña incorrectos';
  }
}
