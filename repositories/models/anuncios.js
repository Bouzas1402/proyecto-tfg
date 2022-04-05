const { Schema, model } = require("mongoose");

//const { Calles } = require(".");
const AnuncioSchema = Schema({
  titulo: {
    type: String,
    require: [true, "El titulo es obligatorio"],
  },
 // direccion: [{Calles}],
  fotos: [{ titulo: String, URL: String }],
  descripcion: {
    type: String,
  },
  creacion: {
    type: Date,
    default: new Date(),
  },
});
module.exports = model("Anuncio", AnuncioSchema);