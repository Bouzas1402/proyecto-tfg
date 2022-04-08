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
          expect(res.body.users.length).to.deep.equal(4);
          expect(res.body.users[0].nombre).to.deep.equal(
            "Usuario Administrador"
          );
          expect();
          expect();
          expect();
          expect();
          expect();
          done();
          //    expect().
          //expect().body
        });
    });
  });
});
