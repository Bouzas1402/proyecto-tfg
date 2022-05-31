const jwt = require("jsonwebtoken");

const {Users} = require("../repositories/models");

const validarJWT = async (req, res, next) => {
  try {
    //const token = req.header("token");
    const token = req.headers.token;
    if (!token) {
      req.usuario = {role: "NON_ROLE"};
    } else {
      const {_id, role} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      const {nombre, correo, estado} = await Users.findById({_id});
      req.usuario = {nombre, correo, role, _id, estado};
      if (!estado) {
        return res.status(401).json({
          msg: "Usuario no existe",
        });
      }
    }

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
