"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      Cart.hasMany(models.Transaction, {
        foreignKey: "cart_id",
      });

      Cart.belongsTo(models.Waste, {
        foreignKey: "waste_id",
      });
    }
  }
  Cart.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User Id cannot be empty",
          },
          isNumeric: {
            msg: "User Id must be a number",
          },
        },
      },
      waste_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Waste Id cannot be empty",
          },
          isNumeric: {
            msg: "Waste Id must be a number",
          },
        },
      },
      total_waste: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Total cannot be empty",
          },
          isNumeric: {
            msg: "Total must be a number",
          },
        },
      },
      status_cart: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
