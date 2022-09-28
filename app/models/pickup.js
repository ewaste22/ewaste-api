"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pickup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pickup.belongsTo(models.Courier, {
        foreignKey: "courier_id",
      });

      Pickup.hasMany(models.Transaction, {
        foreignKey: "pickup_id",
      });
    }
  }
  Pickup.init(
    {
      status_pickup: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status cannot be empty",
          },
        },
      },
      type_pickup: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Type cannot be empty",
          },
        },
      },
      courier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Courier Id cannot be empty",
          },
          isNumeric: {
            msg: "Courier Id must be a number",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Pickup",
    }
  );
  return Pickup;
};
