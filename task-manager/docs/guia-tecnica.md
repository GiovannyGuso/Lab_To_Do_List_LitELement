# Task Manager - Web Components con Lit Element

Nombre: Duran Giovanny\
Materia: Programacion Integrativa de Componentes

---

Este proyecto implementa una aplicación de un **To do List** utilizando **Web Components personalizados con LitElement**.

---

## Componentes creados

- `<espe-header>`: Muestra el encabezado, ícono, títulos correspondientes al header.
- `<task-items>`: Visualiza las tareas individuales agregadas, con opciones como editar y borrar las mismas.
- `<task-list>`: Lista de tareas agrupadas por prioridad o fecha.
- `<task-form>`: Formulario para agregar o editar las tareas.
- `<task-detail>`: Visualiza los detalles de una tarea seleccionada.

---

## Documentación Detallada de Componentes

### 1. Componente para el Header ``<espe-header>``
- Barra de navegación superior que contiene el logo, menú principal y acciones de usuario.

```mermaid
flowchart TD
    subgraph Header
        A[Logo]
        B[Menú Hamburguesa]
        C[Navegación]
        D[Acciones de Usuario]
    end
```

### 2. Componente para Listar los Ítems ``<task-list>``
- Lista interactiva de tareas agrupadas por fecha o prioridad.

```mermaid
flowchart TD
    A[Recibe tasks] --> B{Agrupar por}
    B -->|Fecha| C[Mostrar por secciones de fecha]
    B -->|Prioridad| D[Mostrar por niveles de prioridad]
    C --> E[Renderizar items]
    D --> E
```

### 3. Componente para los Ítems ``<task-item>``
- Elemento individual de tarea con acciones e indicadores visuales.

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `task` | Object | Datos de la tarea |

#### Estados Visuales
1. **Normal**: Color completo
2. **Hover**: Muestra acciones
3. **Completado**: Opacidad reducida y tachado

#### Interacciones
- Click: Abre detalle
- Click: Editar
- Click: Eliminar (con confirmación)

#### Diseño Responsive
- Se adapta perfectamente a todos los tamaños de pantalla.

### 4. Componente para los Detalles ``<task-detail>``
- Modal que muestra detalles completos de una tarea.

```mermaid
stateDiagram
    [*] --> Closed
    Closed --> Open: task set + open=true
    Open --> Closed: click close
    Open --> Open: edit task
```

### 5. Componente para el Formulario ``<task-form>``
- Formulario para crear/editar tareas.

```mermaid
flowchart TD
    A[Inicio] --> B{Modo}
    B -->|Nuevo| C[Formulario vacío]
    B -->|Editar| D[Formulario con datos]
    C --> E[Validar]
    D --> E
    E -->|OK| F[Emitir save-task]
    E -->|Error| G[Mostrar error]
```

---

## Capturas del Funcionamiento de los componentes

### Vista general Vacia
![Vista general Vacia](./caps/vistaIndex.png)

### Vista general con datos
![Vista general Vacia](./caps/vistaIndex2.png)
![Vista general Vacia](./caps/vistaListado.png)

### Agregar nuevas Tareas
![Agregar nuevas Tareas](./caps/vistaAgregar.png)

### Editar tareas ingresadas
![Editar tareas ingresadas](./caps/vistaEditar.png)

### Eliminar tareas
![Eliminar tareas](./caps/vistaElimiar.jpeg)

### Detalles de las tareas
![Detalles de las tareas](./caps/vistaResumen.png)

---

## Estructura del Proyecto

```
📁 src/
├── components/
│   ├── header.js
│   ├── task-form.js
│   ├── task-items.js
│   ├── task-list.js
│   ├── task-detail.js
│   ├── shared-styles.js
├── style/
│   ├── style.js
├── index.js
📁 docs/
│   ├── guia-tecnica.md
└── caps/
index.html
README.md
```