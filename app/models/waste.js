"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Waste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Waste.belongsTo(models.Category_waste, {
        foreignKey: "category_id",
      });

      Waste.hasMany(models.Cart, {
        foreignKey: "waste_id",
      });
    }
  }
  Waste.init(
    {
      name_waste: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      description_waste: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description cannot be empty",
          },
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category Id cannot be empty",
          },
          isNumeric: {
            msg: "Category Id must be a number",
          },
        },
      },
      poin_waste: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Poin cannot be empty",
          },
          isNumeric: {
            msg: "Poin must be a number",
          },
        },
      },
      image_waste: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image cannot be empty",
          },
        },
      },
      weight_waste: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Weight cannot be empty",
          },
          isNumeric: {
            msg: "Weight must be a number",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Waste",
    }
  );
  return Waste;
};
