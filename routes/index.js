const express = require("express");

const Users = require("./users");
const Roles = require("./roles");
const Anuncios = require("./anuncios");

const { validarCampos } = require("../middlewares");

const app = express();

// User
app.get("/proyecto/user/get", Users.get);
app.post("/proyecto/user/post", Users.crear);

// Roles
app.get("/proyecto/roles/get", Roles.get);

// Anuncios
app.get("/proyecto/anuncios/get", Anuncios.get);

module.exports = app;
