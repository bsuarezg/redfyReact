# Modelo de Roles, Suscripciones y Entidades (Clínicas)

## 1. Roles de Usuario

Actualmente tenemos una estructura simple de `role` en la tabla `users` (por defecto 'user'). Para soportar la complejidad que describes, proponemos expandir esto:

### Tipos de Roles Base
1.  **Paciente (User):** Usuario final que busca servicios.
2.  **Profesional (Professional):** Autónomo que ofrece servicios.
3.  **Clínica (Clinic/Organization):** Entidad que agrupa a varios profesionales.
4.  **Admin:** Administrador de la plataforma.

*Nota: Un mismo email podría tener múltiples roles, pero para simplificar el MVP, podemos usar un campo `role` o una tabla pivote `role_user` si un usuario puede ser paciente y profesional a la vez.*

## 2. Modelo de Suscripción (Freemium vs. Premium)

Para manejar usuarios gratuitos y de pago, no es necesario crear "roles" distintos, sino añadir una capa de **Suscripción** o **Nivel (Tier)**.

### Tabla `subscriptions` (Propuesta)
-   `user_id`: FK al usuario o clínica.
-   `plan_type`: 'free', 'basic', 'premium'.
-   `status`: 'active', 'cancelled', 'expired'.
-   `start_date`: Fecha inicio.
-   `end_date`: Fecha fin.

### Diferencias por Nivel (Ejemplo)
-   **Profesional Free:** Aparece en búsquedas pero con menor visibilidad, límite de citas mensuales, comisión más alta por servicio.
-   **Profesional Premium:** Mayor visibilidad, perfil destacado, sin límites de citas, menor comisión, herramientas avanzadas (recordatorios SMS, etc.).

## 3. Entidad "Clínica" y Gestión de Empleados

Este es un punto clave. Si una clínica se da de alta, actúa como una "Organización".

### Relación Clínica - Profesional
Necesitamos una relación donde una Clínica pueda "invitar" o "registrar" profesionales asociados.

**Estructura de Datos Propuesta:**
1.  **Tabla `organizations` (o reutilizar `users` con rol 'clinic' y perfil extendido):**
    -   Datos fiscales de la clínica.
    -   Ubicación física (Sede).
2.  **Tabla `organization_members`:**
    -   `organization_id`: ID de la clínica.
    -   `user_id`: ID del profesional (empleado).
    -   `role_in_org`: 'admin', 'staff', 'receptionist'.
    -   `status`: 'active', 'invited'.

### Flujo de Registro de Empleados
1.  **La Clínica se registra:** Crea su cuenta como "Entidad".
2.  **La Clínica añade profesionales:**
    -   *Opción A (Invitación):* La clínica envía un email al fisio. El fisio se registra (o hace login si ya existe) y acepta unirse a la clínica.
    -   *Opción B (Alta Directa):* La clínica crea un "perfil gestionado" para el fisio. El fisio recibe credenciales temporales.

### Implicaciones en la App
-   **Perfil del Profesional:** Deberá indicar si trabaja por cuenta propia (Autónomo), para una clínica, o ambos (híbrido).
-   **Agenda:** Si trabaja para una clínica, la agenda puede ser gestionada por la recepción de la clínica.
-   **Facturación:** El pago del paciente va a la cuenta de la Clínica, no a la del profesional individual (aunque la plataforma podría gestionar splits de pagos).

## Recomendación para la Fase Actual

Para no bloquear el desarrollo actual pero dejar la puerta abierta:
1.  **Mantener `users` y `profiles`** como base.
2.  **Añadir campo `account_type`** en `profiles` (Individual vs. Organization).
3.  **Preparar tabla `organization_members`** para futuras relaciones.
4.  **Añadir campo `subscription_plan`** en `users` o `profiles` para diferenciar Free/Premium desde ya.

¿Procedemos a añadir estos campos a la base de datos ahora?
