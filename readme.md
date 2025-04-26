# Frontend Wallapop (Práctica JavaScript)

Este proyecto es una aplicación web frontend simple, similar a Wallapop, desarrollada como parte de una práctica utilizando únicamente JavaScript, HTML y CSS. La aplicación interactúa con un backend simulado proporcionado por `sparrest.js`.

## Funcionalidades Principales

* Listado de anuncios existentes.
* Ver el detalle de un anuncio específico.
* Registro de nuevos usuarios.
* Inicio de sesión de usuarios existentes (Login).
* Creación de nuevos anuncios (requiere inicio de sesión).
* Eliminación de anuncios propios (requiere inicio de sesión y ser propietario).
* Gestión de estados de interfaz (carga, error, éxito, vacío).

## Requisitos Previos

Para poder configurar y ejecutar este proyecto, necesitarás tener instalado:

* [Node.js](https://nodejs.org/) (incluye npm, el gestor de paquetes de Node).

## Configuración y Puesta en Marcha

La aplicación consta de dos partes que deben configurarse y ejecutarse: el **Backend** (simulado con `sparrest.js`) y el **Frontend** (este proyecto).

### 1. Backend (`sparrest.js`)

Este frontend necesita que el backend `sparrest.js` esté ejecutándose para funcionar.

1.  **Clona el repositorio de `sparrest.js`** (si aún no lo tienes).

2.  **Crea/Prepara el archivo `db.json`**:
    * Este proyecto requiere un archivo `db.json` dentro de la carpeta raíz de `sparrest.js`.
    * Este archivo contendrá los datos de ejemplo (anuncios, usuarios) que usará la API.

3.  **Instala las dependencias del backend**:
    
    - npm install
    
4.  **Inicia el servidor backend**:
   
    - npm start
 
    * Por defecto, el backend se ejecutará en `http://127.0.0.1:8000`. Déjalo corriendo en una terminal.

### 2. Frontend (Este Proyecto - `Frontend-Wallapop`)

1.  **Navega a la carpeta del proyecto frontend**
   
2.  **Instala las dependencias de desarrollo** (principalmente `live-server` para facilitar la ejecución):
    
    - npm install
    

## Ejecución de la Aplicación

1.  **Asegúrate de que el Backend (`sparrest.js`) esté iniciado** y corriendo en `http://127.0.0.1:8000` (ver pasos de configuración del backend).
2.  **Inicia el servidor de desarrollo para el Frontend**:
    * En la carpeta raíz del proyecto `Frontend-Wallapop`, ejecuta:
        
        - npm start
        
    * Este comando utiliza `live-server` (definido en `package.json`) para servir los archivos HTML, CSS y JS.
    * Se abrirá automáticamente una pestaña en tu navegador web predeterminado apuntando a la aplicación (normalmente en una dirección como `http://127.0.0.1:8080`). Si no se abre, revisa la salida en la terminal para ver la URL correcta.

## Uso Básico

Una vez que la aplicación esté corriendo en tu navegador:

* La página principal mostrará el **listado de anuncios**.
* Puedes hacer clic en "Ver detalle" para ver la **información completa** de un anuncio.
* Usa los botones "Iniciar Sesión" o "Registrarse" en la cabecera para acceder a esas funcionalidades.
    ejemplo: usuario: user1 contraseña: 123 // usuarios: user2 contraseña: 123

* Si **inicias sesión**, aparecerán los botones "Crear anuncio" y "Cerrar Sesión".
* Desde la página de **detalle de un anuncio**, si has iniciado sesión y eres el propietario del anuncio, verás un botón para **eliminarlo**.
* Al hacer clic en "Crear anuncio", se mostrará el **formulario de creación**. Complétalo y envíalo para añadir un nuevo anuncio.
