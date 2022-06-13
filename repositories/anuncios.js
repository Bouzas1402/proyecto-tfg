const _ = require("underscore");

const {Anuncios, Users} = require("./models");

const get = async () => {
  try {
    const data = await Anuncios.find();
    return data;
  } catch (err) {
    return new Error("Error al buscar los usuarios");
  }
};

const getAllPaginated = async (tamPage, numPage) => {
  let result;
  let size;
  try {
    result = await Anuncios.find()
      .skip(tamPage * numPage)
      .limit(Number(tamPage));
    size = await Anuncios.countDocuments();
  } catch (err) {
    throw new Error(`database error ${err}`);
  }

  if (!result || !result.length) return [];
  Object.keys(result).forEach((element) => {
    result[element] = result[element].toObject();
  });

  return {result, size};
};

const post = async (anuncio) => {
  try {
    const nuevoAnuncio = new Anuncios(anuncio);
    if (!nuevoAnuncio) return null;
    const crearAnuncio = await nuevoAnuncio.save(nuevoAnuncio);
    if (!crearAnuncio) return "No se pudo crear el usuario";
    return crearAnuncio;
  } catch (err) {
    return new Error(`Error al crear el anuncio - repositorio - ${err}`);
  }
};

const borrar = async (id) => {
  try {
    const anuncio = await Anuncios.findById(id);
    if (!anuncio) return null;
    return await Anuncios.deleteOne({_id: id});
  } catch (err) {
    return new Error(`Error database - ${err}`);
  }
};

const getById = async (id) => {
  try {
    const anuncio = await Anuncios.findById(id);
    if (!anuncio) return null;
    return anuncio;
  } catch (err) {
    return new Error(`Error database - ${err}`);
  }
};

const getAnunciosGuardados = async (id) => {
  try {
    const user = await Users.findOne({_id: id}).populate("anuncios");
    if (!user) return null;
    return user.anuncios;
  } catch (err) {
    return new Error(`Error database - ${err}`);
  }
};

const borrarAnuncioGuardado = async (idAnuncio, idUsuario) => {
  try {
    const user = await Users.findById(idUsuario);
    if (!user) return null;
    let anuncioBorrar = user.anuncios.find((anuncio) => String(anuncio) === idAnuncio);
    if (anuncioBorrar) {
      user.anuncios.pull(anuncioBorrar);
      await user.save();
      return "Anuncio guardado";
    } else {
      return "No esta el anuncio en anuncios guardados";
    }
  } catch (err) {
    return new Error(`Error database - ${err}`);
  }
};

const getByUser = async (id) => {
  try {
    const getAnuncios = await Anuncios.find({usuarioCuelga: id});
    if (!getAnuncios) return null;
    let anuncios = _.map(getAnuncios, function (anuncio) {
      return _.omit(anuncio.toObject(), "creacion", "__v");
    });
    return anuncios;
  } catch (err) {
    return new Error(`Error database - ${err}`);
  }
};

module.exports = {
  get,
  post,
  borrar,
  getById,
  getByUser,
  getAllPaginated,
  getAnunciosGuardados,
  borrarAnuncioGuardado,
};
