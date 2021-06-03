const express = require("express");
const { list, create } = require("../controllers/DealsPipeController");

const router = express.Router();

// All the routes to access the functions of PipiBlingApi
// The route  GET '../deals/ store the new orders on bling from the pipe drive won on day
router.get("/", list);
// The route POST '../deasl/ create fakes datas to pipe drive
router.post("/", create);

module.exports = router;
