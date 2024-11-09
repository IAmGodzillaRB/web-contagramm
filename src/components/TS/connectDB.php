<?php
$servidor = "127.0.0.1";
$usuario = "u327591908_Contagramm";
$contraseña = "Cmr@cmr@2023";
$base_de_datos = "u327591908_Asesores";
$conexion = new mysqli($servidor, $usuario, $contraseña, $base_de_datos);


// Verifica conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Obtén el parámetro de la solicitud
$nombre = $_POST['name'];

$sql = "SELECT * FROM colaboradores WHERE Nombre = ? OR Id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $nombre, $nombre); // Asume que el ID es un número entero
$stmt->execute();
$result = $stmt->get_result();

$data = [];
if ($result->num_rows > 0) {
  $data = $result->fetch_assoc();
}

echo json_encode($data);

$stmt->close();
$conn->close();

echo "Nombre"

?>

