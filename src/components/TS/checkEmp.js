//import { db, app, analytics, query, where, getDocs, collection } from "./connectFirebase";
import Swal from 'sweetalert2'

document.getElementById("verifyButton").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const errorMessage = document.getElementById("error-message");
  
  if (name) {
    const response = await fetch("connectDB.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ name: name }),
    });

    const colaborador = await response.json();
    if (colaborador && colaborador.Id) {
      showModal(colaborador);
    } else {
      Swal.fire({
        title: '¡Ups!',
        text: '¡Colaborador no encontrado!',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d33',
      });
    }
  } else {
    errorMessage.textContent = "Por favor, ingrese un nombre o número de colaborador";
    errorMessage.classList.remove("hidden");
  }
});

function showModal(colaborador) {
  const modal = document.getElementById("modal");
  const modalHeader = document.getElementById("modal-header");
  const modalIcon = document.getElementById("modal-icon");
  const modalIconPath = document.getElementById("modal-icon-path");
  const modalTitle = document.getElementById("modal-title");
  const nameField = document.getElementById("modal-name");
  const collaboratorNumberField = document.getElementById("modal-collaborator-number");
  const positionField = document.getElementById("modal-position");
  const statusField = document.getElementById("modal-status");
  const iconContainer = document.getElementById("modal-icon-container"); 

  if (nameField && collaboratorNumberField && positionField && statusField) {
    nameField.textContent = colaborador.Nombre;
    collaboratorNumberField.textContent = colaborador.Id;
    positionField.textContent = colaborador.Puesto;
    statusField.textContent = colaborador.Estatus ? "Activo" : "Inactivo";

    // Cambiar el estilo y el ícono dependiendo del estado
    if (colaborador.Estatus) {
      // Colaborador activo
      modalHeader.classList.remove("bg-red-100");
      modalHeader.classList.add("bg-green-100");
      modalTitle.textContent = "¡Colaborador Activo!";
      modalIcon.classList.remove("bg-red-600");
      modalIcon.classList.add("bg-green-600");
      iconContainer.classList.remove("bg-red-600"); // Eliminar color rojo si es activo
      iconContainer.classList.add("bg-green-600");
      
      modalIcon.innerHTML = `<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                              </svg>`; // Palomita verde
    } else {
      // Colaborador inactivo
      modalHeader.classList.remove("bg-green-100");
      modalHeader.classList.add("bg-red-100");
      modalTitle.textContent = "¡Colaborador Inactivo!";
      modalIcon.classList.remove("bg-green-600");
      modalIcon.classList.add("bg-red-600");
      iconContainer.classList.remove("bg-green-600"); // Eliminar color verde si está inactivo
      iconContainer.classList.add("bg-red-600"); 
      modalIcon.innerHTML = `<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>`; // X roja
    }

    modal.classList.remove("hidden"); // Mostrar el modal
  } else {
    console.error("Faltan elementos del modal.");
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
}

async function getColaboradorByName(name) {
  const q = query(collection(db, "colaboradores"), where("Nombre", "==", name));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  const colaboradores = [];
  querySnapshot.forEach((doc) => {
    colaboradores.push({ id: doc.id, ...doc.data() });
  });

  return colaboradores;
}

// Al final del archivo, aseguramos que closeModal sea accesible globalmente
window.closeModal = closeModal;
