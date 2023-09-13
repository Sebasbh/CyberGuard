# CyberGuard

## Descripción
El proyecto "CyberGuard (Práctica de Desarrollo Seguro)" se enfoca en mejorar la seguridad en el envío de formularios en el sitio web `rovikron.web.app`. El proyecto se divide en dos componentes principales: el cliente y el servidor.

En el lado del cliente, buscamos desarrollar un clon de la página de contacto utilizando React.js y aplicar medidas de seguridad, como la integración de ReCaptcha de Google, la implementación de campos ocultos para detectar bots y la validación de datos en el lado del cliente para garantizar que los campos tengan dimensiones y formatos correctos. También prestamos atención a la protección contra ataques XSS y bots.

En el lado del servidor, elegimos Node.js como tecnología y establecemos requisitos para el almacenamiento seguro de datos de contacto. Esto incluye la validación de campos contra ataques XSS y SQL Injection, así como la implementación de un middleware para prevenir ataques de fuerza bruta. Además, creamos un panel de administración con autenticación y roles de usuario que permite la gestión de registros y usuarios.

En resumen, el objetivo del proyecto es garantizar la seguridad en el manejo de formularios en el sitio web `rovikron.web.app` mediante la implementación de medidas de seguridad tanto en el lado del cliente como en el lado del servidor, utilizando tecnologías modernas y buenas prácticas de desarrollo seguro. La elección de las tecnologías específicas y la base de datos depende de las preferencias y requisitos del proyecto.

## Objetivos
1. Desarrollar un clon de la página de contacto del sitio web `rovikron.web.app` utilizando React.js.
2. Mejorar la seguridad en el envío de formularios del sitio web, tanto en el lado del cliente como en el lado del servidor.
3. Integrar ReCaptcha de Google en el formulario del lado del cliente para proteger contra bots y actividades maliciosas.
4. Implementar campos ocultos en el formulario del lado del cliente para detectar posibles bots y prevenir el envío no autorizado de datos.
5. Realizar una validación de datos en el lado del cliente para garantizar que los campos del formulario cumplan con dimensiones y formatos correctos, incluyendo requisitos específicos para campos como email, nombre, asunto y mensaje.
6. Aplicar medidas de seguridad en el lado del cliente para protegerse contra ataques XSS (Cross-Site Scripting) y bots, incluyendo la validación y el escape de cadenas peligrosas.
7. Utilizar Node.js como tecnología del lado del servidor para gestionar los datos de contacto de los usuarios.
8. Almacenar de forma segura los datos de contacto en una base de datos, utilizando un ORM (Object-Relational Mapping) que permita una gestión eficiente.
9. Validar los campos que provienen del formulario contra ataques XSS y SQL Injection (SQLi) para garantizar la seguridad de los datos almacenados.
10. Implementar un middleware en la ruta del servidor para prevenir ataques de fuerza bruta, limitando el número de peticiones aceptadas por IP.
11. Crear un panel de administración con autenticación y roles de usuario, diferenciando entre Administradores y Usuarios.
12. Permitir a los Administradores realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) de usuarios desde el panel de administración.
13. Permitir a los Usuarios visualizar los registros almacenados en la base de datos desde el panel de administración.
14. Aplicar hashing a las contraseñas de los usuarios para garantizar su cifrado y seguridad.
15. Implementar JSON Web Tokens (JWT) para el sistema de inicio de sesión, almacenando información relevante en los tokens, como el ID del usuario, el rol y la fecha de expiración.
16. Garantizar la elección de tecnologías y base de datos específicas según las preferencias y requisitos del proyecto.

## Por qué es importante realizar este proyecto
**Seguridad del Usuario**: Mejorar la seguridad en el envío de formularios en un sitio web es fundamental para proteger a los usuarios. Los formularios suelen contener información sensible, como direcciones de correo electrónico y mensajes, y es esencial garantizar que esta información no sea comprometida por ataques maliciosos.

**Protección contra Bots**: La integración de ReCaptcha y la implementación de campos ocultos para detectar bots ayudarán a prevenir el envío automatizado de formularios por parte de bots, lo que podría inundar el sistema con datos no deseados o maliciosos.

**Validación de Datos**: La validación de datos en el lado del cliente asegura que los datos ingresados sean válidos y cumplan con los requisitos específicos, lo que mejora la calidad de la información almacenada y evita problemas potenciales.

**Protección contra Ataques**: La atención a la protección contra ataques XSS y SQL Injection es esencial para evitar que los atacantes exploten vulnerabilidades en el sitio web. Esto protege tanto a los usuarios como a los datos almacenados en el servidor.

**Gestión de Usuarios y Registros**: La implementación de un panel de administración con autenticación y roles de usuario es fundamental para la gestión eficiente de registros y usuarios. Esto permite un control adecuado sobre quién puede acceder y realizar acciones específicas en el sistema.

**Buenas Prácticas de Desarrollo Seguro**: Este proyecto se basa en buenas prácticas de desarrollo seguro, lo que significa que los desarrolladores adquieren habilidades y experiencia en la creación de aplicaciones web seguras. Estas habilidades son transferibles y beneficiosas en proyectos futuros.

**Experiencia Práctica**: Este proyecto proporciona una valiosa experiencia práctica en la implementación de medidas de seguridad en aplicaciones web del mundo real. Los desarrolladores pueden aprender y perfeccionar sus habilidades a través de este proyecto.

## Instalación y Configuración
Para instalar y configurar un proyecto MERN (MongoDB, Express.js, React, Node.js) creado con `create-react-app` en un entorno local, puedes seguir estos pasos básicos:

1. **Requisitos Previos**:
   - Asegúrate de tener instalado Node.js y npm en tu sistema. Puedes verificar su instalación ejecutando los siguientes comandos en tu terminal:
     ```
     node -v
     npm -v
     ```

2. **Clonar el Repositorio**:
   - Clona el repositorio del proyecto desde tu plataforma de control de versiones (por ejemplo, GitHub) utilizando Git:
     ```
     git clone <URL_del_repositorio>
     ```

3. **Instalar Dependencias del Servidor**:
   - Navega al directorio del servidor (donde se encuentra tu archivo `package.json` para el servidor) y ejecuta el siguiente comando para instalar las dependencias del servidor (Express.js, MongoDB, etc.):
     ```
     cd servidor
     npm install
     ```

4. **Configurar la Base de Datos**:
   - Asegúrate de que MongoDB esté instalado y en ejecución en tu sistema. Puedes usar MongoDB localmente o configurar una base de datos en la nube. Ajusta la URL de conexión a la base de datos en la configuración del servidor si es necesario.

5. **Instalar Dependencias del Cliente**:
   - Navega al directorio del cliente (donde se encuentra tu archivo `package.json` para el cliente, generalmente en la raíz del proyecto) y ejecuta el siguiente comando para instalar las dependencias del cliente (React, etc.):
     ```
     cd cliente
     npm install
     ```

6. **Configurar Variables de Entorno**:
   - Configura las variables de entorno necesarias para tu proyecto en un archivo `.env`. Esto puede incluir la configuración de la base de datos, claves de API y otros valores sensibles. Asegúrate de no incluir este archivo en tu repositorio, ya que debe mantenerse privado.

7. **Iniciar el Servidor y la Aplicación Cliente**:
   - Desde el directorio del servidor, inicia el servidor Node.js:
     ```
     npm start
     ```
   - Desde el directorio del cliente, inicia la aplicación React:
     ```
     npm start
     ```

8. **Acceder a la Aplicación**:
   - Abre tu navegador web y accede a la dirección proporcionada por `create-react-app`, por lo general en `http://localhost:3000`.

## Autor
- **Nombre del Autor**: Sebastian Benavides Heins
- **Correo Electrónico**: sebasheins@gmail.com
- **Perfil de GitHub**: [https://github.com/Sebasbh](https://github.com/Sebasbh)
- **LinkedIn**: [www.linkedin.com/in/sebastian-benavides-heins](www.linkedin.com/in/sebastian-benavides-heins)

## Estado del Proyecto
El proyecto está en desarrollo activo.

## Capturas de Pantalla
Aquí puedes ver algunas capturas de pantalla de la aplicación:
- ![Captura de Pantalla 1](./Fotos%20Readme/Screenshot%202023-09-13%20at%2018.46.49.png)
- ![Captura de Pantalla 2](./Fotos%20Readme/Screenshot%202023-09-13%20at%2018.48.00.png)
- ![Captura de Pantalla 3](./Fotos%20Readme/Screenshot%202023-09-13%20at%2018.48.50.png)
Esperamos que estas capturas y la demostración te den una idea de cómo funciona "CyberGuard"!

## Agradecimientos
Queremos expresar nuestro sincero agradecimiento a las siguientes personas y grupos por su valiosa contribución y apoyo en el proyecto "CyberGuard":
- A nuestros profesores por su orientación, conocimientos y apoyo continuo durante el desarrollo del proyecto.
- A nuestros compañeros de equipo y colaboradores por su dedicación y esfuerzo en la realización de este proyecto.
- A la comunidad de desarrolladores y aportantes de código abierto que han inspirado y compartido recursos valiosos que enriquecieron nuestro aprendizaje y trabajo.

¡Gracias a todos por hacer posible "CyberGuard"!
