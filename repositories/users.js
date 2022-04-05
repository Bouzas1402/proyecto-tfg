const { Users } = require("./models");

const get = async () => {
  let users;
  try {
    users = await Users.find({});
  } catch (err) {
    console.log(err);
  }
  return users;
};

module.exports = { get };
