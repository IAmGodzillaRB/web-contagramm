const express = require('express');
const mysql = require('mysql2');

const cors = require('cors');
app.use(cors());

// Datos de conexión a la base de datos en Hostinger
const conexion = mysql.createConnection({
  host: 'mysql.hostinger.com',  // Cambiar al host correcto proporcionado por Hostinger
  user: 'u327591908_Contagramm', // Tu usuario de base de datos
  password: 'Cmr@cmr@2023',      // Tu contraseña de base de datos
  database: 'u327591908_Asesores', // Nombre de la base de datos
  port: 3306                    // El puerto de MySQL
});

// Verificar la conexión
conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Crear la aplicación Express
const app = express();
app.use(express.json()); // Para manejar peticiones con JSON

// Ruta para verificar al empleado
app.post('/verificarEmpleado', (req, res) => {
  const identificador = req.body.identificador;

  if (!identificador) {
    return res.status(400).json({ message: "El identificador es obligatorio." });
  }

  // Consultar a la base de datos
  const query = `SELECT * FROM base_colaboradores_ene_2024_1 WHERE NumeroEmpleado = ? OR Nombre = ?`;

  conexion.execute(query, [identificador, identificador], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al verificar el empleado." });
    }

    if (results && results.length > 0) {
      const empleado = results[0];
      return res.json({
        nombre: empleado.Nombre,
        numeroEmpleado: empleado.NumeroEmpleado,
        puesto: empleado.Puesto,
        activo: empleado.Estado ? 'Sí' : 'No',
      });
    } else {
      return res.status(404).json({ message: "Empleado no encontrado." });
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
