import {
  UcuDatosIncorrectos,
  UcuNoAutenticado,
  UcuNoEncontrado,
  UcuYaExisteUsuario,
} from "../model/errors.ts";
import type { Persona } from "../model/persona.ts";

const listaPersonas: Persona[] = [
  {
    id_persona: 1,
    username: "admin1",
    roles: ["admin", "normal"],
  },
  {
    id_persona: 2,
    username: "admin2",
    roles: ["admin"],
  },
  {
    id_persona: 3,
    username: "normal3",
    roles: ["normal"],
  },
  {
    id_persona: 4,
    username: "normal4",
    roles: ["normal"],
  },
];

export function findAll() {
  return listaPersonas;
}

export const createPerson = async function (username: string, roles: string[]) {
  const personaConUsername = listaPersonas.find((p) => p.username === username);
  if (personaConUsername) throw new UcuYaExisteUsuario("username: " + username);
  const id_persona = Math.max(...listaPersonas.map((u) => u.id_persona)) + 1;
  const nuevoUsuario = { id_persona, username, roles };
  listaPersonas.push(nuevoUsuario);
  return nuevoUsuario;
};

export const updatePerson = async function (
  id_persona: number,
  username: string,
  roles: string[]
) {
  const persona = listaPersonas.find((p) => p.id_persona === id_persona);
  if (!persona) throw new UcuNoEncontrado();
  persona.username = username;
  persona.roles = roles;
  return persona;
};

export const findPersonById = async function (id: number) {
  return listaPersonas.find((u) => u.id_persona === id);
};

export const deletePersonById = async function (id: number) {
  const indice = listaPersonas.findIndex((u) => u.id_persona === id);
  if (indice < 0) throw new UcuNoEncontrado("");
  listaPersonas.splice(indice, 1);
};

export const authPerson = async function (
  username: string,
  password: string
): Promise<Persona> {
  if (password !== "contraseña") throw new UcuDatosIncorrectos("");

  const persona = listaPersonas.find((u) => u.username === username);
  if (!persona) throw new UcuDatosIncorrectos("");
  return persona;
};
