// URL de la API que devuelve usuarios aleatorios
const API_URL = 'https://randomuser.me/api/?results=40';

// Referencias a elementos del DOM que vamos a manipular
const userList = document.getElementById('userList'); // Aquí mostraremos los perfiles
const searchInput = document.getElementById('searchInput'); // Input de búsqueda
const modal = document.getElementById('modal'); // Modal para mostrar detalles del perfil
const modalContent = document.getElementById('modalContent'); // Contenedor del contenido del modal
const closeModal = document.getElementById('closeModal'); // Botón para cerrar el modal

// Array para guardar la lista original de usuarios que nos da la API
let users = [];

// Cuando el DOM haya cargado completamente, ejecutamos estas funciones:
window.addEventListener('DOMContentLoaded', () => {
  fetchUsers(); // Llamamos a la API para obtener usuarios
  searchInput.addEventListener('input', handleSearch); // Escuchamos cuando el usuario escribe
  closeModal.addEventListener('click', () => modal.classList.add('hidden')); // Cerramos el modal cuando hace clic en la X
});

// Función para obtener los datos de la API
function fetchUsers() {
  fetch(API_URL)
    .then(res => res.json()) // Convertimos la respuesta en JSON
    .then(data => {
      users = data.results; // Guardamos los usuarios en la variable global
      renderUsers(users); // Llamamos a la función para mostrarlos en pantalla
    })
    .catch(err => {
      // Si hay un error, lo mostramos en consola y en el HTML
      console.error('Error al obtener usuarios:', err);
      userList.innerHTML = `<p class="text-red-500">Error al cargar usuarios</p>`;
    });
}

// Función que renderiza los usuarios en tarjetas
function renderUsers(userArray) {
  userList.innerHTML = ''; // Limpiamos cualquier contenido previo

  if (userArray.length === 0) {
    // Si no hay resultados, mostramos mensaje
    userList.innerHTML = '<p class="text-center col-span-full">No se encontraron resultados.</p>';
    return;
  }

  // Por cada usuario, creamos una tarjeta dinámica
  userArray.forEach(user => {
    const card = document.createElement('div'); // Creamos un nuevo div
    card.className = 'bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer transition duration-300'; // Clases de Tailwind para estilo y animación

    // Añadimos contenido HTML dentro de la tarjeta
    card.innerHTML = `
      <img src="${user.picture.medium}" alt="Avatar" class="rounded-full w-20 h-20 mx-auto mb-2">
      <h3 class="text-center font-semibold">${user.name.first} ${user.name.last}</h3>
      <p class="text-center text-sm text-gray-600">${user.email}</p>
    `;

    // Al hacer clic en una tarjeta, mostramos el modal con más detalles
    card.addEventListener('click', () => showUserModal(user));

    // Finalmente añadimos esta tarjeta al contenedor principal
    userList.appendChild(card);
  });
}

// Esta función maneja la búsqueda de usuarios
function handleSearch(e) {
  const term = e.target.value.toLowerCase(); // Obtenemos el valor del input y lo pasamos a minúscula

  // Filtramos los usuarios por nombre o email que coincida con la búsqueda
  const filtered = users.filter(user =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term)
  );

  renderUsers(filtered); // Volvemos a renderizar la lista con los resultados filtrados
}

// Esta función muestra el modal con los detalles del usuario
function showUserModal(user) {
  // Creamos el contenido dinámicamente
  modalContent.innerHTML = `
    <div class="text-center">
      <img src="${user.picture.large}" alt="Avatar" class="rounded-full w-24 h-24 mx-auto mb-4">
      <h2 class="text-xl font-bold">${user.name.first} ${user.name.last}</h2>
      <p class="text-gray-600 mb-2">${user.email}</p>
      <p class="text-sm">Edad: ${user.dob.age}</p>
      <p class="text-sm">Género: ${user.gender}</p>
      <p class="text-sm">País: ${user.location.country}</p>
    </div>
  `;

  // Mostramos el modal removiendo la clase que lo oculta
  modal.classList.remove('hidden');
}
