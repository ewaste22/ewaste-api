const { body, param } = require("express-validator");
const { News } = require("../models");

module.exports = {
  createNewsValidate: [
    body("title_news").notEmpty().withMessage("Title news is required"),
    body("image_news").notEmpty().withMessage("Image news is required"),
    body("body_news").notEmpty().withMessage("Body news is required"),
    body("admin_id")
      .notEmpty()
      .withMessage("Admin id is required")
      .custom((value = 0) => {
        return News.findOne({ where: { id: value } }).then((news) => {
          if (!news) {
            return Promise.reject("Admin id not found");
          }
        });
      }),
  ],
};
