## 📋 Requisitos Previos

- PHP >= 8.1
- Composer
- MySQL

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd Sersi/backend
```

### 2. Instalar dependencias
```bash
composer install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar el archivo `.env` con tu configuración:
```env
APP_NAME=Sersi
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sersi_db(utiliza o crea una base de datos)
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
```

### 4. Ejecutar migraciones
```bash
php artisan migrate
```

### 5. Poblar la base de datos
```bash
php artisan db:seed
```

### 6. Iniciar el servidor
```bash
php artisan serve
```

El servidor estará disponible en `http://127.0.0.1:8000`
Revisa el estado del servidor con `http://127.0.0.1:8000/api/health`

