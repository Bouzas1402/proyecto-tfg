const request = require("supertest");
const {expect} = require("chai");

process.env.DB_URL = "mongodb://localhost:27017/test_proyecto";

const app = require("../../../server");

// Rutas
// POST   - /proyecto/user         - Users.crear()
// GET    - /proyecto/user         - Users.get()
// DELETE - /proyecto/user         - Users.borrar()
// DELETE - /proyecto/user/:correo - Users.borrarByCorreo()

// Variables para los test:
let correoUserCreate;
let token;
describe("T_USER - Test sobre las rutas y los metodos de USER", () => {
  describe("POST - T_USER100 - POST - /proyecto/user - Users.crear()", () => {
    it("T_USER101 - Crear nuevo usuario", (done) => {
      request(app)
        .post("/proyecto/user")
        .send({
          nombre: "usuario 2",
          PrimerApellido: "apellido 2",
          telefono: "626584455",
          correo: "usuario2@correo.com",
          contraseña: "quevedo",
        })
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.user).to.nested.include({
            nombre: "usuario 2",
            PrimerApellido: "apellido 2",
            telefono: "626584455",
            correo: "usuario2@correo.com",
            estado: true,
          });
          expect(res.body.user.anuncios).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.user).to.have.property("creacionCuenta");
          expect(res.body.user).to.have.property("_id");
          expect(res.body.msg).to.equal(`Usuario usuario2@correo.com creado`);
          done();
        });
    });
    it("T_USER102 - Crear nuevo usuario", (done) => {
      request(app)
        .post("/proyecto/user")
        .send({
          nombre: "usuario 3",
          PrimerApellido: "apellido 3",
          telefono: "626584455",
          correo: "usuario3@correo.com",
          contraseña: "quevedo",
        })
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          correoUserCreate = res.body.user.correo;
          expect(res.body.user).to.nested.include({
            nombre: "usuario 3",
            PrimerApellido: "apellido 3",
            telefono: "626584455",
            correo: "usuario3@correo.com",
            estado: true,
          });
          expect(res.body.user.anuncios).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.user).to.have.property("creacionCuenta");
          expect(res.body.user).to.have.property("_id");
          expect(res.body.msg).to.equal(`Usuario usuario3@correo.com creado`);
          done();
        });
    });
    it("T_USER103 - Crear nuevo usuario sin algun parametro obligatorio", (done) => {
      request(app)
        .post("/proyecto/user")
        .send({
          nombre: "usuario 4",
          correo: "usuario4@correo.com",
          contraseña: "quevedo",
        })
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.error).to.have.string("Error: ");
          done();
        });
    });
  });
  describe("Login del usuario creado anteriormente", () => {
    it("Generar un token del usuario 2 para usarlo en los siugientes casos", (done) => {
      request(app)
        .post("/proyecto/login")
        .send({
          correo: "usuario2@correo.com",
          contraseña: "quevedo",
        })
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });
  });
  describe("GET - T_USER200 - /proyecto/user - Users.get() - Ruta que devuelve el usuario a travesa de la decodificacion que el middleware hace del token", () => {
    it("T_USER201 - Obtener el usuario admin", (done) => {
      request(app)
        .get("/proyecto/user")
        .set("token", global.admin.token)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.users).to.nested.include({
            nombre: "Usuario Administrador",
            PrimerApellido: "Admin",
            correo: "admin@correo.com",
            role: "ADMIN_ROLE",
            estado: true,
          });
          expect(res.body.users.anuncios).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.users).to.have.property("creacionCuenta");
          expect(res.body.users).to.have.property("_id");
          done();
        });
    });
    it("T_USER202 - Recuperar el usuario creado en T_USER101, primero se hace login se asigna el token a una variable y luego se recupera el usuario con ese token", (done) => {
      request(app)
        .get("/proyecto/user")
        .set("token", token)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.users).to.nested.include({
            nombre: "usuario 2",
            PrimerApellido: "apellido 2",
            correo: "usuario2@correo.com",
            role: "USER_ROLE",
            estado: true,
          });
          expect(res.body.users.anuncios).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.users).to.have.property("creacionCuenta");
          expect(res.body.users).to.have.property("_id");
          done();
        });
    });
    it("T_USER203 - Intentar recupear un usuario con un token no valido", (done) => {
      request(app)
        .get("/proyecto/user")
        .set(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE2MDEzZTU5ZTM4MDEzMDY1YjM3OTYiLCJyb2xlIjoiVkVOVEFTX1JPTEUiLCJpYXQiOjE2NTUwNDY0NjYsImV4cCI6MTY1NTA2MDg2Nn0.7n9B9-SPneayxTxaOj2xAhUEyxbFURr48pvgUCABlT0"
        )
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.msg).to.equal("Token no valido");
          done();
        });
    });
    it("T_USER204 - Intentar recupear un usuario con un token mal formado", (done) => {
      request(app)
        .get("/proyecto/user")
        .set("token", "kVhola")
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.msg).to.equal("Token no valido");
          done();
        });
    });
  });
  //Todos los casos en los que intente introducir un token incorrento o mal formado tendran el mismo resultado que en los test T_USER203 y T_USER204
  describe("DELETE - T_USER300 - /proyecto/user - Users.borrar() - Ruta que borra el usuario a traves de la decodificacion que el middleware hace del token", () => {
    it("T_USER301 - Borrar el usuario 2 que creamos para los casos de uso", (done) => {
      request(app)
        .delete("/proyecto/user")
        .set("token", token)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.msg).to.equal("Usuario borrado");
          expect(res.body.data).to.nested.include({
            nombre: "usuario 2",
            PrimerApellido: "apellido 2",
            correo: "usuario2@correo.com",
            role: "USER_ROLE",
            estado: true,
          });
          expect(res.body.data.anuncios).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.data).to.have.property("creacionCuenta");
          expect(res.body.data).to.have.property("_id");
          done();
        });
    });
    it("T_USER302 - Intentar borrar otra vez el mismo usuario", (done) => {
      request(app)
        .delete("/proyecto/user")
        .set("token", token)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.msg).to.equal("Usuario no existe");
          done();
        });
    });
  });
  describe("DELETE - T_USER400 - /proyecto/user/:correo - Users.borrarByCorreo() - Ruta que borra el usuario a traves del correo", () => {
    it("T_USER401 - Borrar el usuario 3 que creamos para los casos de uso", (done) => {
      request(app)
        .delete(`/proyecto/user/${correoUserCreate}`)
        .set("token", global.admin.token)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.msg).to.equal("Usuario borrado");
          expect(res.body.data).to.nested.include({
            nombre: "usuario 3",
            PrimerApellido: "apellido 3",
            telefono: "626584455",
            correo: "usuario3@correo.com",
            estado: true,
          });
          expect(res.body.data.anuncios).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.data).to.have.property("creacionCuenta");
          expect(res.body.data).to.have.property("_id");
          done();
        });
    });
    it("T_USER402 - Intentar borrar otra vez el mismo usuario", (done) => {
      request(app)
        .delete(`/proyecto/user/${correoUserCreate}`)
        .set("token", global.admin.token)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.error).to.equal("El usuario no existe");
          done();
        });
    });
    it("T_USER403 - Intentar borrar otra vez el mismo usuario", (done) => {
      request(app)
        .delete(`/proyecto/user/error@eresr`)
        .set("token", token)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.msg).to.equal("Usuario no existe");
          done();
        });
    });
  });
});
