//const { check } = require("express-validator");
const validator = require("email-validator");
const { Users } = require("../controllers");

//const { validarCampos } = require("../middlewares");
//const { ValidacionDB } = require("../helpers");

const get = async (req, res) => {
  try {
    const users = await Users.get();
    return res.json({
      users,
    });
  } catch (err) {
    console.log(err);
    return new Error("Error al buscar los usuarios - rutas");
  }
};

const crear = async (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    const emailOk = validator.validate(req.body.correo);
    if (!emailOk) {
      return res.status(422).json({
        msg: "Email no valido",
      });
    }
    try {
      const user = req.body;
      await Users.crear(user);
      return res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return new Error("Error al introducir los datos");
    }
  } else {
    res.status(422).json({
      msg: "No se introdujo ningun dato",
    });
  }
};

const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const token = await Users.login(correo, contraseña);
    return res.json({
      token,
    });
  } catch (err) {
    return new Error("Login incorrecto");
  }
};

const borrar = async (req, res) => {
  try {
    const { id } = req.body;
    const { token } = req.header("token");
    await Users.borrar(id, token);
    return res.json({
      msg: "Usuario borrado",
    });
  } catch (err) {
    console.log(err);
    return new Error("Error al borrar usuario - rutas");
  }
};

module.exports = {
  get,
  crear,
  login,
  borrar,
};
