const jwt = require("jsonwebtoken");

const {Users} = require("../repositories/models");

const validarJWT = async (req, res, next) => {
  try {
    //const token = req.header("token");
    console.log(req.headers.token);
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        msg: "No hay token en la petición",
      });
    }

    const {_id, role} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const {nombre, correo, estado} = await Users.findById({_id});
    req.usuario = {nombre, correo, role, _id, estado};
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
