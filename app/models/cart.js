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
      user_id: DataTypes.NUMBER,
      waste_id: DataTypes.NUMBER,
      total_waste: DataTypes.NUMBER,
      status_cart: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
