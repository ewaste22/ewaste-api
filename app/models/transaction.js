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
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Cart Id cannot be empty",
          },
          isNumeric: {
            msg: "Cart Id must be a number",
          },
        },
        status_transaction: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Status cannot be empty",
            },
          },
        },
        totalPoint_transaction: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Total Point cannot be empty",
            },
            isNumeric: {
              msg: "Total Point must be a number",
            },
          },
        },
        pickup_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Pickup Id cannot be empty",
            },
            isNumeric: {
              msg: "Pickup Id must be a number",
            },
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
