const { body } = require("express-validator");
const { Administrator, Category_waste } = require("../models");

module.exports = {
  createNewsValidate: [
    body("title_news").notEmpty().withMessage("Title news is required"),
    body("image_news").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image news is required");
      }
      return true;
    }),
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
    body("image_waste").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image waste is required");
      }
      return true;
    }),
    body("weight_waste").notEmpty().withMessage("Weight waste is required").isNumeric().withMessage("Weight waste must be number"),
  ],
  createPickupValidate: [
    body("status_pickup").notEmpty().withMessage("Status pickup is required"),
    body("type_pickup").notEmpty().withMessage("Type pickup is required"),
    body("courier_id").notEmpty().withMessage("Courier id is required").isNumeric().withMessage("Courier id must be number"),
  ],
  createCartValidate: [
    body("user_id").notEmpty().withMessage("User id is required").isNumeric().withMessage("User id must be number"),
    body("waste_id").notEmpty().withMessage("Waste id is required").isNumeric().withMessage("Waste id must be number"),
    body("total_waste").notEmpty().withMessage("Total waste is required").isNumeric().withMessage("Total waste must be number"),
  ],
  createDropboxValidate: [
    body("Name_dropbox").notEmpty().withMessage("Name is required"),
    body("Address_dropbox").notEmpty().withMessage("Address is required")
  ],
  createTransactionValidate: [
    body("cart_id").notEmpty().withMessage("Cart id is required").isNumeric().withMessage("Cart id must be number"),
    body("pickup_id").notEmpty().withMessage("Pickup id is required").isNumeric().withMessage("Pickup id must be number"),
    body("totalPoint_transaction").notEmpty().withMessage("Total point is required").isNumeric().withMessage("Total point must be number"),
    body("totalWeight_transaction").notEmpty().withMessage("Total weight is required").isNumeric().withMessage("Total weight must be number"),
  ]
};
