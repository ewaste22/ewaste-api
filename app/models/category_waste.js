"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category_waste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category_waste.hasMany(models.Waste, {
        foreignKey: "category_id",
      });
    }
  }
  Category_waste.init(
    {
      name_category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      typeof_category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Type cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category_waste",
    }
  );
  return Category_waste;
};
