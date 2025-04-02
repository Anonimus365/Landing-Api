// Selecciona el elemento con la clase 'nav-links' y lo almacena en la variable 'navLinks'
const navLinks = document.querySelector('.nav-links')

// Función para alternar el menú de navegación al hacer clic en el ícono del menú
function onToggleMenu(e) {
    // Cambia el nombre del icono entre 'menu' y 'close' para reflejar el estado del menú
    e.name = e.name === 'menu' ? 'close' : 'menu'

    // Alterna la clase 'top-[9%]' en el elemento 'navLinks' para mostrar u ocultar el menú
    navLinks.classList.toggle('top-[9%]')
}