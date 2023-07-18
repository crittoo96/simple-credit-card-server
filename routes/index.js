var express = require("express");
var router = express.Router();
const { validationResult } = require("express-validator");
const { validateCardNumber } = require("./validator");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "Welcome to credit card validator" });
});

router.post("/credit/verify", [validateCardNumber], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors, success: false });
  }

  const { cname, cno, edate } = req.body;

  res.json({
    success: true,
    message: "Credit card verified successfully!",
    cname,
    cno,
    edate,
  });
});

module.exports = router;
