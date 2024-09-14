# 📖 Libreta de Direcciones Avanzada Frontend



## 🛠 Tecnologías Utilizadas
- **Front:** Angular CLI version 18.2.4.

---

## ✨ Descripción
- Esta aplicación web es una libreta de direcciones digital que permite a los usuarios crear y administrar contactos. Los contactos pueden incluir múltiples teléfonos, correos electrónicos y direcciones. La aplicación utiliza Angular para el frontend y se comunica con una API REST para la gestión de datos.

---

## ✨ Características
- Crear, editar y eliminar contactos.
- Añadir múltiples teléfonos, correos electrónicos y direcciones para cada contacto.
- Filtros de búsqueda para encontrar contactos por nombre, empresa o ciudad.
- Diseño intuitivo y adaptable para mejorar la experiencia del usuario.

## ✨ Requisitos
- Node.js (v20.17.0 o superior)
- npm (v10.8.2 o superior)
- Angular CLI (v18.2.4)

## 🚀 Instrucciones de Instalación

###  Clonar el Repositorio

- git clone https://github.com/ulises933/libreta-direcciones-frontend.git
- cd libreta-direcciones-frontend

### 🧰 Instalar las Dependencias

- npm install

--------------------------------------------------------------------------------------------------------

### 📚 Configuración 
* ### Configurar el Backend: 
Asegúrate de que el backend (API REST) esté en funcionamiento. Las URL de los endpoints deben coincidir con las utilizadas en el frontend (por defecto, se utilizan las siguientes URL):

* Obtener todos los contactos: http://localhost:8000/api/contactos?page=1
* Buscar por nombre: http://localhost:8000/api/contactos/buscar/nombre/{nombre}
* Buscar por empresa: http://localhost:8000/api/contactos/buscar/empresa/{empresa}
* Buscar por ciudad: http://localhost:8000/api/contactos/buscar/ciudad/{ciudad}
* Obtener un contacto por ID: http://localhost:8000/api/contactos/{id}
* Crear un nuevo contacto: http://localhost:8000/api/contactos

### Configurar la API en Angular:

* Modifica los endpoints en los servicios de Angular (contact.service.ts) si es necesario, para que coincidan con tu configuración de backend.
    
--------------------------------------------------------------------------------------------------------

🌐 Uso
* Ejecutar la Aplicación: Inicia el servidor de desarrollo de Angular:
* ng serve
* Abre tu navegador web y navega a http://localhost:4200.

🌐 Interfaz de Usuario:

- En la pantalla principal, puedes buscar contactos utilizando el filtro de búsqueda.
- Utiliza los botones "Agregar Contacto" para abrir el formulario y añadir un nuevo contacto con detalles como nombre, notas, teléfonos, emails y direcciones.
- La aplicación permite añadir, editar y eliminar teléfonos, correos electrónicos y direcciones en tiempo real.
- Guarda los cambios utilizando el botón "Guardar Contacto".
--------------------------------------------------------------------------------------------------------
### Estructura de la Aplicación
- La aplicación está organizada en varios componentes para mantener el código modular y reutilizable:

- * components: Contiene los componentes principales de la aplicación como contact-list, add-contact, contact-detail, etc.
- * services: Contiene los servicios que interactúan con la API REST.
- * models: Contiene las interfaces de TypeScript para definir la estructura de datos como Contact, Telefono, Email, Direccion.


--------------------------------------------------------------------------------------------------------

🤝 Contribuir
- ¡Las contribuciones son bienvenidas! Para contribuir:

- Haz un fork del repositorio.
- Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
- Haz tus cambios y realiza commits (git commit -m 'Agregar nueva funcionalidad').
- Haz push a tu rama (git push origin feature/nueva-funcionalidad).
- Abre un pull request.
