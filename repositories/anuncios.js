const {Anuncios} = require("./models");

const get = async () => {
  try {
    return (usuarios = await Anuncios.find());
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
    if (!anuncio) return null;
    return anuncio;
  } catch (err) {
    console.log(err);
    return new Error(`Error database - ${err}`);
  }
};

module.exports = {
  get,
  post,
  getById,
};
