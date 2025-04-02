// Esperar a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", async () => {
    const usersList = document.getElementById("usersList");
    const searchInput = document.getElementById("searchInput");

    // Simulación de obtener datos de una API
    const fetchUsers = async () => {
        return [
            { name: "Maria Lopez", country: "Mexico", photo: "https://randomuser.me/api/portraits/women/1.jpg" },
            { name: "Carlos Perez", country: "Spain", photo: "https://randomuser.me/api/portraits/men/2.jpg" },
            { name: "Ana Torres", country: "Argentina", photo: "https://randomuser.me/api/portraits/women/3.jpg" },
            { name: "Jorge Ramirez", country: "Colombia", photo: "https://randomuser.me/api/portraits/men/4.jpg" },
            { name: "Lucia Gomez", country: "Chile", photo: "https://randomuser.me/api/portraits/women/5.jpg" },
            { name: "Pedro Fernandez", country: "Peru", photo: "https://randomuser.me/api/portraits/men/6.jpg" },
            { name: "Elena Rojas", country: "Ecuador", photo: "https://randomuser.me/api/portraits/women/7.jpg" },
            { name: "Daniel Ortega", country: "Venezuela", photo: "https://randomuser.me/api/portraits/men/8.jpg" },
            { name: "Sofia Martinez", country: "Uruguay", photo: "https://randomuser.me/api/portraits/women/9.jpg" },
            { name: "Ricardo Suarez", country: "Brazil", photo: "https://randomuser.me/api/portraits/men/10.jpg" },
            { name: "Andrea Castro", country: "Paraguay", photo: "https://randomuser.me/api/portraits/women/11.jpg" },
            { name: "Fernando Vega", country: "Bolivia", photo: "https://randomuser.me/api/portraits/men/12.jpg" },
            { name: "Gabriela Diaz", country: "Costa Rica", photo: "https://randomuser.me/api/portraits/women/13.jpg" },
            { name: "Hector Mendoza", country: "Panama", photo: "https://randomuser.me/api/portraits/men/14.jpg" },
            { name: "Laura Fernandez", country: "Mexico", photo: "https://randomuser.me/api/portraits/women/15.jpg" },
            { name: "Antonio Ruiz", country: "Spain", photo: "https://randomuser.me/api/portraits/men/16.jpg" },
            { name: "Valeria Santos", country: "Argentina", photo: "https://randomuser.me/api/portraits/women/17.jpg" },
            { name: "Diego Castillo", country: "Colombia", photo: "https://randomuser.me/api/portraits/men/18.jpg" },
            { name: "Patricia Mendez", country: "Chile", photo: "https://randomuser.me/api/portraits/women/19.jpg" }
        ];
    };

    // Obtener la lista de usuarios simulada
    const users = await fetchUsers();

    /**
     * Función que muestra los usuarios en la pantalla.
     * @param {Array} filteredUsers - Lista de usuarios filtrados para mostrar
     */
    const displayUsers = (filteredUsers) => {
        usersList.innerHTML = ""; // Limpiar el contenido anterior
        filteredUsers.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card"); // Agregar clase CSS para los estilos
            userCard.innerHTML = `
                <img src="${user.photo}" alt="User Photo" class="user-photo">
                <p class="user-name">${user.name}</p>
                <p class="user-country">${user.country}</p>
            `;
            usersList.appendChild(userCard);
        });
    };

    /**
     * Evento para filtrar la lista de usuarios en base a la entrada del usuario.
     */
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase(); // Convertir la búsqueda a minúsculas
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchValue));
        displayUsers(filteredUsers);
    });

    // Mostrar la lista inicial de usuarios
    displayUsers(users);
});
