const express = require("express");
const acl = require("express-acl");
const {checkSchema} = require("express-validator");

const Users = require("./users");
const Roles = require("./roles");
const Anuncios = require("./anuncios");

const {validarJWT} = require("../middlewares");

const app = express();

// conseguir token
app.post("/proyecto/login", Users.login);

app.use(validarJWT);

acl.config({
  baseUrl: "/",
  decodedObjectName: "usuario",
});

app.use(acl.authorize);

// User
app.get("/proyecto/user", Users.get);
app.get("/proyecto/user/:id", Users.get);
app.post("/proyecto/user", Users.crear);
app.put("/proyecto/user");
app.delete("/proyecto/user", Users.borrar);
app.delete("/proyecto/user/:correo", Users.borrarByCorreo);

// Roles
app.get("/proyecto/roles/get", Roles.get);

// Anuncios
app.get("/proyecto/anuncios", Anuncios.get);
app.post("/proyecto/anuncios", Anuncios.post);
app.delete("/proyecto/anuncios");
app.put("/proyecto/anuncios");

module.exports = app;
