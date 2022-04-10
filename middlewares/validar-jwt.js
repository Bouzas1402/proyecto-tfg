const jwt = require("jsonwebtoken");

const { Users } = require("../repositories/models");

const validarJWT = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  
    const usuario = await Users.findById(decoded.uid);
   // req.usuario = usuario;
    
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
    req.usuario = usuario;
console.log(req.usuario);
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
