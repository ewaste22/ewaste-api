"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Administrator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Administrator.hasMany(models.News, {
        foreignKey: "admin_id",
      });
    }
  }
  Administrator.init(
    {
      email_admin: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname_admin: DataTypes.STRING,
      image_admin: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Administrator",
    }
  );
  return Administrator;
};
