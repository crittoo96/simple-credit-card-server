var express = require("express");
var router = express.Router();
var path = require("path");
const { validationResult } = require("express-validator");
const { validateCardNumber, validateEndDate } = require("./validator");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile("sample.html", { root: path.join(__dirname, "../public") });
});

router.post(
  "/credit/verify",
  [validateCardNumber, validateEndDate],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.errors, success: false });
    }

    const { cname, cno, edate } = req.body;

    res.json({
      success: true,
      message: "Credit card verified successfully!",
      cname,
      cno,
      edate,
    });
  }
);

module.exports = router;
