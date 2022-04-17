const jwt = require("jsonwebtoken");

const compararId = async (req, res, next) => {
  const token = req.header("token");
  const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  console.log(req);
  if (req.params != decoded.uid) {
    return res.status(401).json({
      msg: "No tienes permiso para esta acción.",
    });
  }
  next();
};

module.exports = {compararId};
