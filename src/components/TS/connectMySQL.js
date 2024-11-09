
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';


const app = express();
const PORT = 3306;

app.use(express.json());
app.use(cors());

// Configuración de conexión a la base de datos
let conexion = mysql.createConnection({
  host: '127.0.0.1',
  user: 'u327591908_Contagramm',
  password: 'Cmr@cmr@2023',
  database: 'u327591908_Asesores'
});

// Verificar la conexión a la base de datos
conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Ruta para verificar el empleado
