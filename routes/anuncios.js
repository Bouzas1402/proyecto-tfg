const {Anuncios} = require("../controllers");

const get = async (req, res) => {
  try {
    const anuncios = await Anuncios.get();
    res.json({
      anuncios,
    });
  } catch (err) {
    console.log(err);
    return new Error("Fallo al recuperar los anuncios - rutas");
  }
};

const post = async (req, res) => {
  try {
    const anuncio = req.body;
    const data = await Anuncios.post(anuncio);
    res.json({
      data,
    });
  } catch (err) {
    console.log(err);
    return new Error("Fallo al crear el anuncio - rutas");
  }
};

const getById = async (req, res) => {
  try {
    const {id} = req.params;
    const data = await Anuncios.getById(id);
    res.json({
      data,
    });
  } catch (err) {
    console.log(err);
    return new Error("Fallo al crear el anuncio - rutas");
  }
};

module.exports = {
  get,
  post,
  getById,
};
