const { validationResult } = require("express-validator");
// @desc    2- middleware ==> catch errors from rules if exist
// @desc    Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are errors, send a 400 Bad Request response with the error details
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validatorMiddleware;
