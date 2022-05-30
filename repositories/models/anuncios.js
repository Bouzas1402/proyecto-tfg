const {Schema, model} = require("mongoose");
const {provincias} = require("../../Utils");

const CallesSchema = Schema(
  {
    provincia: {
      type: String,
      enum: provincias.value,
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
      type: String,
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

const CaracteristicasSchema = Schema(
  {
    dormitorios: {
      type: Number,
      required: [true, "Introduce el numero de habitaciones"],
    },
    baños: {
      type: Number,
      required: [true, "Introduce el numero de dormitorios"],
    },
    m2: {
      type: Number,
      required: [true, "Introduce los metros cuadrados"],
    },

    equipamiento: {
      type: [String],
    },
    zonasComunes: {
      type: [String],
    },
    otros: {
      type: [String],
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
  caracteristicas: {
    type: CaracteristicasSchema,
    required: [true, "Es obligatorio"],
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
  precioMes: {
    type: Number,
    required: [true, "Es obligatorio un precio de alquiler"],
  },
});

AnuncioSchema.methods.toJSON = function () {
  const {__v, ...anuncio} = this.toObject();
  return anuncio;
};

module.exports = model("Anuncios", AnuncioSchema);
