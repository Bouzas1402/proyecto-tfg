const {Users} = require("../repositories");
const jwt = require("jsonwebtoken");

const get = async () => {
  return await Users.get();
};

const crear = async (user) => {
  return await Users.crear(user);
};

const login = async (correo, contraseña) => {
  return await Users.login(correo, contraseña);
};

const borrar = async (id) => {
  return await Users.borrar(id);
};

const borrarByCorreo = async (correo) => {
  return await Users.borrarByCorreo(correo);
};

module.exports = {
  get,
  crear,
  login,
  borrar,
  borrarByCorreo,
};
