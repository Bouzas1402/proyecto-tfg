const jwt = require("jsonwebtoken");

const {Users} = require("../repositories/models");

const validarJWT = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(401).json({
        msg: "No hay token en la petición",
      });
    }

    const {uid, role} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const {nombre, correo, estado} = await Users.findById(uid);
    req.usuario = {nombre, correo, role, uid, estado};
    if (!estado) {
      return res.status(401).json({
        msg: "Usuario no existe",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
