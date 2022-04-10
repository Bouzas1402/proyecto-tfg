const { validationResult } = require("express-validator");

/*const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};
*/

function validate(ajvValidate) {
  return (Req, res, next) => {
    const valid = ajvValidate(req.body);
    if(!valid) {
      res.status(400).json(ajvValidate.errors);
    }
    next();
  }
}



module.exports = validate;
