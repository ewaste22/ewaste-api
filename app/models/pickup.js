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
      status_pickup: DataTypes.STRING,
      type_pickup: DataTypes.STRING,
      courier_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Pickup",
    }
  );
  return Pickup;
};
