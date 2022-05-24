const {Anuncios} = require("../repositories");

const get = async () => {
  try {
    return await Anuncios.get();
  } catch (err) {
    console.log(err);
    throw new Error("Error al buscar los anuncios - controladores");
  }
};

const post = async (anuncio) => {
  try {
    return await Anuncios.post(anuncio);
  } catch (err) {
    console.log(err);
    throw new Error("Fallo al crear el anuncio - contorller");
  }
};

const getById = async (id) => {
  return Anuncios.getById(id);
};

module.exports = {
  get,
  post,
  getById,
};
