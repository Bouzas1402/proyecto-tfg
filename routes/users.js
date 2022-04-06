const { check } = require("express-validator");
const validator = require("email-validator");
const { Users } = require("../controllers");

const { validarCampos } = require("../middlewares");
const { ValidacionDB } = require("../helpers");

const get = async (req, res) => {
  try {
    const users = await Users.get();
    return res.json({
      users,
    });
  } catch (err) {
    return console.log(err);
  }
};

const crear = async (req, res) => {
  console.log(req.body);
  if (Object.keys(req.body).length !== 0) {
    const emailOk = validator.validate(req.body.correo);
    if (!emailOk) {
      return res.json({
        msg: "Email no valido",
      });
    }
    const rolOk = await ValidacionDB.esRolValido(req.body.rol);
    console.log(rolOk);
    if (!rolOk) {
      return res.json({
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
      return new Error("User rutas post");
    }
  } else {
    res.status(404).json({
      msg: "No se introdujo ningun dato",
    });
  }
};

module.exports = {
  get,
  crear,
};
