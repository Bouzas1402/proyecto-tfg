const request = require("supertest");
const {expect} = require("chai");

const app = require("../../../server");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjU2ZGY3MzkwNTViOTM1Y2MxMTZmZmYiLCJyb2xlIjoiVVNFUl9ST0xFIiwiaWF0IjoxNjUwNDkzMTcwLCJleHAiOjE2NTA1MDc1NzB9.C-bnK3LSmcikBty8k60us_XrYo5RdCg1pRfueTkAfBo";
const rutasTotal = [
  {path: "/proyecto/anuncios", methods: ["GET", "POST", "DELETE"]},
  {path: "/anuncios", methods: ["GET", "PUT"]},
];
const rutasExaminar = [{path: "/anuncios", methods: ["GET", "DELETE"]}];

const pruebas = (endpoint, method, expected, origin) => {
  describe("Test RUTA", () => {
    it(`${endpoint} - ${method} - ${origin} - ${expected}`, (done) => {
      switch (method) {
        case "GET":
          request(app)
            .get(endpoint)
            .set("Accept", "application/json")
            .set("origin", origin)
            .set("token", global.tokenUsuario)
            .expect("Content-Type", /json/)
            .end((err, res) => {
              if (!expected) {
                expect(res.status).to.not.equal(expected);
              } else {
                expect(res.status).to.equal(expected);
              }
              done();
            });
          break;
        case "POST":
          request(app)
            .post(endpoint)
            .set("Accept", "application/json")
            .set("origin", origin)
            .set("token", global.tokenUsuario)
            .expect("Content-Type", /json/)
            .end((err, res) => {
              if (!expected) {
                expect(res.status).to.not.equal(expected);
              } else {
                expect(res.status).to.equal(expected);
              }
              done();
            });
          break;
        case "PUT":
          request(app)
            .put(endpoint)
            .set("Accept", "application/json")
            .set("origin", origin)
            .set("token", global.tokenUsuario)
            .expect("Content-Type", /json/)
            .end((err, res) => {
              if (!expected) {
                expect(res.status).to.not.equal(expected);
              } else {
                expect(res.status).to.equal(expected);
              }
              done();
            });
          break;
        case "DELETE":
          request(app)
            .delete(endpoint)
            .set("Accept", "application/json")
            .set("origin", origin)
            .set("token", global.tokenUsuario)
            .expect("Content-Type", /json/)
            .end((err, res) => {
              console.log(expected);
              if (!expected) {
                expect(res.status).to.not.equal(expected);
              } else {
                expect(res.status).to.equal(expected);
              }
              done();
            });
          break;
      }
    });
  });
};
rutasTotal.map((ruta) => {
  let coincidencia = rutasExaminar.filter((re) => re.path === ruta.path);
  if (coincidencia.length > 0) {
    ruta.methods.forEach((method) => {
      if (coincidencia[0].methods.includes(method)) {
        pruebas(ruta.path, method, !401, "LocalHost");
      } else {
        pruebas(ruta.path, method, 401, "LocalHost");
      }
    });
  } else {
    ruta.methods.map((method) => {
      pruebas(ruta.path, method, 401, "LocalHost");
    });
  }
});
