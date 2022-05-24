const {Schema, model} = require("mongoose");

const {validate} = require("email-validator");
const {roles} = require("../../Utils");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  PrimerApellido: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  SegundoApellido: {
    type: String,
  },
  contraseña: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    /*validate: [
      /^(?=.*[0-9])(?=.*[az])(?=.*[AZ])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20} $/,
      "La contraseña debe tener al menos una mayuscula, un numero y un caracter no alphanumerico",
    ], */
  },
  correo: {
    type: String,
    lowercase: true,
    validate: [validate, "No es un correo valido"],
    required: [true, "El correo es oblitaorio"],
    unique: [true, "Este correo ya esta registrado"],
  },
  avatar: {
    type: Buffer,
  },
  role: {
    type: String,
    enum: roles,
    default: "USER_ROLE",
  },
  telefono: {
    type: String,
    validate: [/\d{9}/],
    required: function () {
      return this.role === "VENTAS_ROLE";
    },
  },
  estado: {
    type: Boolean,
    default: true,
  },
  anuncios: {
    type: [Schema.Types.ObjectId],
    ref: "Anuncios",
  },
  creacionCuenta: {
    type: Date,
    default: Date.now,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const {__v, contraseña, _id, ...usuario} = this.toObject();
  return usuario;
};

module.exports = model("User", UsuarioSchema);
