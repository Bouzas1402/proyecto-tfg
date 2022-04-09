    
    const bcryptjs = require("bcryptjs");
    const salt = bcryptjs.genSaltSync();
    contraseñaA = bcryptjs.hashSync("admin", salt);
    contraseñaU = bcryptjs.hashSync("usuario", salt);
    contraseñaV = bcryptjs.hashSync("ventass", salt);
    console.log(contraseñaA);
    console.log(contraseñaU);
    console.log(contraseñaV);