// Referencias a elementos
const btnVerEnVivo = document.getElementById('btnVerEnVivo');
const modalEnVivo = document.getElementById('modalEnVivo');
const cerrarEnVivo = document.getElementById('cerrarEnVivo');

const chatInput = document.getElementById('chatInput');
const enviarChat = document.getElementById('enviarChat');
const chatMessages = document.getElementById('chatMessages');

// Abrir modal y bloquear scroll
btnVerEnVivo.addEventListener('click', () => {
  modalEnVivo.style.display = 'flex';
  document.body.classList.add('modal-open'); // Bloquea scroll del body
  chatInput.focus();
});

// Cerrar modal y permitir scroll
cerrarEnVivo.addEventListener('click', () => {
  modalEnVivo.style.display = 'none';
  document.body.classList.remove('modal-open'); // Permite scroll de nuevo
  chatMessages.innerHTML = ''; // Opcional: limpiar chat al cerrar
});

// Cerrar modal si clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === modalEnVivo) {
    modalEnVivo.style.display = 'none';
    document.body.classList.remove('modal-open');
    chatMessages.innerHTML = '';
  }
});

// Enviar mensaje en chat (solo ejemplo simple)
enviarChat.addEventListener('click', () => {
  enviarMensajeChat();
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    enviarMensajeChat();
  }
});

function enviarMensajeChat() {
  const mensaje = chatInput.value.trim();
  if (mensaje === '') return;

  // Crear nuevo mensaje
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('mensaje-chat');
  msgDiv.textContent = mensaje;

  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll abajo

  chatInput.value = '';
  chatInput.focus();
}
