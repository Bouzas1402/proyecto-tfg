const {Anuncios, Users} = require("./models");

const get = async () => {
  try {
    return await Anuncios.find();
  } catch (err) {
    console.log(err);
    return new Error("Error al buscar los usuarios");
  }
};

const post = async (anuncio) => {
  try {
    const nuevoAnuncio = new Anuncios(anuncio);
    const crearAnuncio = await nuevoAnuncio.save(nuevoAnuncio);
    if (!crearAnuncio) return "No se pudo crear el usuario";
    return crearAnuncio;
  } catch (err) {
    console.log(err);
    return new Error(`Error al crear el anuncio - repositorio - ${err}`);
  }
};

const getById = async (id) => {
  try {
    const anuncio = await Anuncios.findById(id);
    console.log(anuncio);
    if (!anuncio) return null;
    return anuncio;
  } catch (err) {
    console.log(err);
    return new Error(`Error database - ${err}`);
  }
};

const getAnunciosGuardados = async (id) => {
  let anunciosGuardados = [];
  try {
    const user = await Users.findOne({_id: id}).populate("anuncios");
    console.log(user);
    if (!user) return null;
    /*   if (user.anuncios.length > 0) {
      for (const anuncio of user.anuncios) {
        const getAnuncio = await Anuncios.findById(anuncio);
        if (getAnuncio) anunciosGuardados.push(getAnuncio);
      } 
      
    } else {
      return "No hay anuncios guardados";
    }*/
    return user.anuncios;
  } catch (err) {
    console.log(err);
    return new Error(`Error database - ${err}`);
  }
};

const borrarAnuncioGuardado = async (idAnuncio, idUsuario) => {
  try {
    const user = await Users.findById(idUsuario);
    if (!user) return null;
    console.log(user.anuncios);
    let anuncioBorrar = user.anuncios.find((anuncio) => anuncio === idAnuncio);
    if (anuncioBorrar) {
      user.anuncios.pull(anuncioBorrar);
      usuarioModificado = await user.save();
    } else {
      return "No hay anuncios guardados";
    }
  } catch (err) {
    console.log(err);
    return new Error(`Error database - ${err}`);
  }
};

module.exports = {
  get,
  post,
  getById,
  getAnunciosGuardados,
  borrarAnuncioGuardado,
};
