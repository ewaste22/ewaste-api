"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Pickup, {
        foreignKey: "pickup_id",
      });

      Transaction.belongsTo(models.Cart, {
        foreignKey: "cart_id",
      });
    }
  }
  Transaction.init(
    {
      cart_id: DataTypes.NUMBER,
      status_transaction: DataTypes.STRING,
      totalPoint_transaction: DataTypes.NUMBER,
      pickup_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
