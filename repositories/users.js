const { Users } = require("./models");

const get = async (req, res) => {
  let users;
  try {
    console.log("modelos");
    users = await Users.find({});
  } catch (err) {
    console.log(err);
    throw new Error("error en el repositorio");
  }
  return users;
};

module.exports = { get };
