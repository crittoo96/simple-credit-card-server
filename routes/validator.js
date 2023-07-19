const { check, body } = require("express-validator");
const moment = require("moment");

module.exports = {
  validateCardNumber: check("cno")
    // To delete leading and trailing space
    .trim()

    // Validate height to accept
    // only decimal number
    .isCreditCard()

    // Custom message
    .withMessage(
      "Invalid card number, https://stripe.com/docs/testing contains test card number"
    ),

  validateEndDate: body("edate")
    .custom((value, { req }) => {
      if (!moment(value, "YYYY-MM", true).isValid()) {
        throw new Error("Invalid end date. Format should be YYYY-MM");
      }
      return true;
    })
    .custom((value, { req }) => {
      if (moment(value).isSameOrBefore(moment())) {
        throw new Error("Invalid end date. Date should be in the future.");
      }
      return true;
    }),
};
