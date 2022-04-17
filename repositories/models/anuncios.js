const {Schema, model} = require("mongoose");

const CalleSchema = Schema({
  comunidad: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  nombreCalle: {
    type: String,
    required: true,
  },
  portal: {
    type: Number,
    required: true,
  },
  piso: {
    type: String,
  },
  autoIndexId: false,
});

const FotosSchema = Schema({
  titulo: {
    type: String,
    require: [true, "El titulo de la foto es obligatorio"],
  },
  url: {
    type: String,
    require: [true, "La url e obligatoria"],
  },
});

const AnuncioSchema = Schema({
  titulo: {
    type: String,
    require: [true, "El titulo es obligatorio"],
  },
  direccion: [CalleSchema],
  fotos: [FotosSchema],
  descripcion: {
    type: String,
    required: true,
  },
  creacion: {
    type: Date,
    require: true,
    default: new Date(),
  },
  usuarioCuelga: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});
module.exports = model("Anuncios", AnuncioSchema);
