const express = require("express");
const { query } = require("express-validator");
const { list, create } = require("../controllers/DealsPipeController");

const router = express.Router();

// All the routes to access the functions of PipiBlingApi
// The route  GET '../deals/ store the new orders on bling from the pipe drive won on day
router.get(
  "/",
  // Set validator to attributes required
  query("pipe_key")
    .exists()
    .withMessage("pipe_key required")
    .notEmpty()
    .withMessage("pipe_key not be empty"),
  query("company_name")
    .exists()
    .withMessage("company_name required")
    .notEmpty()
    .withMessage("company_name not be empty"),
  query("bling_key").custom((value, { req }) => {
    if (req.query.create_orders && !value) {
      throw new Error(
        'For create Order enter Bling Api Key on "bling_key" attribute'
      );
    }
    return value !== undefined || null;
  }),
  list
);
// The route POST '../deasl/ create fakes datas to pipe drive
router.post(
  "/",
  query("pipe_key")
    .exists()
    .withMessage("pipe_key required")
    .notEmpty()
    .withMessage("pipe_key not be empty"),
  query("company_name")
    .exists()
    .withMessage("company_name required")
    .notEmpty()
    .withMessage("company_name not be empty"),
  create
);

module.exports = router;
