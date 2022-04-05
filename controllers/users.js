const { Users } = require("../repositories");

const get = async () => {
  let usuarios;
  try {
    usuarios = await Users.get();
  } catch(err) {
    console.log(err);
  }
  return usuarios;
};

module.exports = {
  get,
};
