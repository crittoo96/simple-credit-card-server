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
      "Invalid card number, https://stripe.com/docs/testing contains test card number. Use test card number."
    ),

  validateEndDate: body("edate")
    .custom((value, { req }) => {
      if (!moment(value, "MM/YY", true).isValid()) {
        throw new Error("Invalid end date. Format should be MM/YY");
      }
      return true;
    })
    .custom((value, { req }) => {
      // const compareDate = new Date();
      const yy = value.slice(-2);
      const mm = value.slice(0, 2);
      const formattedExpiryDateStr = `20${yy}-${mm}`;
      const expiryDate = moment(formattedExpiryDateStr, "YYYY-MM");

      // const formattedCompareDate = moment(compareDate);

      if (expiryDate.isSameOrBefore(moment())) {
        throw new Error("Invalid end date. Date should be in the future.");
      }
      return true;
    }),
};
