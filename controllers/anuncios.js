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

const getByUser = async (id) => {
  return await Anuncios.getByUser(id);
};

const getAllPaginated = async (queryParams) => {
  let tamPage;
  let numPage;
  if (queryParams) {
    if (queryParams.tamPage) tamPage = Number(queryParams.tamPage);
    if (queryParams.numPage) numPage = Number(queryParams.numPage);
    return Anuncios.getAllPaginated(tamPage, numPage);
  }
};

const getAnunciosGuardados = async (id) => {
  return await Anuncios.getAnunciosGuardados(id);
};

const borrarAnuncioGuardado = async (idAnuncio, idUsuario) => {
  return await Anuncios.borrarAnuncioGuardado(idAnuncio, idUsuario);
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
