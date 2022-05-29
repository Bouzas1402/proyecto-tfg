const {Anuncios} = require("../repositories");

const get = async () => {
  return await Anuncios.get();
};

const post = async (anuncio) => {
  await Anuncios.post(anuncio);
};

const getById = async (id) => {
  return Anuncios.getById(id);
};

module.exports = {
  get,
  post,
  getById,
};
