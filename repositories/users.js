const bcryptjs = require("bcryptjs");

const { Users } = require("./models");
const { generarJWT } = require("../helpers");

const get = async () => {
  try {
    return await Users.find({});
  } catch (err) {
    console.log(err);
  }
};

const crear = async (user) => {
  const { nombre, correo, contraseña, role } = user;
  const data = new Users({ nombre, correo, contraseña, role });
  try {
    const { contraseña } = user;
    const salt = bcryptjs.genSaltSync();
    data.contraseña = bcryptjs.hashSync(contraseña, salt);
    const userNuevo = await data.save(data);
    return userNuevo;
  } catch (err) {
    console.log(err);
    return new Error(`Fallo al crear el usuario`);
  }
};

const login = async (correo, contraseña) => {
  try {
    const usuario = await Users.findOne({ correo });
    if (usuario && usuario.estado) {
      const constraseñaValida = bcryptjs.compareSync(
        contraseña,
        usuario.contraseña
      );
      if (!constraseñaValida) {
        return new Error("Contraseña no valida");
      }
      const token = await generarJWT(usuario.id, usuario.role);
      return token;
    } else {
      return new Error("No existe el usuario");
    }
  } catch (error) {
    console.log(error);
    return new Error("Hable con el administrador");
  }
};

const borrar = async (id) => {
  try {
    const userNuevo = new Users();
    return await userNuevo.findByIdAndUpdate(id, { estado: false });
  } catch (err) {
    console.log(err);
    return new Error("Error al borrar el usuario - respositorios");
  }
};

module.exports = { get, crear, login, borrar };
