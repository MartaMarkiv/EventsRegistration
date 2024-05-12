const express = require("express");
const router = express.Router();
const eventRouter = require("./event");

router.use("/event", eventRouter);

router.get('/', function(req, res, next) {
  return res.status(200).json({message: "GET method in index"});
});

module.exports = router;
