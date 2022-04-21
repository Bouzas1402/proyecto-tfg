const request = require("supertest");
const {expect} = require("chai");

const app = require("../../../server");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjU2ZGY3MzkwNTViOTM1Y2MxMTZmZmYiLCJyb2xlIjoiVVNFUl9ST0xFIiwiaWF0IjoxNjUwNDkzMTcwLCJleHAiOjE2NTA1MDc1NzB9.C-bnK3LSmcikBty8k60us_XrYo5RdCg1pRfueTkAfBo";
const rutasTotal = [
  {path: "/proyecto/anuncios", methods: ["GET", "POST", "DELETE"]},
  {path: "/anuncios/proyecto/usuarios", methods: ["GET", "PUT", "DELETE"]},
  {path: "/anuncios/proyecto", methods: ["GET"]},
  {path: "/anuncios", methods: ["GET", "POST"]},
];
const rutasExaminar = [
  {path: "/anuncios", methods: ["GET"], replace: true},
  {path: "/proyecto/anuncios", methods: ["GET"], replace: false},
  {path: "/proyecto", methods: ["DELETE", "PUT"], replace: false},
];

const pruebas = (index, endpoint, method, expected, origin) => {
  describe("Test RUTA", () => {
    it(`${index}) - ${endpoint} - ${method} - ${origin} - ${
      expected ? "Resultado esperado 401" : "Resultado esperado distinto a 401"
    }`, (done) => {
      switch (method) {
        case "GET":
          request(app)
            .get(endpoint)
            .set("Accept", "application/json")
            .set("origin", origin)
            .set("token", global.tokenUsuario)
            .expect("Content-Type", /json/)
            .end((err, res) => {
              console.log(res.status);
              if (!expected) {
                expect(res.status).to.not.equal(401);
              } else {
                expect(res.status).to.equal(401);
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
              console.log(res.status);
              if (!expected) {
                expect(res.status).to.not.equal(401);
              } else {
                expect(res.status).to.equal(401);
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
              console.log(res.status);
              if (!expected) {
                expect(res.status).to.not.equal(401);
              } else {
                expect(res.status).to.equal(401);
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
              console.log(res.status);
              //console.log(expected);
              if (!expected) {
                expect(res.status).to.not.equal(401);
              } else {
                expect(res.status).to.equal(401);
              }
              done();
            });
          break;
      }
    });
  });
};
let index = 1;
rutasTotal.map((ruta) => {
  let coincidencia = rutasExaminar.filter((re) => {
    if (re.replace === true) {
      const expresion = new RegExp(`^${re.path}`);
      if (expresion.exec(ruta.path) !== null) {
        return true;
      } else {
        return false;
      }
    } else {
      if (re.path === ruta.path) {
        return true;
      } else {
        return false;
      }
    }
  });
  if (coincidencia.length > 0) {
    ruta.methods.forEach((method) => {
      if (coincidencia[0].methods.includes(method)) {
        ++index;
        pruebas(index, ruta.path, method, false, "LocalHost");
        console.log("distinto a 401", ruta.path, method);
      } else {
        ++index;
        console.log("401", ruta.path, method);
        pruebas(index, ruta.path, method, true, "LocalHost");
      }
      //
      //
      //
    });
  } else {
    ruta.methods.map((method) => {
      ++index;
      console.log("distinto a 401", ruta.path, method);
      pruebas(index, ruta.path, method, false, "LocalHost");
    });
  }
});
