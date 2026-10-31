# Evidencia de Aprendizaje 1: API REST - Módulo 2 (Director)

* **Institución:** Institución Universitaria Digital de Antioquia 
* **Asignatura:** Proyecto Integrador II / Ingeniería Web II
* **Módulo asignado:** Módulo 2 - Director 
* **Tecnologías:** Node.js, Express, MongoDB Atlas, Mongoose

---

## Descripción del Módulo

Este repositorio contiene la implementación y validación exclusiva del **Módulo 2: Director** para la API REST del proyecto universitario. Permite la gestión completa (creación, consulta y actualización) del director principal asignado a las producciones cinematográficas o series.

### Estructura de Datos en Base de Datos (`Director`):
* **`nombres`**: Nombres del director (Texto, Requerido).
* **`estado`**: Estado de disponibilidad (`Activo` o `Inactivo`, valor por defecto: `Activo`).
* **`fechaCreacion`**: Fecha y hora de registro (Asignada automáticamente por Mongoose).
* **`fechaActualizacion`**: Fecha y hora de última modificación (Actualizada automáticamente).

---

## Estructura del Proyecto

```text
Proyecto-EA1/
├── controllers/
│   └── directorController.js   # Métodos HTTP (getDirectores, createDirector, updateDirector)
├── models/
│   └── Director.js             # Esquema Mongoose para el Módulo Director
├── routes/
│   └── directorRoute.js        # Definición de rutas (/api/director)
├── .env.template               # Plantilla de variables de entorno
├── .gitignore                  # Archivos excluidos del control de versiones
└── index.js                    # Punto de entrada del servidor Express
```
---
## Rutas y Métodos HTTP (/api/director)
| Método | Ruta | Descripción | Código Respuesta |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/director` | Retorna la lista de todos los directores registrados | `200 OK` |
| **POST** | `/api/director` | Crea un nuevo director en la base de datos | `201 Created` |
| **PUT** | `/api/director/:id` | Actualiza un director existente buscando por su `_id` | `200 OK` |

