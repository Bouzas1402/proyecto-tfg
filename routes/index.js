const express = require("express");
const acl = require("express-acl");

const Users = require("./users");
const Roles = require("./roles");
const Anuncios = require("./anuncios");

const { validarCampos, validarJWT } = require("../middlewares");

const app = express();

acl.config({
  baseUrl: "proyecto",
});

app.use(acl.authorize.unless({ path: { url: "/proyecto/login"}}));

app.post("/proyecto/login", Users.login);

// User
app.get("/proyecto/user", Users.get);
app.post("/proyecto/user", Users.crear);
app.put("/proyecto/user");
app.delete("/proyecto/user", validarJWT, Users.borrar);

// Roles
app.get("/proyecto/roles/get", Roles.get);

// Anuncios
app.get("/proyecto/anuncios", Anuncios.get);
app.post("/proyecto/anuncios", validarJWT, Anuncios.post);
app.delete("/proyecto/anuncios");

module.exports = app;
