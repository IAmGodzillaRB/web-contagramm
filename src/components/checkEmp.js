// Función para verificar al empleado
function checkEmployee() {
    const identificador = document.getElementById('name').value;
  
    // Validar que el campo no esté vacío
    if (!identificador) {
      alert("Por favor ingrese un nombre o número de empleado.");
      return;
    }
  
    // Hacer la solicitud al backend para verificar el empleado
    fetch('http://localhost:3000/verificarEmpleado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identificador: identificador })
    })
    .then(response => response.json())
    .then(data => {
      if (data.nombre) {
        // Mostrar los detalles del empleado en el modal
        const modal = document.getElementById('modal');
        const employeeDetails = document.getElementById('employeeDetails');
        
        employeeDetails.innerHTML = `
          <strong>Nombre:</strong> ${data.nombre}<br>
          <strong>Numero de Empleado:</strong> ${data.numeroEmpleado}<br>
          <strong>Puesto:</strong> ${data.puesto}<br>
          <strong>Activo:</strong> ${data.activo}
        `;
        modal.classList.remove('hidden'); // Mostrar el modal
      } else {
        alert('Empleado no encontrado');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema con la verificación.');
    });
  }
  
  // Asignar la función al botón
  document.getElementById('verifyButton').addEventListener('click', checkEmployee);
  
  // Función para cerrar el modal
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
  });
  