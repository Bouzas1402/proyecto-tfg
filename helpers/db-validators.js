const { Roles, Usuario } = require("../repositories/models");

const esRolValido = async (rol = "") => {
  const existeRol = await Roles.findOne({ rol });
  if (!existeRol) {
    return new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const esEmailValido = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return new Error(`El correo ${correo} ya existe prueba con otro`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    return new Error(`El id no existe ${id}`);
  }
};

module.exports = {
  esEmailValido,
  esRolValido,
  existeUsuarioPorId,
};