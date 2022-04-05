const { Roles } = require("../repositories");

const get = async () => {
    let roles;
    try {
        roles = await Roles.get();
    } catch (err) {
        console.log(err);
    }
    return roles;
};
module.exports = {
    get,
}