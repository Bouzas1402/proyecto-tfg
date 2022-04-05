const { Roles } = require("../controllers");

const get = async (req, res) => {
    try {
        const roles = await Roles.get();
        res.json({
            roles,
        })
    } catch (err) {
        return console.log(err);
    }
};

module.exports = {
    get,
}