/**
 * @file contains entry point of controllers api v1 module
 */

const post = require("./post");
const userController = require("./userController");

module.exports = {
  post,
  userController,
};
