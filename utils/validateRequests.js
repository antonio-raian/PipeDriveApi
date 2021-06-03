/* eslint-disable consistent-return */
const { validationResult } = require("express-validator");

// Functions to auxiliate
exports.validateReq = (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};
