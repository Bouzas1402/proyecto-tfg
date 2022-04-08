const jwt = require("jsonwebtoken");

const { Users } = require("../repositories/models");

const validarJWT = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    console.log(uid);
    const usuario = await Users.findById(uid);
    req.usuario = usuario;

    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario no existe",
      });
    }
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Usuario no valido",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
