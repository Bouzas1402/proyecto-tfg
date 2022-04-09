const mongoose = require("mongoose");

const { Users } = require("../repositories/models/");

// Contraeña encriptadas de los usuarios de prueba (ADMIN_ROLE : admin, USER_ROLE : usuario, VENTAS_ROLE : ventas)
passAdmin = "$2a$10$lM/dh1/Z.IHBCEwdMqJlIe/./bFEJVsGXGcDluJxZFCWS3.1TP8Hq";
passUser = "$2a$10$lM/dh1/Z.IHBCEwdMqJlIe3SHfaKY4Vc/PFbq8J5cRHBmOX4KpzWO";
passVentas = "$2a$10$lM/dh1/Z.IHBCEwdMqJlIei9a9Rb/eWNwsNhEh0YVOB/hv83D3dWu";

mongoose.Promise = global.Promise;
process.env.urlDB = "mongodb://localhost:27017/test_proyecto";

mongoose.connect(process.env.urlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", async () => {
  const usuarioAdmin = new Users({
    nombre: "Usuario Administrador",
    contraseña: passAdmin,
    correo: "admin@correo.com",
    rol: "ADMIN_ROLE",
  });
  const Administrador = await usuarioAdmin.save({ validateBeforeSave: false });

  const user1 = new Users({
    nombre: "Usuario normal 1",
    contraseña: passUser,
    correo: "usuario1@correo.com",
    rol: "USER_ROLE",
  });
  const userNormal1 = await user1.save();

  const user2 = new Users({
    nombre: "Usuario ventas",
    contraseña: passVentas,
    correo: "ventas@correo.com",
    rol: "VENTAS_ROLE",
  });
  const userVentas = await user2.save();

  mongoose.connection.close(() => {
    process.exit();
  });
});
