const  ajvInstance = require("./ajv-instance");
const { roles } = require("../../Utils");

const schema = {
    properties: {
        nombre: { type: "string" },
        correo: { type: "string", format: "email" },
        contraseña: { type: "string", minLength: 7 },
        role: { 
            enum: ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"] 
        }
    },
    required: ["nombre", "correo", "contraseña", "role"],

};

module.exports = schema;

