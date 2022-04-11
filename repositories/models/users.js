const { Schema, model } = require("mongoose");
const { roles } = require("../../Utils");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  contraseña: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  correo: {
    type: String,
    required: [true, "El correo es oblitaorio"],
    unique: true,
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
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, contraseña, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("User", UsuarioSchema);
