const {Anuncios} = require("../repositories");

const get = async () => {
  return await Anuncios.get();
};

const post = async (anuncio) => {
  return await Anuncios.post(anuncio);
};

const borrar = async (id) => {
  return await Anuncios.borrar(id);
};

const getById = async (id) => {
  return await Anuncios.getById(id);
};

const getAnunciosGuardados = async (id) => {
  return await Anuncios.getAnunciosGuardados(id);
};

const borrarAnuncioGuardado = async (idAnuncio, idUsuario) => {
  return await Anuncios.borrarAnuncioGuardado(idAnuncio, idUsuario);
};

const getByUser = async (id) => {
  return await Anuncios.getByUser(id);
};

module.exports = {
  get,
  post,
  borrar,
  getById,
  getByUser,
  getAnunciosGuardados,
  borrarAnuncioGuardado,
};
