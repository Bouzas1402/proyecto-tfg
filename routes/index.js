const express = require("express");

const Users = require("./users");
const Roles = require("./roles");
const Anuncios = require("./anuncios");

const { validarCampos, validarJWT } = require("../middlewares");

const app = express();

app.post("/proyecto/login", Users.login);

// User
app.get("/proyecto/user/get", Users.get);
app.post("/proyecto/user/post", Users.crear);
app.put("/proyecto/user/put");
app.delete("/proyecto/user/delete", validarJWT, Users.borrar);

// Roles
app.get("/proyecto/roles/get", Roles.get);

// Anuncios
app.get("/proyecto/anuncios/get", Anuncios.get);
app.post("/proyecto/anuncios/post", validarJWT, Anuncios.post);
app.delete("/proyecto/anuncios/delete");

module.exports = app;
