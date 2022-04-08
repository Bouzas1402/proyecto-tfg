const { Users } = require("../repositories");
const jwt = require("jsonwebtoken");

const get = async () => {
  try {
    return await Users.get();
  } catch (err) {
    console.log(err);
    throw new Error("Problema al recuperar los usuarios");
  }
};

const crear = async (user) => {
  try {
    return await Users.crear(user);
  } catch (err) {
    console.log(err);
    throw new Error("Usuario no se pudo crear");
  }
};

const login = async (correo, contraseña) => {
  try {
    return await Users.login(correo, contraseña);
  } catch (err) {
    console.log(err);
    throw new Error("Login incorrecto - contorller");
  }
};

const borrar = async (id, token) => {
  try {
    const { rol } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    console.log(rol);
    if (rol === "ADMIN_ROL") {
      return await Users.borrar(id);
    } else {
      return new Error("No tienes permisos para borrar usuarios");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Problema al borrar un usuario - controller");
  }
};
module.exports = {
  get,
  crear,
  login,
  borrar,
};
