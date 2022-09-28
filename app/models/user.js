"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      image_user: DataTypes.TEXT,
      address: DataTypes.TEXT,
      poin: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
