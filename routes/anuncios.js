const {Anuncios} = require("../controllers");

const get = async (req, res) => {
  try {
    const anuncios = await Anuncios.get();
    res.status(200).json({
      anuncios,
    });
  } catch (err) {
    return res.status(500).json({error: `Fallo al buscar los anuncios ${err}`});
  }
};

const borrar = async (req, res) => {
  try {
    const {idAnuncio} = req.params;
    const data = await Anuncios.borrar(idAnuncio);
    res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).json({error: `Fallo al borrar el anuncio ${err}`});
  }
};

const post = async (req, res) => {
  try {
    const anuncio = req.body.values || req.body;

    anuncio.usuarioCuelga = req.usuario._id;
    const data = await Anuncios.post(anuncio);
    res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).json({error: "Fallo al crear el anuncio - rutas"});
  }
};

const getById = async (req, res) => {
  try {
    const {id} = req.params;
    const data = await Anuncios.getById(id);
    res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).json({error: `Fallo al buscar los anuncios ${err}`});
  }
};

const getAllPaginated = async (req, res) => {
  try {
    const users = await Anuncios.getAllPaginated(req.query);
    return res.status(200).json({data: users});
  } catch (err) {
    return res.status(500).json({error: `Fallo al buscar los anuncios ${err}`});
  }
};

const getAnunciosGuardados = async (req, res) => {
  try {
    const {_id} = req.usuario;
    const data = await Anuncios.getAnunciosGuardados(_id);
    res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).json({error: `Fallo al buscar los anuncios ${err}`});
  }
};

const borrarAnuncioGuardado = async (req, res) => {
  try {
    const idAnuncio = req.params.idAnuncio;
    const {_id} = req.usuario;
    const data = await Anuncios.borrarAnuncioGuardado(idAnuncio, _id);
    res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).json({error: `Fallo al borrar el anuncio ${err}`});
  }
};

const getByUser = async (req, res) => {
  try {
    const {_id} = req.usuario;
    const data = await Anuncios.getByUser(_id);
    res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).json({error: `error al buscar el anuncio ${err}`});
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
