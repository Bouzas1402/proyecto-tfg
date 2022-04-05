const { Users } = require("../controllers");

const get = async (req, res) => {
  let users;
  try {
    users = await Users.get();
    res.json({
      users,
    });
  } catch (err) {
    return console.log(err);
  }
};

const post = async (req, res) => {
  try {
  } catch (err) {
    return console.log(err);
  }
};

module.exports = {
  get,
  post,
};
