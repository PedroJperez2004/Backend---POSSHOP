# POSSHOP - Backend

Backend para un sistema de Punto de Venta (POS) construido con Node.js, Express y Sequelize.

## Descripción

Este proyecto proporciona la API backend para un sistema POS. Gestiona productos, inventario, ventas, usuarios y autenticación. Utiliza una base de datos MySQL para el almacenamiento de datos principal y Redis para la gestión de sesiones o caché.

## Características

-   Gestión de productos (CRUD)
-   Gestión de categorías e impuestos
-   Gestión de inventario
-   Registro de ventas
-   Autenticación de usuarios y autorización (JWT)
-   Carga de imágenes de productos
-   Validación de datos de entrada

## Tech Stack y Dependencias Principales

El comando `npm install` instalará todas las dependencias necesarias del archivo `package.json`. Las tecnologías y librerías clave incluyen:

-   **Entorno de Ejecución**: [Node.js](https://nodejs.org/)
-   **Framework Web**: [Express.js](https://expressjs.com/) (`express`)
-   **ORM (Object-Relational Mapping)**: [Sequelize](https://sequelize.org/) (`sequelize`) para la interacción con la base de datos.
    -   **CLI de Sequelize**: `sequelize-cli` para migraciones y seeders.
    -   **Driver de MySQL**: `mysql2`
-   **Base de Datos**: [MySQL](https://www.mysql.com/), gestionada a través de Docker.
-   **Base de Datos en Memoria**: [Redis](https://redis.io/) (`redis`), para caché o sesiones, gestionada a través de Docker.
-   **Autenticación**: [JSON Web Tokens](https://jwt.io/) (`jsonwebtoken`) para proteger las rutas.
    -   **Encriptación de Contraseñas**: `bcrypt` para el hashing seguro de contraseñas.
-   **Validación de Datos**: [Zod](https://zod.dev/) (`zod`) para asegurar la integridad de los datos de entrada.
-   **Carga de Archivos**: [Multer](https://github.com/expressjs/multer) (`multer`) para manejar la carga de imágenes.
-   **Variables de Entorno**: `dotenv` para gestionar la configuración.
-   **CORS**: `cors` para habilitar el Cross-Origin Resource Sharing.
-   **Herramientas de Desarrollo**:
    -   `nodemon`: Para reiniciar automáticamente el servidor durante el desarrollo.
-   **Contenerización**: [Docker](https://www.docker.com/) para gestionar los servicios de la base de datos.

## Prerrequisitos

Asegúrate de tener instalados los siguientes programas en tu sistema:

-   [Node.js](https://nodejs.org/) (versión 18 o superior)
-   [Docker](https://www.docker.com/get-started) y Docker Compose

## Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd <NOMBRE-DEL-DIRECTORIO>
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables. Puedes usar el archivo `.env.example` como plantilla si existe.

    ```env
    # Configuración de la Base de Datos MySQL
    DB_USER=posshop_user
    DB_PASSWORD=posshop_pass
    DB_NAME=posshop
    DB_HOST=localhost
    DB_PORT=3306

    # Configuración de Redis
    REDIS_HOST=localhost
    REDIS_PORT=6379

    # Secretos para JWT
    JWT_SECRET=tu_secreto_para_jwt
    JWT_REFRESH_SECRET=tu_secreto_para_refresh_jwt

    # Puerto de la aplicación
    PORT=3000
    ```

4.  **Iniciar los servicios de base de datos con Docker:**
    Este comando utilizará el archivo `docker-compose.yml` para iniciar los contenedores de MySQL y Redis.
    ```bash
    npm run docker
    # O directamente con docker-compose
    # docker-compose up -d
    ```

5.  **Ejecutar las migraciones de la base de datos:**
    Esto creará la estructura de tablas en tu base de datos `posshop`.
    ```bash
    npx sequelize-cli db:migrate
    ```

6.  **(Opcional) Ejecutar los seeders:**
    Esto poblará la base de datos con datos de prueba.(Solo la tienda inicial, y el usuario Admin Inicial)
    ```bash
    npx sequelize-cli db:seed:all
    ```

## Ejecutando la Aplicación

Para iniciar el servidor en modo de desarrollo (con recarga automática), ejecuta:
```bash
npm run dev
```
El servidor estará disponible en `http://localhost:3000` (o el puerto que hayas configurado en el archivo `.env`).

## Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo con `nodemon`.
-   `npm run docker`: Inicia los contenedores de Docker para Redis y MySQL definidos en `docker-compose.yml`.
-   `npm test`: (Actualmente no configurado) Ejecuta los tests.

## API Endpoints

La API está estructurada en módulos. Los principales puntos de entrada son:

-   `/auth`: Endpoints para login y manejo de tokens.
-   `/users`: Endpoints para la gestión de usuarios.
-   `/products`: Endpoints para productos (CRUD).
-   `/category`: Endpoints para categorías de productos.
-   `/taxes`: Endpoints para impuestos.
-   `/inventory`: Endpoints para la gestión de inventario.
-   `/sales`: Endpoints para el registro de ventas.
-   `/sale-items`: Endpoints para los ítems de una venta.
-   `/storage`: Sirve archivos estáticos (imágenes de productos).

## Estructura del Proyecto

El proyecto sigue una arquitectura modular para separar las responsabilidades:

```
src/
├── app.js               # Configuración principal de Express y montaje de rutas
├── server.js            # Punto de entrada, inicia el servidor HTTP
├── config/              # Configuraciones (database, auth)
├── middlewares/         # Middlewares personalizados (auth, cors, validation)
├── modules/             # Lógica de negocio, dividida por módulos
│   ├── products/
│   │   ├── controllers/ # Controladores (manejan request/response)
│   │   ├── models/      # Modelos de Sequelize
│   │   ├── repository/  # Lógica de acceso a datos
│   │   ├── routes/      # Definición de rutas
│   │   └── services/    # Lógica de negocio
│   └── ... (otros módulos como users, sales, etc.)
├── utils/               # Funciones de utilidad
storage/                 # Directorio para archivos subidos (imágenes)
migrations/              # Migraciones de Sequelize
seeders/                 # Seeders de Sequelize
```
