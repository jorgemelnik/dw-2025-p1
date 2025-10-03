import { api } from "./api.js";

const baseUrl = "personas/";

const getAll = async function () {
  return api.get(baseUrl);
};

const create = async function (username, roles) {
  return api.post(baseUrl, { username, roles });
};

const update = async function (id_persona, username, roles) {
  await api.post(baseUrl + id_persona, { id_persona, username, roles });
  return getById(id_persona);
};

const getById = async function (id_persona) {
  return api.get(baseUrl + id_persona);
};

const erase = async function (id_persona) {
  await api.delete(baseUrl + id_persona);
};

const personService = {
  getAll,
  create,
  update,
  getById,
  erase,
};

export default personService;
