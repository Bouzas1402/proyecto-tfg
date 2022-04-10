const express = require("express");
const acl = require("express-acl");
const { checkSchema } = require("express-validator");

const Users = require("./users");
const Roles = require("./roles");
const Anuncios = require("./anuncios");
const userValidate = require("../middlewares/schema/user")

const { validate, validarJWT } = require("../middlewares");
const { esEmailValido } = require("../helpers/db-validators");
const { roles } = require("../Utils")

const app = express();

// conseguir token
app.post("/proyecto/login", Users.login);

app.use(validarJWT);

acl.config({
  baseUrl: "proyecto",
});

app.use(acl.authorize);

// User
app.get("/proyecto/user",Users.get);
app.get("/proyecto/user/:id",Users.get);
app.post("/proyecto/user",  checkSchema(userValidate), Users.crear);
app.put("/proyecto/user");
app.delete("/proyecto/user", validarJWT, Users.borrar);

// Roles
app.get("/proyecto/roles/get", Roles.get);

// Anuncios
app.get("/proyecto/anuncios", Anuncios.get);
app.post("/proyecto/anuncios", validarJWT, Anuncios.post);
app.delete("/proyecto/anuncios");
app.put("/proyecto/anuncios")

module.exports = app;
