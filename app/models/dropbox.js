'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dropbox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dropbox.init(
    {
    Name_dropbox: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image cannot be empty"
        }
      },
    },
    Address_dropbox: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "Address cannot be empty"
        },
      },
    },
    Lat_dropbox: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Long_dropbox: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Dropbox',
  });
  return Dropbox;
};