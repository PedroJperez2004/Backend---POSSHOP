# 🛍️ POSSHOP - Sistema de Punto de Venta (Backend)

![Estado del Proyecto: En Producción](https://img.shields.io/badge/Estado-En_Producci%C3%B3n-brightgreen?style=for-the-badge)

## 📝 Descripción

**POSSHOP** es el backend de un sistema de Punto de Venta (POS) senciilo y escalable. Esta API REST maneja desde la autenticación de usuarios y la gestión de productos hasta el control de inventario y el procesamiento de ventas.

Este proyecto representa la **primera versión funcional** de la plataforma, y aunque **ya se encuentra en un entorno de producción**, se mantiene en **desarrollo activo**. Esto significa que esoty trabajando en nuevas características, optimizaciones y mejoras para hacer de POSSHOP una solución aún más completa.

## ✨ Características Principales

*   **🔐 Autenticación y Autorización:** Sistema seguro basado en JSON Web Tokens (JWT) para proteger las rutas y gestionar los roles de los usuarios.
*   **📦 Gestión de Productos:** CRUD completo para productos, categorías e impuestos.
*   **🖼️ Almacenamiento de Imágenes:** Carga de imágenes de productos a servicios en la nube (Cloudinary) a través de `multer`, pero en local se guardarán en los archivos de tu computador.
*   **📈 Control de Inventario:** Seguimiento de stock en tiempo real para cada producto.
*   **💸 Procesamiento de Ventas:** Lógica para registrar ventas y los artículos correspondientes, actualizando el inventario automáticamente.
*   **🛡️ Validación de Datos:** Uso de `Zod` para validar los datos de entrada en las solicitudes, garantizando la integridad de la información.
*   **📋 Auditoría:** Registro de logs para eventos importantes en el sistema.

## 🚀 Tecnologías Utilizadas

Este proyecto utiliza un stack de tecnologías moderno y eficiente para garantizar el mejor rendimiento.

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

### **Base de Datos**
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### **Herramientas y Otros**
![JSON Web Tokens](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)

## 🔧 Puesta en Marcha Local

Para correr este proyecto en tu máquina local, sigue esta guía paso a paso.

### **1. Prerrequisitos**

Asegúrate de tener instalado el siguiente software:

*   **Node.js:** Versión 18 o superior.
*   **npm:** Generalmente se instala con Node.js.
*   **Docker:** Para correr los servicios de base de datos. Si no lo tienes, [instálalo desde la web oficial](https://docs.docker.com/get-docker/).

### **2. Guía de Instalación**

Sigue estos comandos en tu terminal:

1.  **Clona el repositorio y entra al directorio:**
    ```bash
    git clone git@github.com:PedroJperez2004/Backend---POSSHOP.git
    cd POSSHOP-Desarrollo
    ```

2.  **Instala todas las dependencias del proyecto:**
    Esto instalará Express, Sequelize, y todo lo necesario que está definido en `package.json`.
    ```bash
    npm install
    ```

3.  **Inicia los servicios de base de datos con Docker:**
    Este comando (definido en `package.json`) levantará los contenedores de MySQL y Redis.
    ```bash
    npm run docker
    ```

4.  **Crea y configura las variables de entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto. Copia el contenido de abajo y ajústalo si es necesario (aunque las credenciales por defecto deberían funcionar con el setup de Docker).
    ```dotenv
    # Server Configuration
    PORT=3000
    HOST=http://localhost:3000

    # Database (MySQL)
    DB_USER=root
    DB_PASSWORD=root
    DB_HOST=localhost
    DB_NAME=posshop
    DB_PORT=3306

    # Authentication (JWT)
    JWT_SECRET=your_super_secret_jwt_key
    JWT_REFRESH_SECRET=your_super_secret_refresh_key

    # Redis
    REDIS_URL=redis://localhost:6379
    NODE_ENV=development

5.  **Ejecuta las migraciones de la base de datos:**
    Este comando creará toda la estructura de tablas en la base de datos MySQL que Docker acaba de iniciar.
    ```bash
    npx sequelize-cli db:migrate
    ```

6.  **(Recomendado) Puebla la base de datos con datos de prueba:**
    ```bash
    npx sequelize-cli db:seed:all
    ```

7.  **¡Inicia el servidor!**
    ```bash
    npm run dev
    ```

8.  **Inicia Sesión con el Usuario de Prueba**
    Después de poblar la base de datos, se crea un usuario por defecto para que puedas empezar a probar la API. Puedes usar estas credenciales para obtener un token de autenticación:

    *   **email:** `user@gmail.com`
    *   **password:** `@12345User`

    > **Nota:** Estas credenciales están definidas en el seeder `20251225140340-users.cjs`. Puedes modificarlas en ese archivo si lo deseas antes de poblar la base de datos.

¡Y listo! 🎉 La API estará funcionando en `http://localhost:3000` y conectada a todos los servicios.

## 🔩 Funcionalidades Detalladas

### 👤 Roles y Permisos

El sistema define dos roles de usuario con diferentes niveles de acceso para garantizar la seguridad y la correcta segregación de funciones.

*   **Administrador**: Tiene acceso total a todas las funcionalidades del sistema. Este rol está diseñado para la gestión integral de la tienda.
*   **Empleado**: Tiene permisos limitados, enfocados exclusivamente en las operaciones diarias de venta y consulta. No puede crear, editar ni borrar recursos.

| Funcionalidad | Administrador | Empleado |
| :--- | :---: | :---: |
| **Gestión de Usuarios** (Crear, Asignar roles) | ✅ | ❌ |
| **Gestión de Tienda** | ✅ | ❌ |
| **CRUD de Productos** | ✅ | ❌ |
| **CRUD de Categorías** | ✅ | ❌ |
| **CRUD de Impuestos** | ✅ | ❌ |
| **Gestión de Inventario** | ✅ | ❌ |
| **Crear Ventas** | ✅ | ✅ |
| **Ver Historial de Ventas** | ✅ | ✅ |
| **Listar Productos y Categorías**| ✅ | ✅ |

Cualquier intento de acceder a una funcionalidad no permitida devolverá un error `403 Forbidden`.

### 🔐 Gestión de Usuarios

La gestión de usuarios es una parte central de la seguridad del sistema.

*   **Crear Usuarios**: Solo los **Administradores** pueden crear nuevos usuarios y asignarles un rol.
*   **Login y Refresh Token**: El sistema utiliza un esquema de autenticación con dos tokens:
    *   **Access Token**: Un token de corta duración para acceder a los recursos protegidos.
    *   **Refresh Token**: Un token de larga duración que se usa para obtener un nuevo `access token` sin que el usuario tenga que volver a iniciar sesión.
*   **Activar / Desactivar Usuarios**: (Funcionalidad futura) Se planea implementar la capacidad de desactivar usuarios sin eliminarlos de la base de datos.

### 🧾 Ventas

El módulo de ventas está diseñado para ser rápido y eficiente.

*   **Registro de Múltiples Productos**: Permite registrar una venta con uno o varios productos en una sola transacción.
*   **Cálculo Automático**: Los totales, subtotales e impuestos se calculan automáticamente en el backend.
*   **Actualización de Stock**: El inventario de cada producto vendido se descuenta automáticamente para mantener el stock sincronizado en tiempo real.
*   **Relación Venta-Usuario**: Cada venta queda asociada al usuario (empleado o administrador) que la procesó, permitiendo auditorías y seguimiento.

### ⚠️ Manejo de Errores

La API utiliza un sistema estandarizado para comunicar errores de forma clara.

*   **Respuestas de Error Estándar**:
    *   `400 Bad Request`: Datos de entrada inválidos.
    *   `401 Unauthorized`: Autenticación requerida.
    *   `403 Forbidden`: Permisos insuficientes para el recurso.
    *   `404 Not Found`: Recurso no encontrado.
    *   `500 Internal Server Error`: Error inesperado en el servidor.
*   **Validaciones con Zod**: Antes de procesar cualquier solicitud, se valida la estructura y los tipos de datos con `Zod`. Si la validación falla, se devuelve un error `400` con un mensaje detallado que especifica qué campos son incorrectos.

### 🔌 Integraciones

*   **Bases de Datos en Docker**: Para el entorno de desarrollo local, las dependencias de la base de datos se gestionan fácilmente con Docker:
    *   **MySQL**: Almacena toda la información persistente (productos, usuarios, ventas, etc.).
    *   **Redis**: Se utiliza para gestionar la lista de `refresh tokens` invalidados, lo que mejora la seguridad al permitir el cierre de sesión forzado.
    Ambos servicios se inician con el comando `npm run docker`.

## 🎯 Acerca de este Proyecto

Este es un proyecto personal desarrollado con el objetivo de aplicar y demostrar habilidades en el desarrollo de software backend. Se ha puesto especial atención en implementar funcionalidades complejas y seguir buenas prácticas de la industria, como:

*   **Separación de Competencias:** Lógica de negocio, acceso a datos y controladores claramente definidos (Servicios, Repositorios, Controladores).
*   **Seguridad:** Implementación de autenticación, autorización y validación de datos.
*   **Gestión de Entorno:** Uso de variables de entorno para una configuración segura y flexible.
*   **ORM y Migraciones:** Gestión profesional de la base de datos con Sequelize.

## 🌐 Despliegue en Producción

Actualmente, los servicios en producción están distribuidos de la siguiente manera:

*   **Base de Datos (MySQL):** Aiven
*   **Redis:** Upstash
*   **Cuerpo del Proyecto (Backend):** Render
