const supertest = require("supertest");
const { expect } = require("chai");

const server = require("../../server");
const  mongoose  = require("mongoose");
const { request } = require("../../routes");

before((done) => {


  done();  
});

after((done) =>{
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => {
            server.close();
            done();
        })
    });
});

describe("Api router for user", () => {
    it("router /GET", async (done) => {
        const { headers, status, body:{ email }  } = await request(server)
            .get("/proyecto/user/get")
            .set("Accept", "application/json")
            expect(headers["Content-Type"]).match(/json/);
            expect(status).equal(200);
            expect(email).equal("'foo@bar.com'");
    });
});