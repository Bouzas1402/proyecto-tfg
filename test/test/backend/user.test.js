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
              role: "ADMIN_ROLE",
              estado: true,
              google: false
            }
        );
        expect(res.body.users[1]).to.include(
            {
              nombre: "Usuario normal 1",
              correo: "usuario1@correo.com",
              role: "USER_ROLE",
              estado: true,
              google: false
            }
        );
        expect(res.body.users[2]).to.include(
            {
              nombre: "Usuario ventas",
              correo: "ventas@correo.com",
              role: "VENTAS_ROLE",
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

  describe("POST /proyecto/user/post - Add new uer ", () => {
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
        })
    });
    it("T_USER003 - Add user with incorrect data", (done) => {
      request(app)
        .post("/proyecto/user/post")
        .send({
          nombre: "Juan Bouzas",
          correo: "correo2@correo.com",
          role: "USER_ROLE",
        })
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.error).to.equal("Fallo al crear el usuario");
          done();
        })
    });

it("T_USER004 - Add user", (done) => {
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
        })
  });

  });
  
 



});
