# Whatbookis - TFG (Desarrollo de Aplicaciones Web) 🎓

## Descripción 📚

Whatbookis es una aplicación web interactiva en la que los usuarios deben adivinar el libro basándose únicamente en su primer párrafo. El juego desafía a los jugadores a combinar su memoria y apreciación literaria para identificar libros famosos.

Este proyecto forma parte de mi Trabajo de Fin de Grado (TFG) en Desarrollo de Aplicaciones Web (DAW). He decidido realizar este proyecto como una oportunidad para aprender y poner en práctica nuevas tecnologías y herramientas, como Django, React, Tailwind CSS, y otras librerías populares.

## Tecnologías utilizadas 🛠️

### Backend:
- **Django**: Framework de Python utilizado para la gestión del backend, APIs y lógica del servidor.
- **Django REST Framework (DRF)**: Para la creación de APIs que permiten la comunicación entre el frontend y el backend.
- **SQLite**: Base de datos utilizada para almacenar los libros, usuarios y estadísticas del juego.

### Frontend:
- **React**: Utilizado para el desarrollo de la interfaz de usuario (UI) y la gestión de estados mediante hooks (useState, useEffect, etc.).
- **React Router**: Para gestionar la navegación entre diferentes páginas del proyecto.
- **Tailwind CSS**: Para la creación de una interfaz de usuario moderna y adaptativa.
- **TypeScript**: Para escribir un código más seguro y escalable, aprovechando los beneficios del tipado estático.

### API & Comunicación:
- **Django REST Framework (DRF)**: Permite que el backend de Django exponga endpoints API REST.
- **Fetch API / Axios**: Para la comunicación entre el frontend y el backend.
- **Gutendex API**: Utilizada para obtener datos de libros clásicos.

## Funcionalidades ⚙️

- **Pantalla principal**: Los usuarios pueden ver una lista de libros con su primer párrafo y tratar de adivinar el título del libro.
- **Página del quiz**: Los usuarios pueden jugar y adivinar el título del libro basándose en el primer párrafo proporcionado por la aplicación.
- **Respuestas y feedback**: Después de cada intento, la aplicación proporciona feedback sobre si la respuesta fue correcta o incorrecta.

## Estructura del proyecto 📂


## Desarrollo 💻

Durante el desarrollo de este proyecto, he seguido los siguientes pasos clave:

1. **Planeación y diseño**: Diseñé la interfaz y la experiencia de usuario (UX) para hacerla intuitiva y atractiva.
2. **Desarrollo del backend**: Creé la API con Django REST Framework y configuré la base de datos con SQLite.
3. **Desarrollo del frontend**: Implementé la UI con React y Tailwind CSS.
4. **Integración del backend con el frontend**: Conecté el frontend de React con la API de Django mediante Fetch/Axios.

## Futuras Mejoras 🚀

Algunas de las mejoras que tengo planeadas para el futuro son:

- **Mejoras en la UI/UX**: Añadir efectos visuales y animaciones.
- **Sistema de puntuaciones y ranking**: Implementar una tabla de clasificación global para los jugadores.
- **Sistema de autenticación**: Registro e inicio de sesión mediante Django con autenticación basada en tokens.
- **Nuevas categorías**: Expandir la base de datos con más géneros y estilos de libros.
- **Modo multijugador**: Incluir partidas en tiempo real o con temporizador.
- **API más robusta**: Ampliar la funcionalidad del backend con mejoras en la gestión de usuarios y contenido.
- **Administración**: Se integrará el panel de administración de Django para gestionar libros, usuarios y partidas.



## Autor ✒️

Manuel Guillén

GitHub: [manuelgsil](https://github.com/manuelgsil)

## Licencia 📄

Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

¡Gracias por visitar el repositorio de Whatbookis! 🎉 Espero que disfrutes del juego. 🚀
