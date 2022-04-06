const bcryptjs = require("bcryptjs");

const { Users } = require("./models");

const get = async () => {
  try {
    return await Users.find({});
  } catch (err) {
    console.log(err);
  }
};

const crear = async (user) => {
  //const dataUser = user;
  // const userCheck = await Users.findOne({ correo: user.correo });
  // if (!userCheck) {
  //const { nombre, contraseña, correo, rol } = user;
  console.log(user);
  const userNuevo = new Users({
    nombre: user.nombre,
    constraseña: user.contraseña,
    correo: user.correo,
    rol: user.rol,
  });
  try {
    const { contraseña } = user;
    const salt = bcryptjs.genSaltSync();
    userNuevo.contraseña = bcryptjs.hashSync(contraseña, salt);
    await userNuevo.save(userNuevo);
  } catch (err) {
    console.log(err);
    return new Error(`Fallo al crear un usuario ${err.message}`);
  }
  // } else {
  //   return new Error("El usuario ya existe");
  //}
};

module.exports = { get, crear };
