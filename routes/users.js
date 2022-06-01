//const { check } = require("express-validator");
const validator = require("email-validator");
const {Users} = require("../controllers");

//const { validarCampos } = require("../middlewares");
//const { ValidacionDB } = require("../helpers");

//
// Hay que arreglar la respuesta de los catche
//
//
const get = async (req, res) => {
  try {
    const {_id} = req.usuario;
    const users = await Users.get(_id);
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
  const user = await Users.crear(req.body.values);
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
    const data = await Users.login(correo, contraseña);
    if (JSON.stringify(data) == "{}") {
      return res.status(422).json({
        error: `Error al introducir los datos:  ${data.message}`,
      });
    }
    const {token, usuario} = data;
    return res.status(200).json({
      token,
      usuario,
    });
  } catch (err) {
    return new Error(`Error al registrarse ${err}`);
  }
};

const borrar = async (req, res) => {
  try {
    const {_id} = req.usuario;
    const data = await Users.borrar(_id);
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

const guardarAnuncio = async (req, res) => {
  try {
    const {idAnuncio} = req.params;
    const {_id} = req.usuario;
    const data = await Users.guardarAnuncio(idAnuncio, _id);
    console.log(data);
    if (!data) {
      return res.status(403).json({
        error: "El anuncio no existe",
      });
    } else if (String(data).includes("Error")) {
      return res.status(200).json({
        error: "Anuncio ya guardado",
      });
    }
    return res.status(200).json({
      data,
    });
  } catch (err) {
    console.error(err);
    return res.status(403).json({
      error: `Error al guardar el anuncio: ${err}`,
    });
  }
};

const comprobarToken = async (req, res) => {
  return res.status(200).json({
    msg: "Token valido",
  });
};

module.exports = {
  get,
  crear,
  login,
  borrar,
  borrarByCorreo,
  comprobarToken,
  guardarAnuncio,
};
