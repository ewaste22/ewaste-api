const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      name: "Bad Request",
      message: {
        errors: errors.array().map((err) => err.msg),
      },
    });
  }
  next();
};
