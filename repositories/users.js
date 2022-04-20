const bcryptjs = require("bcryptjs");

const {Users} = require("./models");
const {generarJWT} = require("../helpers");

const get = async () => {
  try {
    return await Users.find({});
  } catch (err) {
    console.log(err);
  }
};

const crear = async (user) => {
  try {
    const data = new Users(user);
    await data.save();
    const salt = bcryptjs.genSaltSync();
    data.contraseña = bcryptjs.hashSync(data.contraseña, salt);
    await Users.findByIdAndUpdate(data._id, {contraseña: data.contraseña});
    return data;
  } catch (err) {
    console.error(err);
    return new Error(err.message);
  }
};

const login = async (correo, contraseña) => {
  try {
    const usuario = await Users.findOne({correo});
    console.log(correo);
    console.log(usuario);

    if (usuario && usuario.estado) {
      const constraseñaValida = bcryptjs.compareSync(contraseña, usuario.contraseña);
      if (!constraseñaValida) {
        return new Error("Contraseña incorrecta");
      }
      const token = await generarJWT(usuario.id, usuario.role);
      return token;
    } else {
      return new Error("No existe el usuario");
    }
  } catch (error) {
    console.log(error);
    return new Error("Hable con el administrador");
  }
};

const borrar = async (id) => {
  try {
    return await Users.findByIdAndUpdate(id, {estado: false});
  } catch (err) {
    console.log(err);
    return new Error("Error al borrar el usuario - respositorios");
  }
};
const borrarByCorreo = async (correo) => {
  try {
    return await Users.findOneAndUpdate({correo, estado: true}, {estado: false});
  } catch (err) {
    console.error(err);
    return new Error("Error al borrar el usuario");
  }
};

module.exports = {get, crear, login, borrar, borrarByCorreo};
