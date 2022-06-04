const {Users} = require("../controllers");

const get = async (req, res) => {
  try {
    const {_id} = req.usuario;
    const users = await Users.get(_id);
    return res.status(200).json({
      users,
    });
  } catch (err) {
    return new Error(`Error al buscar los usuarios: ${err}`);
  }
};

const crear = async (req, res) => {
  try {
    const user = await Users.crear(req.body);
    if (JSON.stringify(user) == "{}") {
      return new Error(`error al crear el usuario`);
    }
    return res.status(200).json({
      msg: `Usuario ${user.correo} creado`,
      user,
    });
  } catch (err) {
    return new Error(`error al crear el usuario`);
  }
};

const login = async (req, res) => {
  try {
    const {correo, contraseña} = req.body;
    const data = await Users.login(correo, contraseña);
    if (JSON.stringify(data) == "{}") {
      return new Error(`error al introducir los datos ${err}`);
    }
    const {token, usuario} = data;

    return res.status(200).json({
      token,
      usuario,
    });
  } catch (err) {
    return new Error(`Error al registrarse ${err}`);
  }
};

const borrar = async (req, res) => {
  try {
    const {_id} = req.usuario;
    const data = await Users.borrar(_id);
    return res.status(200).json({
      msg: "Usuario borrado",
      data,
    });
  } catch (err) {
    return new Error(`Error al borrar el usuario: ${err}`);
  }
};

const borrarByCorreo = async (req, res) => {
  try {
    const {correo} = req.params;
    const data = await Users.borrarByCorreo(correo);
    if (!data) {
      return res.status(403).json({
        error: "El usuario no existe",
      });
    }
    return res.status(200).json({
      msg: "Usuario borrado",
      data,
    });
  } catch (err) {
    return new Error(`Error al borrar el usuario: ${err}`);
  }
};

const guardarAnuncio = async (req, res) => {
  try {
    const {idAnuncio} = req.params;
    const {_id} = req.usuario;
    const data = await Users.guardarAnuncio(idAnuncio, _id);
    if (!data) {
      return res.status(403).json({
        error: "El anuncio no existe",
      });
    } else if (String(data).includes("Error")) {
      return res.status(200).json({
        error: "Anuncio ya guardado",
      });
    }
    return res.status(200).json({
      data,
    });
  } catch (err) {
    return new Error(`Error al guardar el anuncio: ${err}`);
  }
};

const comprobarToken = async (req, res) => {
  return res.status(200).json({
    msg: "Token valido",
  });
};

module.exports = {
  get,
  crear,
  login,
  borrar,
  borrarByCorreo,
  comprobarToken,
  guardarAnuncio,
};
