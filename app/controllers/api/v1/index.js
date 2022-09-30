/**
 * @file contains entry point of controllers api v1 module
 */

const post = require("./post");
const userController = require("./userController");
const newsController = require("./newsController");
const categoryWasteController = require("./categoryWasteController");

module.exports = {
  post,
  userController,
  newsController,
  categoryWasteController,
};
