const express = require("express");
const { list } = require("../controllers/OrdersBlingController");

const router = express.Router();

// All the routes to access the functions of PipiBlingApi
/* The route Get '../orders/' returns the orders on database, can you filtering by date('../orders?date=YYYY-MM-DD'),
 * date with amount in days('../orders?date=YYYY-MM-DD&amount=1') or by itens quantity('../orders?count=1')
 */
router.get("/", list);

module.exports = router;
