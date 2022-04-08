const mongoose = require("mongoose");

const { Users } = require("../repositories/models/");

mongoose.Promise = global.Promise;
process.env.urlDB = "mongodb://localhost:27017/test_proyecto";

mongoose.connect(process.env.urlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", async () => {
  const usuarioAdmin = new Users({
    nombre: "Usuario Administrador",
    contraseña: "admin",
    correo: "admin@correo.com",
    rol: "ADMIN_ROLE",
  });
  const Administrador = await usuarioAdmin.save({ validateBeforeSave: false });

  const user1 = new Users({
    nombre: "Usuario normal 1",
    contraseña: "usuario",
    correo: "usuario1@correo.com",
    rol: "USER_ROLE",
  });
  const userNormal1 = await user1.save();

  const user2 = new Users({
    nombre: "Usuario normal 2",
    contraseña: "usuario",
    correo: "usuario2@correo.com",
    rol: "USER_ROLE",
  });
  const userNormal2 = await user2.save();

  const user3 = new Users({
    nombre: "Usuario ventas",
    contraseña: "ventas",
    correo: "ventas@correo.com",
    rol: "VENTAS_ROLE",
  });
  const userVentas = await user3.save();

  mongoose.connection.close(() => {
    process.exit();
  });
});
