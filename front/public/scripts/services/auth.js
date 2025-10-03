import { api, setToken } from "./api.js";

let user;

export const getUser = function () {
  return user;
};

export async function login(username, password) {
  const body = await api.post("auth/", { username, password });
  if (body && body.token) {
    setToken(body.token);
    const person = await api.get("auth/");
    user = person;
    return true;
  } else {
    throw new Error("Usuario y contraseña no válido.");
  }
}

export async function logout() {
  user = undefined;
  setToken(undefined);
}
