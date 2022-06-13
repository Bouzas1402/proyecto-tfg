const mongoose = require("mongoose");

const {Users} = require("../repositories/models/");

// Contraeña encriptadas de los usuarios de prueba (ADMIN_ROLE : admin, USER_ROLE : usuario, VENTAS_ROLE : ventas)
passAdmin = "$2a$10$lM/dh1/Z.IHBCEwdMqJlIe/./bFEJVsGXGcDluJxZFCWS3.1TP8Hq";
passUser = "$2a$10$lM/dh1/Z.IHBCEwdMqJlIe3SHfaKY4Vc/PFbq8J5cRHBmOX4KpzWO";
passVentas = "$2a$10$wwGabMCBroxwSe56EdiBeuT6BmtFsdhGsGth3stKor7xjfZfuFkpa";

mongoose.Promise = global.Promise;
process.env.urlDB = "mongodb://localhost:27017/test_proyecto";

mongoose.connect(process.env.urlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", async () => {
  const usuarioAdmin = new Users({
    nombre: "Usuario Administrador",
    PrimerApellido: "Admin",
    contraseña: "$2a$10$lM/dh1/Z.IHBCEwdMqJlIe/./bFEJVsGXGcDluJxZFCWS3.1TP8Hq",
    correo: "admin@correo.com",
    role: "ADMIN_ROLE",
  });
  const Administrador = await usuarioAdmin.save({validateBeforeSave: false});

  const user1 = new Users({
    nombre: "Usuario normal 1",
    PrimerApellido: "Usuario1",
    contraseña: "$2a$10$lM/dh1/Z.IHBCEwdMqJlIe3SHfaKY4Vc/PFbq8J5cRHBmOX4KpzWO",
    correo: "usuario1@correo.com",
    role: "USER_ROLE",
  });
  const userNormal1 = await user1.save();

  const userVentas = new Users({
    nombre: "Usuario ventas 1",
    PrimerApellido: "Usuario ventas 1",
    telefono: "626453344",
    contraseña: "$2a$10$wwGabMCBroxwSe56EdiBeuT6BmtFsdhGsGth3stKor7xjfZfuFkpa",
    correo: "ventas1@correo.com",
    role: "VENTAS_ROLE",
  });
  const userVentas1 = await userVentas.save();

  mongoose.connection.close(() => {
    process.exit();
  });
});
