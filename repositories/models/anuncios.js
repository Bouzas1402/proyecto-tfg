const {Schema, model} = require("mongoose");
const {provincias} = require("../../Utils");

const CallesSchema = Schema(
  {
    provincia: {
      type: String,
      enum: provincias,
    },
    ciudad: {
      type: String,
      required: [true],
    },
    nombreCalle: {
      type: String,
      required: [true],
    },
    portal: {
      type: Number,
      required: [true],
    },
    piso: {
      type: String,
    },
  },
  {
    _id: false,
    autoIndex: false,
  }
);

const FotosSchema = Schema(
  {
    titulo: {
      type: String,
      required: [true, "El titulo de la foto es obligatorio"],
    },
    url: {
      type: String,
      required: [true, "La url es obligatoria"],
    },
  },
  {
    _id: false,
    autoIndex: false,
  }
);

const AnuncioSchema = Schema({
  titulo: {
    type: String,
    required: [true, "El titulo es obligatorio"],
  },
  direccion: {
    type: CallesSchema,
    required: [true],
  },
  fotos: {type: [FotosSchema], required: [true]},
  descripcion: {
    type: String,
    requiredd: [true, "Es obligatorio una discripción"],
  },
  creacion: {
    type: Date,
    default: new Date(),
  },
  usuarioCuelga: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true],
  },
});

AnuncioSchema.methods.toJSON = function () {
  const {__v, ...anuncio} = this.toObject();
  return anuncio;
};

module.exports = model("Anuncios", AnuncioSchema);
