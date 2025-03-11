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

```plaintext
whatbookis/
├── frontend/                        # Código del frontend (React + Tailwind CSS)
│   ├── src/                         # Código fuente de React
│   │   ├── components/              # Componentes reutilizables
│   │   ├── pages/                   # Páginas de la aplicación
│   │   ├── App.tsx                  # Componente principal de la aplicación
│   │   └── index.tsx                # Punto de entrada de la aplicación
│   ├── package.json                 # Dependencias del frontend
│   ├── tailwind.config.js           # Configuración de Tailwind CSS
│   ├── tsconfig.json                # Configuración global de TypeScript
│   └── vite.config.mjs              # Configuración de Vite
│
├── django/                          # Código del backend (Django)
│   ├── backend/                     # Archivos y módulos de backend
│   ├── manage.py                    # Script de gestión de Django
│   ├── requirements.txt             # Dependencias del backend
│   └── settings.py                  # Configuración del proyecto Django
│
├── .gitignore                       # Archivos y carpetas ignorados por Git
├── README.md                        # Documentación del proyecto
└── venv/                            # Entorno virtual de Python
    ├── Lib/                         # Librerías del entorno virtual
    ├── Scripts/                      # Scripts del entorno virtual
    └── pyvenv.cfg                   # Configuración del entorno virtual

```



## Desarrollo 💻

Durante el desarrollo de este proyecto, he seguido los siguientes pasos clave:

1. **Planeación y diseño**: Diseñé la interfaz y la experiencia de usuario (UX) para hacerla intuitiva y atractiva.
2. **Desarrollo del backend**: Creé la API con Django REST Framework y configuré la base de datos con SQLite.
3. **Desarrollo del frontend**: Implementé la UI con React y Tailwind CSS.
4. **Integración del backend con el frontend**: Conecté el frontend de React con la API de Django mediante Fetch/Axios.

## Instalación y Configuración 🛠️

Para instalar y configurar el proyecto, sigue los pasos detallados en el [Manual de Instalación](#instalación-de-whatbookis).

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

---

# Instalación de WhatBookIs

Este manual explica cómo instalar y configurar tanto el frontend como el backend de la aplicación WhatBookIs. Sigue los pasos indicados a continuación para empezar a trabajar con el repositorio.

## 1. Instalación del Frontend

### 1.1. Descargar el repositorio

Clona el repositorio desde GitHub:

```bash
git clone https://github.com/manuelgsil/whatbookis.git
 ```
 ### 1.2. Instalar dependencias de la parte de Frontend

Accede a la carpeta Frontend dentro del repositorio:

```bash
cd whatbookis/frontend
 ```
 Asegúrate de tener Node.js instalado en tu equipo. Si no lo tienes, puedes descargarlo desde [aquí](https://nodejs.org/es).

Una vez esté todo correcto, instalamos las dependencias con
```bash
npm install
```

Generadas las carpetas de node_modules, podemos comprobar si todo ha ido bien usando 
```bash
npm run dev
```

## 2. Instalación del Backend (Django)

### 2.1. Requisitos previos
Asegúrate de tener Python instalado en tu equipo. Si no lo tienes, puedes descargar la última versión de Python desde [aquí](https://www.python.org/downloads/).

### 2.2. Crear y activar un entorno virtual
Dirígete a la carpeta Django dentro del repositorio:

```bash
cd whatbookis/django
```

Crea un entorno virtual para evitar conflictos entre dependencias globales y locales:

```bash
python -m venv venv
```
Activa este entorno

```bash
WINDOWS
python -m venv venv
MAC
source venv/bin/activate
```
### 2.3. Instalar las dependencias del backend
```bash
pip install -r requirements.txt
```

### 2.4. Verificar la instalación de Django
```bash
python -m django --version
```
### 2.5. Realizar las migraciones
Dado que el repositorio solo utiliza migraciones en la app api, debes aplicar solo las migraciones necesarias para esa app:
```bash
python manage.py migrate api
```
También puedes aplicar las globales, pero no son necesarias:
```bash
manage.py migrate
```
Para ver el estado de las migraciones:

```bash
python manage.py showmigrations
```

### 2.6. Generar el archivo .env
Crea un archivo .env a partir del archivo .env.example. Asegúrate de generar una nueva clave secreta para Django:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 2.7.Base de datos
Esta se genera automaticamente gracias a la configuracion .dev y nos proporciona un archivo .sqlite. Para obtener nuestros primeros datos usa los siguientes comandos
```bash
python manage.py importar_libros_prueba
python manage.py actualizar_libros_prueba

```

### 2.8.Levantar el servidor
Esta se genera automaticamente gracias a la configuracion .dev y nos proporciona un archivo .sqlite. Para obtener nuestros primeros datos usa los siguientes comandos
```bash
python manage.py runserver
```

Si todo ha ido bien, el servidor debería estar funcionando y podrás acceder a la aplicación en http://127.0.0.1:8000/ o del puerto que corresponda

# 3.Sugerencias

1. Asegúrate de tener todas las dependencias correctamente instaladas en tu entorno virtual antes de ejecutar los comandos.
2. Si encuentras algún error al ejecutar los comandos, revisa los logs de error para obtener más detalles y resolver el problema.
3. Para el desarrollo de nuevas funcionalidades, trabaja en una rama separada y, **cuando todo esté funcionando correctamente y hayas probado tu código**, crea una **Pull Request** al `main`. Esto garantizará que tu código sea revisado antes de fusionarlo.

