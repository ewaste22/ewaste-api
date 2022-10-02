const { body } = require("express-validator");
const { Administrator, Category_waste } = require("../models");

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
  createWasteValidate: [
    body("name_waste").notEmpty().withMessage("Name waste is required"),
    body("description_waste").notEmpty().withMessage("Description waste is required"),
    body("poin_waste").notEmpty().withMessage("poin waste is required").isNumeric().withMessage("Poin waste must be number"),
    body("category_id")
      .notEmpty()
      .withMessage("Category id is required")
      .custom((value = 0) => {
        return Category_waste.findOne({ where: { id: value } }).then((waste) => {
          if (!waste) {
            return Promise.reject("Category id not found");
          }
        });
      }),
    body("image_waste").notEmpty().withMessage("Image waste is required"),
    body("weight_waste").notEmpty().withMessage("Weight waste is required").isNumeric().withMessage("Weight waste must be number"),
  ],
};
