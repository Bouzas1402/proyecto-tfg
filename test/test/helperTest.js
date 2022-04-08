const mongoose = require("mongoose");
const request = require("supertest");

process.env.urlDB = "mongodb://localhost:27017/test_proyecto";
const app = require("../../server");

//global.apikey = '$2b$10$PtBCxIPG7gOoviQBc63nOOolHQVup0TS.4kq3P2tWaXBJCVuBI.MO';
//global.apikeyGestion = '$2b$10$43Uq1fNiN6/M3zGwKjeLTuL/xULrlwmsR9lrF0agh8pzSMeyvUAFC';

/*before((done) => {
  console.log("FGFD");
  request(app)
    .post("/proyecto/login")
    .send({ correo: "admin@correo.com", contraseña: "admin" })
    .set("origin", "LocalHost")
    .end((err, res) => {
      global.tokenAdmin = res.body.token;
      console.log(global.tokenAdmin);
      done();
    });
});

before((done) => {
  console.log("453543");
  request(app)
    .post("/proyecto/login")
    .send({ correo: "ventas@correo.com", contraseña: "ventas" })
    .set("origin", "LocalHost")
    .end((err, res) => {
      done();
      global.tokenVentas = res.body.token;
      console.log(global.tokenVentas);
    });
});*/

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
