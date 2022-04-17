//const { check } = require("express-validator");
const validator = require("email-validator");
const {Users} = require("../controllers");

//const { validarCampos } = require("../middlewares");
//const { ValidacionDB } = require("../helpers");

const get = async (req, res) => {
  try {
    const users = await Users.get();
    console.log(users);
    return res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      error: `Error al buscar los usuarios: ${err}`,
    });
  }
};

const crear = async (req, res) => {
  const user = await Users.crear(req.body);
  if (JSON.stringify(user) == "{}") {
    return res.status(422).json({
      error: `Error al introducir los datos:  ${user.message}`,
    });
  }
  return res.status(200).json({
    msg: `Usuario ${user.correo} creado`,
    user,
  });
};

const login = async (req, res) => {
  try {
    const {correo, contraseña} = req.body;
    const token = await Users.login(correo, contraseña);
    if (JSON.stringify(token) == "{}") {
      return res.status(422).json({
        error: `Error al introducir los datos:  ${token.message}`,
      });
    }
    return res.status(200).json({
      token,
    });
  } catch (err) {
    return res.status(403).json({
      error: `Login incorrecto: ${err}`,
    });
  }
};

const borrar = async (req, res) => {
  try {
    const {id} = req.usuario;
    const data = await Users.borrar(id);
    return res.status(200).json({
      msg: "Usuario borrado",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      error: `Error al borrar el usuario: ${err}`,
    });
  }
};

const borrarByCorreo = async (req, res) => {
  try {
    const {correo} = req.params;
    const data = await Users.borrarByCorreo(correo);
    if (!data) {
      return res.status(403).json({
        error: "El usuario no existe",
      });
    }
    return res.status(200).json({
      msg: "Usuario borrado",
      data,
    });
  } catch (err) {
    console.error(err);
    return res.status(403).json({
      error: `Error al borrar el usuario: ${err}`,
    });
  }
};

module.exports = {
  get,
  crear,
  login,
  borrar,
  borrarByCorreo,
};
