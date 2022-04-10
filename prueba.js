const bcryptjs = require("bcryptjs");
const salt = bcryptjs.genSaltSync();
const passadmin = bcryptjs.hashSync("admin", salt);
const passuser = bcryptjs.hashSync("usuario", salt);
const passventas = bcryptjs.hashSync("ventas", salt);

console.log(passadmin);
console.log(passuser);
console.log(passventas);