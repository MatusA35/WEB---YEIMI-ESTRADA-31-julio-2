<?php
session_start();
$db = new SQLite3('usuarios.db');

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$result = $stmt->execute();
$user = $result->fetchArray(SQLITE3_ASSOC);

if ($user && password_verify($password, $user['password'])) {
  $_SESSION['user'] = $user['email'];
  header("Location: clases-protegidas.html"); // Página privada
  exit;
} else {
  echo "Correo o contraseña incorrectos.";
}
?>
