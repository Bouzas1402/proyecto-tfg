const express = require("express");

const Users = require("./users");

const app = express();

// User
app.get("/proyecto/user/get", Users.get);
app.post("proyecto/user/post");
module.exports = app;
