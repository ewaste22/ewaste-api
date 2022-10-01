const { body } = require("express-validator");
const { Administrator } = require("../models");

module.exports = {
  createNewsValidate: [
    body("title_news").notEmpty().withMessage("Title news is required"),
    body("image_news").notEmpty().withMessage("Image news is required"),
    body("body_news").notEmpty().withMessage("Body news is required"),
    body("admin_id")
      .notEmpty()
      .withMessage("Admin id is required")
      .custom((value = 0) => {
        return Administrator.findOne({ where: { id: value } }).then((news) => {
          if (!news) {
            return Promise.reject("Admin id not found");
          }
        });
      }),
  ],
  createCategoryWasteValidate: [body("name_category").notEmpty().withMessage("Name category waste is required"), body("typeOf_weight").notEmpty().withMessage("Type of weight is required")],
};
