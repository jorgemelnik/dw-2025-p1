# PARCIAL 1

## Backend 50 puntos

Implementar los siguientes endpoints:

- 05 puntos: GET /personas/{id_persona}/tareas
- 15 puntos: POST /personas/{id_persona}/tareas
- 10 puntos: DELETE /personas/{id_persona}/tareas/{id_tarea}
- 10 puntos. Cada usuario únicamente puede ver y crear sus propias tareas. Nadie ve las de los demás.
- 10 puntos. Los endpoints deben aparecer en la documentación y funcionar con la validación correcta utilizando typebox. El largo máximo del titulo de la tarea es de 20 caracteres.

## Frontend

Implementar:

- 05 puntos: Un servidor fastify para archivos estáticos.
- 10 puntos: Implementar el listado de tareas para el usuario logueado. Si no hay usuario logueado, se muestra el error recibido desde backend o formulario de login (que funcione). Cada usuario crea tareas para si mismo.
- 10 puntos: Implementar el alta de persona. Una vez que se da efectivamente el alta, se muestra el listado de personas con la nueva persona.
- 05 puntos: Si una persona no admin intenta listar personas o crear persona, se muestra el mensaje de error recibido del backend.
- 10 puntos. Al iniciar sesión se muestra el username del usuario autenticado. Si nos paramos sobre dicho nombre se debe mostrar la lista de roles.
- 10 puntos. Agregar un botón logout solo visible si hay usuario autenticado. Al clickearlo se "cierra la sesión" (borrar el token, el texto del usuario logueado) y muestra el mensaje sesión terminada en la sección principal.

Puedes implementar las mejoras adicionales que quieras.
