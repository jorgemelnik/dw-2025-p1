import personService from "../services/person.js";
import {
  mainElement,
  menuListaUsuariosElement,
  menuMisTareasElement,
} from "./dom-main-elements.js";

import { getUser } from "../services/auth.js";

menuListaUsuariosElement.addEventListener("click", () => {
  mostrarListarUsuarios();
});

menuMisTareasElement.addEventListener("click", () => {
  const user = getUser();
  mostrarListaTareas(user?.id_persona);
});

export async function mostrarListarUsuarios() {
  try {
    const users = await personService.getAll();
    const miHtml = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Roles</th>
        </tr>
      </thead>
      <tbody>
        ${users
          .map(
            (user) => `
          <tr>
            <td>${user.id_persona}</td>
            <td>${user.username}</td>
            <td>${user.roles.join(", ")}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

    mainElement.innerHTML = miHtml;
  } catch (error) {
    console.error(error.message);
    mainElement.innerHTML = `
      <div id="error-login" class="error-message">${error.message}</div>
    `;
  }
}

export async function mostrarListaTareas(id_persona) {
  try {
    const tareas = await personService.getTasks(id_persona);
    const miHtml = `
    <table>
      <thead>
        <tr>
          <th>ID PERSONA</th>
          <th>ID TAREA</th>
          <th>TITULO</th>
        </tr>
      </thead>
      <tbody>
        ${tareas
          .map(
            (tarea) => `
          <tr>
            <td>${tarea.id_persona}</td>
            <td>${tarea.id_tarea}</td>
            <td>${tarea.titulo}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

    mainElement.innerHTML = miHtml;
  } catch (error) {
    console.error(error.message);
    mainElement.innerHTML = `
      <div id="error-login" class="error-message">${error.message}</div>
    `;
  }
}
