const { Users } = require("../repositories");

const get = async (req, res) => {
  console.log("Controller");
  const usuarios = await Users.get();
  return usuarios;
};

module.exports = {
  get,
};
