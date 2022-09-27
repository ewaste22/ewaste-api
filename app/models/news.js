"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.Administrator, {
        foreignKey: "admin_id",
      });
    }
  }
  News.init(
    {
      title_news: DataTypes.STRING,
      image_news: DataTypes.TEXT,
      body_news: DataTypes.TEXT,
      admin_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
