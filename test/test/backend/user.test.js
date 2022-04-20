const request = require("supertest");
const {expect} = require("chai");

const app = require("../../../server");

const rutasTotal = [
  {path: "/proyecto/user", methods: ["GET", "POST", "DELETE"]},
  {path: "/user/activo", methods: ["GET", "PUT"]},
];
const rutasExaminar = [{path: "/proyecto/user", methods: ["GET", "DELETE"]}];

const pruebas = (endpoint, method, expected, origin) => {
  it(`${endpoint} - ${method} - ${origin} - ${expected}`, (done) => {
    switch (method) {
      case "GET":
        request(app)
          .get(endpoint)
          .set("Accept", "application/json")
          .set("origin", origin)
          .expect("Content-Type", /json/)
          .end((err, res) => {
            console.log(expected);
            console.log(res);
            expect(res.status).to.equal(expected);
            done();
          });
        console.log("GET", endpoint, method, expected, origin);
        break;
      case "POST":
        request(app)
          .post(endpoint)
          .set("Accept", "application/json")
          .set("origin", origin)
          .expect("Content-Type", /json/)
          .end((err, res) => {
            console.log(expected);

            expect(res.status).to.equal(expected);
            done();
          });
        console.log("POST", endpoint, method, expected, origin);
        break;
      case "PUT":
        request(app)
          .put(endpoint)
          .set("Accept", "application/json")
          .set("origin", origin)
          .expect("Content-Type", /json/)
          .end((err, res) => {
            console.log(expected);

            expect(res.status).to.equal(expected);
            done();
          });
        console.log("PUT", endpoint, method, expected, origin);
        break;
      case "DELETE":
        request(app)
          .delete(endpoint)
          .set("Accept", "application/json")
          .set("origin", origin)
          .expect("Content-Type", /json/)
          .end((err, res) => {
            console.log(expected);
            expect(res.status).to.equal(expected);
            done();
          });
        console.log("DELETE", endpoint, method, expected, origin);
        break;
    }
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
describe("Test Users", () => {
  xit("T_USER001", (done) => {
    request(app)
      .get("/proyecto/user/get")
      .set("Accept", "application/json")
      .set("origin", "LocalHost")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        expect(200);
        expect(res.body.users[0]).to.include({
          nombre: "Usuario Administrador",
          correo: "admin@correo.com",
          role: "ADMIN_ROLE",
          estado: true,
          google: false,
        });
        expect(res.body.users[1]).to.include({
          nombre: "Usuario normal 1",
          correo: "usuario1@correo.com",
          role: "USER_ROLE",
          estado: true,
          google: false,
        });
        expect(res.body.users[2]).to.include({
          nombre: "Usuario ventas",
          correo: "ventas@correo.com",
          role: "VENTAS_ROLE",
          estado: true,
          google: false,
        });
        expect(res.body.users[0], res.body.users[1], res.body.users[2]).to.have.property("uid");

        //expect(res.body.users[]);
        //expect(res.body.users[]);
        //expect(res.body.users[]);
        done();
        //    expect().
        //expect().body
      });
  });

  xdescribe("POST /proyecto/user/post - Add new uer ", () => {
    it("T_USER002 - Add user with incorrect email", (done) => {
      request(app)
        .post("/proyecto/user/post")
        .send({
          nombre: "Juan Bouzas",
          correo: "correo2",
          contraseña: "hollas",
          role: "USER_ROLE",
        })
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(422);
          expect(res.body.msg).to.equal("Email no valido");

          done();
        });
    });
    it("T_USER003 - Add user without data", (done) => {
      request(app)
        .post("/proyecto/user/post")
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(422);
          expect(res.body.msg).to.equal("No se introdujo ningun dato");
          done();
        });
    });

    xit("T_USER004 - Add user", (done) => {
      request(app)
        .post("/proyecto/user/post")
        .send({
          nombre: "Juan Bouzas",
          correo: "correo2@correo.com",
          contraseña: "hollas",
          role: "USER_ROLE",
        })
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(200);
          expect(res.body.user).to.deep.equal({
            nombre: "Juan Bouzas",
            correo: "correo2@correo.com",
            contraseña: "hollas",
            role: "USER_ROLE",
          });
          done();
        });
    });
  });
});
