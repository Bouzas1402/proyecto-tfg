const {Schema, model} = require("mongoose");

const {validate} = require("email-validator");
const {roles} = require("../../Utils");
const {Anuncios} = require("./index");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  contraseña: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minLength: 8,
    //match: [/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, "La contraseña debe tener al menos una mayuscula, un numero y un caracter no alphanumerico"],
  },
  correo: {
    type: String,
    lowercase: true,
    validate: [validate, "No es un correo valido"],
    required: [true, "El correo es oblitaorio"],
    unique: [true, "Este correo ya esta registrado"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    enum: roles,
    default: "USER_ROLE",
  },
  estado: {
    type: Boolean,
    default: true,
  },
  anuncios: {
    type: [[Anuncios]],
  },
  creacionCuenta: {
    type: Date,
    default: Date.now,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const {__v, contraseña, _id, ...usuario} = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("User", UsuarioSchema);
