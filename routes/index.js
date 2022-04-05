const express = require("express");

const Users = require("./users");
const Roles = require("./roles");
const Anuncios = require("./anuncios");

const app = express();

// User
app.get("/proyecto/user/get", Users.get);
app.post("proyecto/user/post");

// Roles
app.get("/proyecto/roles/get", Roles.get);

// Anuncios
app.get("/proyecto/anuncios/get");

module.exports = app;
