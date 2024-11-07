document.getElementById('verifyButton').addEventListener('click', async function () {
    const nameInput = document.getElementById('name').value;
    const errorMessage = document.getElementById('error-message');
    const employeeDetails = document.getElementById('employeeDetails');

    // Validación del campo de entrada
    if (!nameInput) {
      errorMessage.classList.remove('hidden');
      errorMessage.textContent = 'Por favor, complete este campo.';
      return;
    } else {
      errorMessage.classList.add('hidden');
    }

    // Envío de solicitud al servidor
    try {
      const response = await fetch('http://localhost:3000/verificarEmpleado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identificador: nameInput })
      });

      const data = await response.json();

      // Mostrar resultados o mensaje de error
      employeeDetails.classList.remove('hidden');
      if (data.nombre) {
        employeeDetails.innerHTML = `
          <p>Nombre: ${data.nombre}</p>
          <p>Número de empleado: ${data.numeroEmpleado}</p>
          <p>Puesto: ${data.puesto}</p>
          <p>Activo: ${data.estado}</p>
        `;
      } else {
        employeeDetails.innerHTML = `<p>${data.mensaje}</p>`;
      }
    } catch (error) {
      employeeDetails.classList.remove('hidden');
      employeeDetails.textContent = 'Error al conectar con el servidor.';
    }
  });

  app.post('/verificarEmpleado', (req, res) => {
    const { identificador } = req.body;
    const consulta = 'SELECT * FROM base2024 WHERE NumeroEmpleado = ? OR Nombre = ?';
  
    conexion.query(consulta, [identificador, identificador], (error, resultados) => {
      if (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta de la base de datos' });
      } else if (resultados.length > 0) {
        res.json({
          nombre: resultados[0].Nombre,
          numeroEmpleado: resultados[0].NumeroEmpleado,
          puesto: resultados[0].Puesto,
          estado: resultados[0].Estado ? 'Sí' : 'No'
        });
      } else {
        res.json({ mensaje: 'No se encontró ningún empleado con ese identificador.' });
      }
    });
  });
  
  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  