const { Anuncio } = require("../controllers");

const get = async (req, res) => {
    try {
        const anuncios = await Anuncio.get();
        req.json({
            anuncios,
        })
    } catch (err) {
    console.log(err);
}

};

module.exports = {
    get,
}