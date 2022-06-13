const mongoose = require("mongoose");
const request = require("supertest");

process.env.urlDB = "mongodb://localhost:27017/test_proyecto";
const app = require("../../server");

//before((done) => {});
//before((done) => {});
before((done) => {
  request(app)
    .post("/proyecto/login")
    .send({correo: "admin@correo.com", contraseña: "admin"})
    .set("Accept", "application/json")
    .set("origin", "LocalHost")
    .expect("Content-Type", /json/)
    .end((err, res) => {
      global.admin = {token: res.body.token, id: res.body.usuario._id};
      done();
    });
});
before((done) => {
  request(app)
    .post("/proyecto/login")
    .send({correo: "ventas1@correo.com", contraseña: "ventas"})
    .set("Accept", "application/json")
    .set("origin", "LocalHost")
    .expect("Content-Type", /json/)
    .end((err, res) => {
      global.ventas = {token: res.body.token, id: res.body.usuario._id};
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
