const { Schema, model } = require("mongoose");
const CalleSchema = Schema({
    comunidad: {
      type: String,
    },
    provincia: {
      type: String,
    },
    ciudad: {
      type: String,
    },
    nombreCalle: {
      type: String,
    },
    portal: {
      type: Number,
    },
    piso: {
      type: String,
    },
  });
module.exports = model("Calle", CalleSchema)