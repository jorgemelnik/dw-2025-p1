import personService from "../services/person.js";
import { mainElement, menuListaUsuariosElement } from "./dom-main-elements.js";

menuListaUsuariosElement.addEventListener("click", () => {
  mostrarListarUsuarios();
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
