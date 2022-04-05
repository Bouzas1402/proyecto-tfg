const { Roles } = require("./models");

const get = async () => {
    let roles;
    try {
        roles = await Roles.find();
    } catch (err) {
        return console.log(err);
    }
    return roles;
};

module.exports = {
    get,
}