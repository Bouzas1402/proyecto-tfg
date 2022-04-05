const { Anuncios } = require("./models");

const get = async () => {
    let usuarios;
    try {
        usuarios = await Anuncios.find();
    } catch (err) {
        console.log(err);
    }
    return usuarios;
};

module.exports = {
    get,
}