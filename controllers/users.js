const { Users } = require("../repositories");

const get = async () => {
  try {
    return await Users.get();
  } catch (err) {
    console.log(err);
  }
};

const crear = async (user) => {
  try {
    await Users.crear(user);
  } catch (err) {
    console.log(err);
    throw new Error("Usuario no se pudo crear");
  }
};

module.exports = {
  get,
  crear,
};
