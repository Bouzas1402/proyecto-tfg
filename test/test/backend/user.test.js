const request = require("supertest");
const { expect } = require("chai");

const app = require("../../../server");

describe("Test Users", () => {
  describe("GET /proyecto/user/get - Show Users for the aplicaction", () => {
    it("T_USER001", (done) => {
      request(app)
        .get("/proyecto/user/get")
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(200);
          expect(res.body.users[0]).to.include(
            {
              nombre: "Usuario Administrador",
              correo: "admin@correo.com",
              rol: "ADMIN_ROLE",
              estado: true,
              google: false
            }
        );
        expect(res.body.users[1]).to.include(
            {
              nombre: "Usuario normal 1",
              correo: "usuario1@correo.com",
              rol: "USER_ROLE",
              estado: true,
              google: false
            }
        );
        expect(res.body.users[2]).to.include(
            {
              nombre: "Usuario ventas",
              correo: "ventas@correo.com",
              rol: "VENTAS_ROLE",
              estado: true,
              google: false
            }
        );
        expect(res.body.users[0], res.body.users[1], res.body.users[2]).to.have.property("uid");

        
        //expect(res.body.users[]);
        //expect(res.body.users[]);
        //expect(res.body.users[]);
          done();
          //    expect().
          //expect().body
        });
    });
  });
  describe("POST /proyecto/user/post - ")


});
