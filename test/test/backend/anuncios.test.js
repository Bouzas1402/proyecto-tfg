const request = require("supertest");
const {expect} = require("chai");

process.env.DB_URL = "mongodb://localhost:27017/test_proyecto";

const app = require("../../../server");

// Rutas
// GET    - /proyecto/anuncios                         - Anuncios.get() X
// GET    - /proyecto/anunciospaginated                - Anuncios.getAllPaginated() X
// GET    - /proyecto/anunciosguardados                - Anuncios.getAnunciosGuardados() X
// GET    - /proyecto/anunciosubidos                   - Anuncios.getByUser() X
// POST   - /proyecto/anuncios                         - Anuncios.post() X
// POST   - /proyecto/guardaranuncios/:idAnuncio       - Users.guardarAnuncio() X
// DELETE - /proyecto/borraranuncioguardado/:idAnuncio - Anuncios.borrarAnuncioGuardado() X
// DELETE - /proyecto/anuncios/:idAnuncio              - Anuncios.borrar() X

// Variables para los test:
let tokenUsuarioVentas;
let idUsuarioVentas;
let idAnuncio;
describe("T_ANUN - Test sobre las rutas y los metodos de ANUNCIOS", () => {
  describe("Login para conseguir token e id del usuario ventas", () => {
    it("LOGIN", (done) => {
      request(app)
        .post("/proyecto/login")
        .send({correo: "ventas1@correo.com", contraseña: "ventas"})
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          tokenUsuarioVentas = res.body.token;
          idUsuarioVentas = res.body.usuario._id;
          done();
        });
    });
  });
  describe("POST - T_ANUN100 - POST - /proyecto/anuncios - Anuncios.post() - Crea nuevos anuncios", () => {
    it("T_ANUN101 - Crear nuevo anuncio", (done) => {
      request(app)
        .post("/proyecto/anuncios")
        .send({
          titulo: "Golem, The (Golem, wie er in die Welt kam, Der)",
          direccion: {provincia: "Galicia", ciudad: "Ourense", nombreCalle: "Summit", portal: "962", piso: null},
          fotos: [
            {url: "http://dummyimage.com/239x100.png/ff4444/ffffff", titulo: "Grand Cherokee"},
            {url: "http://dummyimage.com/143x100.png/dddddd/000000", titulo: "Suburban 2500"},
          ],
          descripcion:
            "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
          caracteristicas: {
            dormitorios: 1,
            baños: 1,
            m2: 192,
            equipamiento: ["Human Resources"],
            zonasComunes: ["Sales", "Engineering"],
            otros: ["Support", "Services", "Legal", "Sales"],
          },
          precioMes: 742,
        })
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          idAnuncio = res.body.data._id;
          expect(res.body.data).to.nested.include({
            titulo: "Golem, The (Golem, wie er in die Welt kam, Der)",
            "direccion.provincia": "Galicia",
            "direccion.ciudad": "Ourense",
            "direccion.nombreCalle": "Summit",
            "direccion.portal": "962",
            "direccion.piso": null,
            "fotos[0].url": "http://dummyimage.com/239x100.png/ff4444/ffffff",
            "fotos[0].titulo": "Grand Cherokee",
            "fotos[1].url": "http://dummyimage.com/143x100.png/dddddd/000000",
            "fotos[1].titulo": "Suburban 2500",
            descripcion:
              "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
            "caracteristicas.dormitorios": 1,
            "caracteristicas.baños": 1,
            "caracteristicas.m2": 192,
            "caracteristicas.equipamiento[0]": "Human Resources",
            "caracteristicas.zonasComunes[0]": "Sales",
            "caracteristicas.zonasComunes[1]": "Engineering",
            "caracteristicas.otros[0]": "Support",
            "caracteristicas.otros[1]": "Services",
            "caracteristicas.otros[2]": "Legal",
            "caracteristicas.otros[3]": "Sales",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 742,
          });
          expect(res.body.data).to.have.property("creacion");
          expect(res.body.data).to.have.property("_id");
          done();
        });
    });
    it("T_ANUN102 - Crear un segundo anuncio", (done) => {
      request(app)
        .post("/proyecto/anuncios")
        .send({
          titulo: "Ffolkes",
          direccion: {
            provincia: "Castilla - Leon",
            ciudad: "Zamora",
            nombreCalle: "Heffernan",
            portal: "46",
            piso: "8748",
          },
          fotos: [
            {url: "http://dummyimage.com/196x100.png/ff4444/ffffff", titulo: "rio"},
            {url: "http://dummyimage.com/178x100.png/dddddd/000000", titulo: "Sonoma"},
            {url: "http://dummyimage.com/126x100.png/5fa2dd/ffffff", titulo: "SL-Class"},
            {url: "http://dummyimage.com/172x100.png/cc0000/ffffff", titulo: "Safari"},
          ],
          descripcion:
            "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
          caracteristicas: {
            dormitorios: 5,
            baños: 3,
            m2: 42,
            equipamiento: ["Training", "Engineering"],
            otros: ["Research and Development", "Training", "Business Development"],
          },
          precioMes: 1883,
        })
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data).to.nested.include({
            titulo: "Ffolkes",
            "direccion.provincia": "Castilla - Leon",
            "direccion.ciudad": "Zamora",
            "direccion.nombreCalle": "Heffernan",
            "direccion.portal": "46",
            "direccion.piso": "8748",
            "fotos[0].url": "http://dummyimage.com/196x100.png/ff4444/ffffff",
            "fotos[0].titulo": "rio",
            "fotos[1].url": "http://dummyimage.com/178x100.png/dddddd/000000",
            "fotos[1].titulo": "Sonoma",
            "fotos[2].url": "http://dummyimage.com/126x100.png/5fa2dd/ffffff",
            "fotos[2].titulo": "SL-Class",
            "fotos[3].url": "http://dummyimage.com/172x100.png/cc0000/ffffff",
            "fotos[3].titulo": "Safari",
            descripcion:
              "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
            "caracteristicas.dormitorios": 5,
            "caracteristicas.baños": 3,
            "caracteristicas.m2": 42,
            "caracteristicas.equipamiento[0]": "Training",
            "caracteristicas.equipamiento[1]": "Engineering",
            "caracteristicas.otros[0]": "Research and Development",
            "caracteristicas.otros[1]": "Training",
            "caracteristicas.otros[2]": "Business Development",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 1883,
          });
          expect(res.body.data.caracteristicas.zonasComunes).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.data).to.have.property("creacion");
          expect(res.body.data).to.have.property("_id");
          done();
        });
    });
  });
  describe("GET - T_ANUN200 - /proyecto/anuncios - Anuncios.get() - Buscar todos los anuncios de la base de datos", () => {
    it("T_ANUN201 - Buscar los anuncios de la base de datos", (done) => {
      request(app)
        .get("/proyecto/anuncios")
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.anuncios[0]).to.nested.include({
            titulo: "Golem, The (Golem, wie er in die Welt kam, Der)",
            "direccion.provincia": "Galicia",
            "direccion.ciudad": "Ourense",
            "direccion.nombreCalle": "Summit",
            "direccion.portal": "962",
            "direccion.piso": null,
            "fotos[0].url": "http://dummyimage.com/239x100.png/ff4444/ffffff",
            "fotos[0].titulo": "Grand Cherokee",
            "fotos[1].url": "http://dummyimage.com/143x100.png/dddddd/000000",
            "fotos[1].titulo": "Suburban 2500",
            descripcion:
              "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
            "caracteristicas.dormitorios": 1,
            "caracteristicas.baños": 1,
            "caracteristicas.m2": 192,
            "caracteristicas.equipamiento[0]": "Human Resources",
            "caracteristicas.zonasComunes[0]": "Sales",
            "caracteristicas.zonasComunes[1]": "Engineering",
            "caracteristicas.otros[0]": "Support",
            "caracteristicas.otros[1]": "Services",
            "caracteristicas.otros[2]": "Legal",
            "caracteristicas.otros[3]": "Sales",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 742,
            _id: idAnuncio,
          });
          expect(res.body.anuncios[0]).to.have.property("creacion");
          expect(res.body.anuncios[1]).to.nested.include({
            titulo: "Ffolkes",
            "direccion.provincia": "Castilla - Leon",
            "direccion.ciudad": "Zamora",
            "direccion.nombreCalle": "Heffernan",
            "direccion.portal": "46",
            "direccion.piso": "8748",
            "fotos[0].url": "http://dummyimage.com/196x100.png/ff4444/ffffff",
            "fotos[0].titulo": "rio",
            "fotos[1].url": "http://dummyimage.com/178x100.png/dddddd/000000",
            "fotos[1].titulo": "Sonoma",
            "fotos[2].url": "http://dummyimage.com/126x100.png/5fa2dd/ffffff",
            "fotos[2].titulo": "SL-Class",
            "fotos[3].url": "http://dummyimage.com/172x100.png/cc0000/ffffff",
            "fotos[3].titulo": "Safari",
            descripcion:
              "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
            "caracteristicas.dormitorios": 5,
            "caracteristicas.baños": 3,
            "caracteristicas.m2": 42,
            "caracteristicas.equipamiento[0]": "Training",
            "caracteristicas.equipamiento[1]": "Engineering",
            "caracteristicas.otros[0]": "Research and Development",
            "caracteristicas.otros[1]": "Training",
            "caracteristicas.otros[2]": "Business Development",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 1883,
          });
          expect(res.body.anuncios[1].caracteristicas.zonasComunes).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.anuncios[1]).to.have.property("creacion");
          expect(res.body.anuncios[1]).to.have.property("_id");
          done();
        });
    });
  });
  describe("GET - T_ANUN300 - /proyecto/anunciosPaginated - Anuncios.getAllPaginated() - Mostrar lo usuarios con atributos de paginacion (numero de anuncios por busqueda (tamPage) y escapar un numero x de anuncios de la busqueda (numPage)", () => {
    it("T_ANUN301 - Buscar anuncios paginados con tamPage y numPage", (done) => {
      request(app)
        .get("/proyecto/anunciospaginated")
        .query({
          tamPage: 1,
          numPage: 1,
        })
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data.result[0]).to.nested.include({
            titulo: "Ffolkes",
            "direccion.provincia": "Castilla - Leon",
            "direccion.ciudad": "Zamora",
            "direccion.nombreCalle": "Heffernan",
            "direccion.portal": "46",
            "direccion.piso": "8748",
            "fotos[0].url": "http://dummyimage.com/196x100.png/ff4444/ffffff",
            "fotos[0].titulo": "rio",
            "fotos[1].url": "http://dummyimage.com/178x100.png/dddddd/000000",
            "fotos[1].titulo": "Sonoma",
            "fotos[2].url": "http://dummyimage.com/126x100.png/5fa2dd/ffffff",
            "fotos[2].titulo": "SL-Class",
            "fotos[3].url": "http://dummyimage.com/172x100.png/cc0000/ffffff",
            "fotos[3].titulo": "Safari",
            descripcion:
              "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
            "caracteristicas.dormitorios": 5,
            "caracteristicas.baños": 3,
            "caracteristicas.m2": 42,
            "caracteristicas.equipamiento[0]": "Training",
            "caracteristicas.equipamiento[1]": "Engineering",
            "caracteristicas.otros[0]": "Research and Development",
            "caracteristicas.otros[1]": "Training",
            "caracteristicas.otros[2]": "Business Development",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 1883,
          });
          expect(res.body.data.result[0].caracteristicas.zonasComunes).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.data.result[0]).to.have.property("creacion");
          expect(res.body.data.result[0]).to.have.property("_id");
          expect(res.body.data.size).to.equal(2);
          done();
        });
    });
    it("T_ANUN302 - Buscar anuncios paginados con tamPage otro atributo incorrecto", (done) => {
      request(app)
        .get("/proyecto/anunciospaginated")
        .query({
          numPage: 1,
          error: "error",
        })
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data.result[0]).to.nested.include({
            titulo: "Golem, The (Golem, wie er in die Welt kam, Der)",
            "direccion.provincia": "Galicia",
            "direccion.ciudad": "Ourense",
            "direccion.nombreCalle": "Summit",
            "direccion.portal": "962",
            "direccion.piso": null,
            "fotos[0].url": "http://dummyimage.com/239x100.png/ff4444/ffffff",
            "fotos[0].titulo": "Grand Cherokee",
            "fotos[1].url": "http://dummyimage.com/143x100.png/dddddd/000000",
            "fotos[1].titulo": "Suburban 2500",
            descripcion:
              "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
            "caracteristicas.dormitorios": 1,
            "caracteristicas.baños": 1,
            "caracteristicas.m2": 192,
            "caracteristicas.equipamiento[0]": "Human Resources",
            "caracteristicas.zonasComunes[0]": "Sales",
            "caracteristicas.zonasComunes[1]": "Engineering",
            "caracteristicas.otros[0]": "Support",
            "caracteristicas.otros[1]": "Services",
            "caracteristicas.otros[2]": "Legal",
            "caracteristicas.otros[3]": "Sales",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 742,
            _id: idAnuncio,
          });
          expect(res.body.data.result[0]).to.have.property("creacion");
          expect(res.body.data.result[1]).to.nested.include({
            titulo: "Ffolkes",
            "direccion.provincia": "Castilla - Leon",
            "direccion.ciudad": "Zamora",
            "direccion.nombreCalle": "Heffernan",
            "direccion.portal": "46",
            "direccion.piso": "8748",
            "fotos[0].url": "http://dummyimage.com/196x100.png/ff4444/ffffff",
            "fotos[0].titulo": "rio",
            "fotos[1].url": "http://dummyimage.com/178x100.png/dddddd/000000",
            "fotos[1].titulo": "Sonoma",
            "fotos[2].url": "http://dummyimage.com/126x100.png/5fa2dd/ffffff",
            "fotos[2].titulo": "SL-Class",
            "fotos[3].url": "http://dummyimage.com/172x100.png/cc0000/ffffff",
            "fotos[3].titulo": "Safari",
            descripcion:
              "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
            "caracteristicas.dormitorios": 5,
            "caracteristicas.baños": 3,
            "caracteristicas.m2": 42,
            "caracteristicas.equipamiento[0]": "Training",
            "caracteristicas.equipamiento[1]": "Engineering",
            "caracteristicas.otros[0]": "Research and Development",
            "caracteristicas.otros[1]": "Training",
            "caracteristicas.otros[2]": "Business Development",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 1883,
          });
          expect(res.body.data.result[1].caracteristicas.zonasComunes).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.data.result[1]).to.have.property("creacion");
          expect(res.body.data.result[1]).to.have.property("_id");
          expect(res.body.data.size).to.equal(2);
          done();
        });
    });
    it("T_ANUN303 - Buscar anuncios paginados con tamPage otro atributo incorrecto", (done) => {
      request(app)
        .get("/proyecto/anunciospaginated")
        .query({
          numPage: "error",
          tamPage: "error",
        })
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data.result[0]).to.nested.include({
            titulo: "Golem, The (Golem, wie er in die Welt kam, Der)",
            "direccion.provincia": "Galicia",
            "direccion.ciudad": "Ourense",
            "direccion.nombreCalle": "Summit",
            "direccion.portal": "962",
            "direccion.piso": null,
            "fotos[0].url": "http://dummyimage.com/239x100.png/ff4444/ffffff",
            "fotos[0].titulo": "Grand Cherokee",
            "fotos[1].url": "http://dummyimage.com/143x100.png/dddddd/000000",
            "fotos[1].titulo": "Suburban 2500",
            descripcion:
              "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
            "caracteristicas.dormitorios": 1,
            "caracteristicas.baños": 1,
            "caracteristicas.m2": 192,
            "caracteristicas.equipamiento[0]": "Human Resources",
            "caracteristicas.zonasComunes[0]": "Sales",
            "caracteristicas.zonasComunes[1]": "Engineering",
            "caracteristicas.otros[0]": "Support",
            "caracteristicas.otros[1]": "Services",
            "caracteristicas.otros[2]": "Legal",
            "caracteristicas.otros[3]": "Sales",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 742,
            _id: idAnuncio,
          });
          expect(res.body.data.result[0]).to.have.property("creacion");
          expect(res.body.data.result[1]).to.nested.include({
            titulo: "Ffolkes",
            "direccion.provincia": "Castilla - Leon",
            "direccion.ciudad": "Zamora",
            "direccion.nombreCalle": "Heffernan",
            "direccion.portal": "46",
            "direccion.piso": "8748",
            "fotos[0].url": "http://dummyimage.com/196x100.png/ff4444/ffffff",
            "fotos[0].titulo": "rio",
            "fotos[1].url": "http://dummyimage.com/178x100.png/dddddd/000000",
            "fotos[1].titulo": "Sonoma",
            "fotos[2].url": "http://dummyimage.com/126x100.png/5fa2dd/ffffff",
            "fotos[2].titulo": "SL-Class",
            "fotos[3].url": "http://dummyimage.com/172x100.png/cc0000/ffffff",
            "fotos[3].titulo": "Safari",
            descripcion:
              "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
            "caracteristicas.dormitorios": 5,
            "caracteristicas.baños": 3,
            "caracteristicas.m2": 42,
            "caracteristicas.equipamiento[0]": "Training",
            "caracteristicas.equipamiento[1]": "Engineering",
            "caracteristicas.otros[0]": "Research and Development",
            "caracteristicas.otros[1]": "Training",
            "caracteristicas.otros[2]": "Business Development",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 1883,
          });
          expect(res.body.data.result[1].caracteristicas.zonasComunes).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.data.result[1]).to.have.property("creacion");
          expect(res.body.data.result[1]).to.have.property("_id");
          expect(res.body.data.size).to.equal(2);
          done();
        });
    });
  });
  describe("POST - T_ANUN400 - /proyecto/guardaranuncios/:idAnuncio - Users.guardarAnuncio() - Metodo que guarda en el atributo anuncios el id del anuncio en el array de anuncios del usuario del token de la peticion", () => {
    it("T_ANUN401 - Guardar el primer anuncio creado ", (done) => {
      request(app)
        .post(`/proyecto/guardaranuncios/${idAnuncio}`)
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data).to.nested.include({
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1,
          });
          done();
        });
    });
    it("T_ANUN402 - Intentar guardar con el mismo usuario el mismo anuncio", (done) => {
      request(app)
        .post(`/proyecto/guardaranuncios/${idAnuncio}`)
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.error).to.equal("Error: Anuncio ya guardado");
          done();
        });
    });
    it("T_ANUN403 - Intentar guardar un anuncio que no existe", (done) => {
      request(app)
        .post(`/proyecto/guardaranuncios/62a6466dc4a2f7ffa7cc39f9`)
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.error).to.equal("Error: El anuncio no existe");
          done();
        });
    });
  });
  describe("GET - T_ANUN500 - /proyecto/anunciosguardados - Anuncios.getAnunciosGuardados() - Anuncios que trae los anuncios guardados como favoritos de un usuario", () => {
    it("T_ANUN501 - Recuperar los anuncios guardados anteriormente", (done) => {
      request(app)
        .get("/proyecto/anunciosguardados")
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data[0]).to.nested.include({
            titulo: "Golem, The (Golem, wie er in die Welt kam, Der)",
            "direccion.provincia": "Galicia",
            "direccion.ciudad": "Ourense",
            "direccion.nombreCalle": "Summit",
            "direccion.portal": "962",
            "direccion.piso": null,
            "fotos[0].url": "http://dummyimage.com/239x100.png/ff4444/ffffff",
            "fotos[0].titulo": "Grand Cherokee",
            "fotos[1].url": "http://dummyimage.com/143x100.png/dddddd/000000",
            "fotos[1].titulo": "Suburban 2500",
            descripcion:
              "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
            "caracteristicas.dormitorios": 1,
            "caracteristicas.baños": 1,
            "caracteristicas.m2": 192,
            "caracteristicas.equipamiento[0]": "Human Resources",
            "caracteristicas.zonasComunes[0]": "Sales",
            "caracteristicas.zonasComunes[1]": "Engineering",
            "caracteristicas.otros[0]": "Support",
            "caracteristicas.otros[1]": "Services",
            "caracteristicas.otros[2]": "Legal",
            "caracteristicas.otros[3]": "Sales",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 742,
            _id: idAnuncio,
          });
          expect(res.body.data[0]).to.have.property("creacion");
          done();
        });
    });
    it("T_ANUN502 - Recuperar los anuncios de un usuario que no tiene anuncios guardados", (done) => {
      request(app)
        .get("/proyecto/anunciosguardados")
        .set("token", global.admin.token)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data).to.be.an.instanceOf(Array).to.be.empty;
          done();
        });
    });
  });
  describe("GET - T_ANUN600 - /proyecto/anunciosubidos - Anuncios.getByUser - Recuperar los anuncios subidos por un usuario", () => {
    it("T_ANUN601 - Recuperar los anuncios subidos por un usuario", (done) => {
      request(app)
        .get("/proyecto/anunciosubidos")
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data[0]).to.nested.include({
            titulo: "Golem, The (Golem, wie er in die Welt kam, Der)",
            "direccion.provincia": "Galicia",
            "direccion.ciudad": "Ourense",
            "direccion.nombreCalle": "Summit",
            "direccion.portal": "962",
            "direccion.piso": null,
            "fotos[0].url": "http://dummyimage.com/239x100.png/ff4444/ffffff",
            "fotos[0].titulo": "Grand Cherokee",
            "fotos[1].url": "http://dummyimage.com/143x100.png/dddddd/000000",
            "fotos[1].titulo": "Suburban 2500",
            descripcion:
              "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
            "caracteristicas.dormitorios": 1,
            "caracteristicas.baños": 1,
            "caracteristicas.m2": 192,
            "caracteristicas.equipamiento[0]": "Human Resources",
            "caracteristicas.zonasComunes[0]": "Sales",
            "caracteristicas.zonasComunes[1]": "Engineering",
            "caracteristicas.otros[0]": "Support",
            "caracteristicas.otros[1]": "Services",
            "caracteristicas.otros[2]": "Legal",
            "caracteristicas.otros[3]": "Sales",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 742,
            _id: idAnuncio,
          });
          expect(res.body.data[1]).to.nested.include({
            titulo: "Ffolkes",
            "direccion.provincia": "Castilla - Leon",
            "direccion.ciudad": "Zamora",
            "direccion.nombreCalle": "Heffernan",
            "direccion.portal": "46",
            "direccion.piso": "8748",
            "fotos[0].url": "http://dummyimage.com/196x100.png/ff4444/ffffff",
            "fotos[0].titulo": "rio",
            "fotos[1].url": "http://dummyimage.com/178x100.png/dddddd/000000",
            "fotos[1].titulo": "Sonoma",
            "fotos[2].url": "http://dummyimage.com/126x100.png/5fa2dd/ffffff",
            "fotos[2].titulo": "SL-Class",
            "fotos[3].url": "http://dummyimage.com/172x100.png/cc0000/ffffff",
            "fotos[3].titulo": "Safari",
            descripcion:
              "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
            "caracteristicas.dormitorios": 5,
            "caracteristicas.baños": 3,
            "caracteristicas.m2": 42,
            "caracteristicas.equipamiento[0]": "Training",
            "caracteristicas.equipamiento[1]": "Engineering",
            "caracteristicas.otros[0]": "Research and Development",
            "caracteristicas.otros[1]": "Training",
            "caracteristicas.otros[2]": "Business Development",
            usuarioCuelga: idUsuarioVentas,
            precioMes: 1883,
          });
          expect(res.body.data[1].caracteristicas.zonasComunes).to.be.an.instanceOf(Array).to.be.empty;
          expect(res.body.data[1]).to.have.property("_id");
          done();
        });
    });
    it("T_ANUN602 - Recuperar los anuncios de un usuario que no tiene anuncios subidos", (done) => {
      request(app)
        .get("/proyecto/anunciosubidos")
        .set("token", global.admin.token)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data).to.be.an.instanceOf(Array).to.be.empty;
          done();
        });
    });
  });
  describe("DELETE - T_ANUN700 - /proyecto/borraranuncioguardado/:idAnuncio - Anuncios.borrarAnuncioGuardado(); - Borrar anuncios guardados en el array de anuncios a traves del id", () => {
    it("T_ANUN701 - Borrar el anuncio guardado anteriormente", (done) => {
      request(app)
        .delete(`/proyecto/borraranuncioguardado/${idAnuncio}`)
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data).to.equal("Anuncio guardado");
          done();
        });
    });
    it("T_ANUN702 - Intentar borrarlo otra vez", (done) => {
      request(app)
        .delete(`/proyecto/borraranuncioguardado/${idAnuncio}`)
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data).to.equal("No esta el anuncio en anuncios guardados");
          done();
        });
    });
    it("T_ANUN703 - Intentar borrar un anuncio con id incorrecto", (done) => {
      request(app)
        .delete(`/proyecto/borraranuncioguardado/malid`)
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data).to.equal("No esta el anuncio en anuncios guardados");
          done();
        });
    });
  });
  describe("DELETE - T_ANUN800 - /proyecto/anuncios/:idAnuncio - Anuncios.borrar() - LLamada para borrar anuncios desde el id", () => {
    it("T_ANUN801 - Borrar el primer anuncio creado", (done) => {
      request(app)
        .delete(`/proyecto/anuncios/${idAnuncio}`)
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data).to.nested.include({
            acknowledged: true,
            deletedCount: 1,
          });
          done();
        });
    });
    it("T_ANUN802 - Intentar borrarlo otra vez", (done) => {
      request(app)
        .delete(`/proyecto/anuncios/${idAnuncio}`)
        .set("token", tokenUsuarioVentas)
        .set("Accept", "application/json")
        .set("origin", "LocalHost")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          expect(res.body.data).to.be.null;
          done();
        });
    });
  });
});
