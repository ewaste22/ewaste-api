"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Courier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Courier.hasMany(models.Pickup, {
        foreignKey: "courier_id",
      });
    }
  }
  Courier.init(
    {
      email_courier: DataTypes.STRING,
      password_courier: DataTypes.STRING,
      fullname_courier: DataTypes.STRING,
      image_courier: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Courier",
    }
  );
  return Courier;
};
