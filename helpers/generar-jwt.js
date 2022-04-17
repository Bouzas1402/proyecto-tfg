const jwt = require("jsonwebtoken");

const generarJWT = (uid = "", role = "USER_ROLE") => {
  return new Promise((resolve, reject) => {
    const payload = {uid, role};

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
