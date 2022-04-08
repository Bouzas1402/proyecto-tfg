const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(require("./routes"));

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.urlDB)
    .then((res) => console.log("Connected"))
    .catch((err) => console.log(err));
  console.log(`escuchando puerto ${process.env.PORT}`);
  console.log(`escuchando base de datos ${process.env.urlDB}`);
});
module.exports = app;
