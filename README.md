## 🚀 Descripción de la Aplicación

Examen tecnico de programación SERSI
aplicación web construida con React, TypeScript, Laravel y MySQL que proporciona una interfaz de usuario intuitiva para:

- **Gestión de Equipos**: Administrar inventario de equipos con diferentes tipos de motores
- **Gestión de Usuarios**: Sistema de usuarios con roles (admin/user)
- **Autenticación**: Sistema de login/logout con protección de rutas

### Usuarios
- **Admin**: admin@ejemplo.com - admin123
- **User**: user@ejemplo.com - user123

### Roles de Usuario
- **Admin**: Acceso completo a todas las funcionalidades
- **User**: Acceso limitado a gestión de equipos

### Rutas Protegidas
- `/equipos` - Requiere autenticación
- `/usuarios` - Requiere rol de administrador

### Instalación
- Para Frontend, accede a la carpeta /frontend y siga las instrucciones de README
- Para Backend, accede a la carpeta /backend y siga las instrucciones de README
