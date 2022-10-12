/**
 * @file contains entry point of controllers api v1 module
 */

const post = require("./post");
const userController = require("./userController");
const newsController = require("./newsController");
const adminController = require("./adminController");
const courierController = require("./courierController");
const categoryWasteController = require("./categoryWasteController");
const wasteController = require("./wasteController");
const pickupController = require("./pickupController");
const cartController = require("./cartController");

module.exports = {
  post,
  userController,
  newsController,
  adminController,
  courierController,
  categoryWasteController,
  wasteController,
  pickupController,
  cartController,
};
