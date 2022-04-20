/*  const bcryptjs = require("bcryptjs");
    const salt = bcryptjs.genSaltSync();
    contraseñaA = bcryptjs.hashSync("admin", salt);
    contraseñaU = bcryptjs.hashSync("usuario", salt);
    contraseñaV = bcryptjs.hashSync("ventass", salt);
    console.log(contraseñaA);
    console.log(contraseñaU);
    console.log(contraseñaV); */

const rutasTotal = [
  {path: "/user/user", methods: ["GET", "POST", "DELETE"]},
  {path: "/user/activo", methods: ["GET", "PUT"]},
];
const rutasExaminar = [{path: "/user/user", methods: ["GET", "DELETE"]}];

const pruebas = () => {};

rutasTotal.map((ruta) => {
  let coincidencia = rutasExaminar.filter((re) => re.path === ruta.path);
  if (coincidencia.length > 0) {
    ruta.methods.forEach((method) => {
      if (coincidencia[0].methods.includes(method)) {
        console.log("NO 401 - ", ruta.path, method);
      } else {
        console.log("401 - ", ruta.path, method);
      }
    });
    // let coincidenciaMethods = coincidencia[0].methods.filter((cm) => cd);
  } else {
    ruta.methods.map((method) => {
      console.log("401 - ", ruta.path, method);
    });
  }
});
