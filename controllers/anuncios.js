const { Anuncios } = require("../repositories");

const get = async () => {
    let anuncios;
    try {
        anuncios = await Anuncios.get();
    } catch (err) {
        console.log(err);
    }
    return anuncios;
};

module.exports = {
    get,
}