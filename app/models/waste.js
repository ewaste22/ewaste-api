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
      name_waste: DataTypes.STRING,
      description_waste: DataTypes.TEXT,
      category_id: DataTypes.NUMBER,
      poin_waste: DataTypes.NUMBER,
      image_waste: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Waste",
    }
  );
  return Waste;
};
