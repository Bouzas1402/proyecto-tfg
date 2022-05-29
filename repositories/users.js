const bcryptjs = require("bcryptjs");

const {Users} = require("./models");
const {generarJWT} = require("../helpers");

const get = async (id) => {
  try {
    console.log(id);
    return await Users.findById(id);
  } catch (err) {
    console.log(err);
  }
};

const crear = async (user) => {
  try {
    console.log(user);
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

const getById = async (id) => {
  console.log(id);
  try {
    return await Users.findById(id);
  } catch (err) {
    console.log(err);
  }
};

const login = async (correo, contraseñaLogin) => {
  try {
    const usuario = await Users.findOne({correo});

    if (usuario && usuario.estado) {
      const constraseñaValida = bcryptjs.compareSync(contraseñaLogin, usuario.contraseña);
      if (!constraseñaValida) {
        return new Error("Contraseña incorrecta");
      }
      const token = await generarJWT(usuario.id, usuario.role);
      return {token, usuario};
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

const guardarAnuncio = async (idAnuncio, idUsuario) => {
  try {
    const usuario = await Users.findOne({_id: idUsuario});
    let anuncioRepetido = false;
    usuario.anuncios.forEach((anuncio) => {
      if (String(anuncio) === idAnuncio) anuncioRepetido = true;
    });
    console.log(anuncioRepetido);
    if (!anuncioRepetido) {
      const anuncioUsuario = usuario.anuncios;
      anuncioUsuario.push(idAnuncio);
      const data = new Users(usuario);
      return await usuario.updateOne({anuncios: anuncioUsuario});
    } else {
      return new Error("Anuncio ya guardado");
    }
  } catch (err) {
    console.error(err);
    return new Error(`Error al guardar el anuncio: ${err}`);
  }
};

module.exports = {get, crear, login, borrar, borrarByCorreo, guardarAnuncio, getById};
