const { Users } = require("../controllers");

const get = async (req, res) => {
  try {
    console.log("rutas");
    const usr = await Users.get();
    res.json({
      usr,
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
};
