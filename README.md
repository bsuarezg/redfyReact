# Redfy - Plataforma de Servicios de Salud

Este es un monorepo que contiene la solución completa para la plataforma Redfy, incluyendo el Backend (API), el Frontend Web y la Aplicación Móvil.

## 📂 Estructura del Proyecto

*   **`backend/`**: API RESTful construida con **Laravel (PHP)**. Gestiona la base de datos, autenticación, usuarios, perfiles y lógica de negocio.
*   **`web/`**: Aplicación Web construida con **React + Vite + Tailwind CSS**. Es el portal para pacientes y profesionales en navegadores de escritorio/móvil.
*   **`mobile/`**: Aplicación Móvil nativa construida con **React Native + Expo**. Permite el acceso a la plataforma desde iOS y Android.

---

## 🚀 Guía de Ejecución Local

Sigue estos pasos para levantar todo el ecosistema en tu máquina local.

### Prerrequisitos
*   **PHP** >= 8.2 & **Composer**
*   **Node.js** >= 18 & **npm**
*   **SQLite** (incluido en PHP/Laravel por defecto)

### 1. Backend (Laravel)

El backend debe estar corriendo para que la Web y el Móvil funcionen.

1.  Navega a la carpeta: `cd backend`
2.  Instala dependencias: `composer install`
3.  Copia el archivo de entorno: `cp .env.example .env`
4.  Genera la clave de aplicación: `php artisan key:generate`
5.  Crea la base de datos (SQLite): `touch database/database.sqlite`
6.  Ejecuta las migraciones (crea tablas): `php artisan migrate`
7.  Inicia el servidor: `php artisan serve --host=0.0.0.0 --port=8000`

El backend estará disponible en: `http://localhost:8000` (API en `/api`).

### 2. Frontend Web (React)

1.  Abre una nueva terminal y navega a: `cd web`
2.  Instala dependencias: `npm install`
3.  Inicia el servidor de desarrollo: `npm run dev`

La web estará disponible en: `http://localhost:5173`

### 3. Aplicación Móvil (Expo)

1.  Abre una nueva terminal y navega a: `cd mobile`
2.  Instala dependencias: `npm install`
3.  Inicia Expo: `npm start` (o `npx expo start`)

**Para ver la App:**
*   **En tu móvil:** Descarga la app "Expo Go" (Android/iOS) y escanea el código QR que aparece en la terminal.
*   **En Emulador:** Presiona `a` para Android o `i` para iOS (requiere Android Studio o Xcode instalados).
*   **En Web:** Presiona `w` para ejecutar la versión móvil en el navegador.

---

## 🏗 Arquitectura y Datos

### Roles de Usuario
El sistema soporta múltiples tipos de cuentas:
1.  **Individual (User/Professional):** Usuarios estándar o profesionales autónomos.
2.  **Clínica (Clinic/Organization):** Entidades que agrupan múltiples profesionales.

### Base de Datos
*   **Users:** Credenciales de acceso y rol base.
*   **Profiles:** Datos extendidos (dirección, bio, tipo de cuenta).
*   **Organizations:** Datos de la clínica (si aplica).
*   **OrganizationMembers:** Relación entre Profesionales y Clínicas.

---

## 🛠 Comandos Útiles

*   **Resetear Base de Datos:** `cd backend && php artisan migrate:fresh`
*   **Crear Usuario de Prueba (API):**
    ```bash
    curl -X POST http://localhost:8000/api/register \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com", "password":"password", "consent":true}'
    ```
