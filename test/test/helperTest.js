const mongoose = require("mongoose");
const request = require("supertest");
const {generarJWT} = require("../../helpers");

process.env.urlDB = "mongodb://localhost:27017/test_proyecto";
const app = require("../../server");

//global.apikey = '$2b$10$PtBCxIPG7gOoviQBc63nOOolHQVup0TS.4kq3P2tWaXBJCVuBI.MO';
//global.apikeyGestion = '$2b$10$43Uq1fNiN6/M3zGwKjeLTuL/xULrlwmsR9lrF0agh8pzSMeyvUAFC';

before((done) => {
  request(app)
    .post("/proyecto/login")
    .send({correo: "admin@correo.com", contraseña: "admin"})
    .set("Accept", "application/json")
    .set("origin", "LocalHost")
    .end(async (err, res) => {
      global.tokenAdmin = res.body.token;
      done();
    });
});
before((done) => {
  request(app)
    .post("/proyecto/login")
    .send({correo: "usuario1@correo.com", contraseña: "usuario"})
    .set("Accept", "application/json")
    .set("origin", "LocalHost")
    .end(async (err, res) => {
      global.tokenUsuario = res.body.token;
      done();
    });
});

after((done) => {
  mongoose.connect(process.env.urlDB, {
    useNewUrlParser: true,
  });
  mongoose.connection.dropDatabase(() => {
    mongoose.connection.close(() => {
      done();
      console.log("the end");
    });
  });
});
