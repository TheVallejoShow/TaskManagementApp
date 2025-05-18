# Gestor de Proyectos y Tareas con React y Firebase

Este es un proyecto de gestión de proyectos y tareas desarrollado con **React** y **Firebase Firestore**. La aplicación permite:

- Crear proyectos.
- Visualizar la lista de proyectos.
- Ver el detalle de un proyecto con sus tareas asociadas.
- Crear tareas con atributos como título, descripción, prioridad, estado (completada o pendiente) y fecha de vencimiento.
- Eliminar proyectos y tareas con confirmación vía modal.

No se incluye autenticación de usuarios. Toda la información se guarda y consulta directamente desde Firestore.

---

## 🚀 ¿Cómo ejecutar este proyecto?

git clone https://github.com/TheVallejoShow/TaskManagementApp
cd task-management-app

## Instalar dependencias

npm install

## Ejecutar la aplicación

npm run dev

## 📁 Tecnologías utilizadas
- React + Vite
- Firebase Firestore
- React Router DOM
- Tailwind CSS

## 📝 Notas

- Las tareas se vinculan a los proyectos mediante un arreglo de referencias.

- Las operaciones CRUD están disponibles para proyectos y tareas.

- El modal de eliminación es reutilizable tanto para proyectos como tareas.