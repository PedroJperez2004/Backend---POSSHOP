# 🛍️ POSSHOP - Backend API

API RESTful que sirve como el núcleo del sistema de Punto de Venta (POS) **POSSHOP**. Este proyecto está diseñado y desplegado con un enfoque en escalabilidad, rendimiento y mantenibilidad, utilizando un stack de tecnologías modernas.

---

## 🎯 Funcionalidades Principales

Este backend gestiona toda la lógica de negocio y la persistencia de datos para la aplicación:

-   👤 **Módulo de Autenticación y Usuarios:**
    -   Registro y login de usuarios.
    -   Autenticación basada en **JSON Web Tokens (JWT)** para proteger las rutas.
    -   Refresh tokens para una gestión de sesión segura y persistente.

-   📦 **Gestión de Inventario:**
    -   CRUD completo para Productos.
    -   Administración de Categorías de productos e Impuestos aplicables.
    -   Lógica para el control de stock.

-   📈 **Módulo de Ventas:**
    -   Creación y registro de transacciones de venta.
    -   Generación de reportes de ventas (futura implementación).

-   🖼️ **Gestión de Medios:**
    -   Subida de imágenes de productos desacoplada del servidor, gestionada enteramente por un servicio externo.

---

## 🏗️ Arquitectura y Despliegue en Producción

El proyecto está construido pensando en un entorno de producción real, separando las responsabilidades y utilizando servicios gestionados para optimizar el rendimiento y la disponibilidad.

-   **Hosting del Backend:**
    -   La API está alojada en **Render**. El código fuente está sincronizado desde un repositorio de GitHub.
    -   El despliegue de nuevas versiones se realiza de forma **manual** desde el panel de control de Render. Este método se utiliza para tener un control estricto sobre las actualizaciones que llegan a producción, permitiendo una validación final antes de cada lanzamiento.

-   **Base de Datos:**
    -   Utiliza **Aiven** para hospedar una base de datos **MySQL gestionada**. Esto elimina la necesidad de administrar la infraestructura de la base de datos y garantiza alta disponibilidad y backups automáticos.

-   **Caché en Memoria:**
    -   Implementa **Redis** a través de **Upstash** como servicio de caché. Se utiliza para almacenar en caché respuestas de API frecuentes, reduciendo la latencia y la carga sobre la base de datos principal.

-   **Almacenamiento de Imágenes:**
    -   La subida de imágenes de productos se maneja con **Cloudinary**. Las imágenes se envían directamente desde el cliente o a través del servidor al servicio de Cloudinary, evitando almacenar archivos en el sistema de ficheros del contenedor de Render. Esto mejora la escalabilidad y velocidad de entrega de contenido.

---

## 💻 Pila Tecnológica (Stack)

| Componente | Tecnología | Razón de la Elección |
| :--- | :--- | :--- |
| 🟢 **Runtime** | **Node.js** | Entorno de ejecución asíncrono y de alto rendimiento para APIs. |
| ⚫ **Framework** | **Express.js** | Framework minimalista y robusto para la creación de APIs en Node.js. |
| 🗃️ **Base de Datos** | **Aiven for MySQL** | Servicio de base de datos gestionada que provee una instancia de MySQL robusta, escalable y con backups automatizados. |
| 🐘 **ORM** | **Sequelize** | ORM maduro que facilita la interacción con la base de datos SQL. |
| ⚡ **Caché** | **Upstash (Redis)** | Redis como servicio (serverless) para una caché rápida y de baja latencia sin gestión de servidores. |
| ☁️ **Imágenes** | **Cloudinary**| Plataforma líder para la gestión de medios que optimiza y distribuye imágenes globalmente (CDN). |
| 🔐 **Seguridad** | **JWT & bcrypt** | Estándares de la industria para la autenticación y el hashing seguro de contraseñas. |
| 📜 **Validación** | **Zod** | Validación de esquemas con inferencia de tipos estáticos, asegurando la integridad de los datos. |

---

## 📄 Licencia

Este proyecto es de mi propiedad y sirve como demostración de mis habilidades.
