let token;

const baserecurso = "http://localhost:2000/";

export function setToken(nuevoToken) {
  token = nuevoToken;
}

export function hayToken() {
  console.log({ token: !!token });
  return !!token;
}

function getHeaders() {
  const headers = {
    "content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

async function request(method, recurso, data = null) {
  const options = {
    method,
    headers: getHeaders(),
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(baserecurso + recurso, options);

  if (!response.ok) {
    let mensajeError = `Error ${response.status}`;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const errorJson = await response.json();
      if (errorJson.message) {
        mensajeError = errorJson.message;
      }
    }

    if (response.status >= 400 && response.status < 500)
      throw new Error(`Error del cliente: ${mensajeError}`);

    if (response.status >= 500)
      throw new Error(`Error del servidor: ${mensajeError}`);

    throw new Error(mensajeError);
  }

  // Manejo especial para 204 No content
  if (response.status === 204) {
    return;
  }

  // Si hay contenido, lo parseamos
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  // Si no es JSON, devolvemos texto plano
  return await response.text();
}

export const api = {
  get: (recurso) => request("GET", recurso),
  post: (recurso, data) => request("POST", recurso, data),
  put: (recurso, data) => request("PUT", recurso, data),
  delete: (recurso) => request("DELETE", recurso),
};
