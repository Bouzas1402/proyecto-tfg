const express = require("express");
const acl = require("express-acl");

const Users = require("./users");
const Anuncios = require("./anuncios");

const {validarJWT} = require("../middlewares");

const app = express();

// Validar Token
app.use(validarJWT);

acl.config({
  baseUrl: "",
  decodedObjectName: "usuario",
});

app.use(acl.authorize);

//  Rutas publicas:
// Login
app.post("/proyecto/login", Users.login);
// Anuncios sin permisos<
app.get("/anuncios", Anuncios.get);
app.get("/anuncios/:id", Anuncios.getById);
// Registros
app.post("/proyecto/user", Users.crear);

// User
app.get("/proyecto/user", Users.get);
app.delete("/proyecto/user", Users.borrar);
app.delete("/proyecto/user/:correo", Users.borrarByCorreo);

// Anuncios
app.get("/proyecto/anuncios", Anuncios.get);
app.get("/proyecto/anunciospaginated", Anuncios.getAllPaginated);
app.get("/proyecto/anunciosguardados", Anuncios.getAnunciosGuardados);
app.get("/proyecto/anunciosubidos", Anuncios.getByUser);
app.post("/proyecto/anuncios", Anuncios.post);
app.post("/proyecto/guardaranuncios/:idAnuncio", Users.guardarAnuncio);
app.delete("/proyecto/borraranuncioguardado/:idAnuncio", Anuncios.borrarAnuncioGuardado);
app.delete("/proyecto/anuncios/:idAnuncio", Anuncios.borrar);

app.get("/proyecto/comprobarToken", Users.comprobarToken);

module.exports = app;
