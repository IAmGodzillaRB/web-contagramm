const itemsPerPage = 16;
let currentPage = 1;
let data = []; // Inicialmente vacío, luego se llena con los datos del CSV

// Referencias a elementos del DOM
const tableBody = document.getElementById('table-body');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const csvTable = document.getElementById('csv-table');
const fileInput = document.getElementById('csv-file');
const tableHeader = document.getElementById('table-header');

// Función para leer y procesar el archivo CSV
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const csvData = e.target.result;
    data = processCSV(csvData); // Procesa los datos del CSV
    displayPage(currentPage); // Muestra la primera página
    csvTable.classList.remove('hidden'); // Mostrar la tabla
    updatePagination(); // Actualizar los botones de paginación
  };

  reader.readAsText(file);
});

// Función para procesar el CSV (convierte el texto CSV en un array)
function processCSV(csvData) {
  const lines = csvData.split('\n').filter(line => line.trim() !== '');
  // Dividir las líneas por coma y eliminar espacios
  const parsedData = lines.map(line => line.split(',').map(cell => cell.trim()));
  
  // Establecer los encabezados dinámicamente
  setTableHeaders(parsedData[0]); // Suponemos que la primera fila contiene los encabezados

  return parsedData;
}

// Función para establecer los encabezados de la tabla
function setTableHeaders(headers) {
  tableHeader.innerHTML = ''; // Limpiar los encabezados anteriores
  headers.forEach(header => {
    const th = document.createElement('th');
    th.classList.add('py-2', 'px-4', 'border-b', 'text-start');
    th.textContent = header; // Usar el nombre de la columna como encabezado
    tableHeader.appendChild(th);
  });
}

// Función para mostrar los datos de la página actual
function displayPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(page * itemsPerPage, data.length);

  // Limpiar la tabla
  tableBody.innerHTML = '';

  // Insertar las filas correspondientes a la página actual
  for (let i = startIndex; i < endIndex; i++) {
    const row = document.createElement('tr');
    data[i].forEach(cellData => {
      const cell = document.createElement('td');
      cell.classList.add('py-2', 'px-4', 'border-b');
      cell.textContent = cellData;
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  }
}

// Función para actualizar la visibilidad de los botones de paginación
function updatePagination() {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Mostrar u ocultar los botones de paginación
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// Función para ir a la página anterior
prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
    updatePagination();
  }
});

// Función para ir a la siguiente página
nextButton.addEventListener('click', () => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
    updatePagination();
  }
});