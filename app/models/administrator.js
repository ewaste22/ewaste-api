"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Administrator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Administrator.hasMany(models.News, {
        foreignKey: "admin_id",
      });
    }
  }
  Administrator.init(
    {
      email_admin: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Email format is not correct",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
          len: {
            args: [6],
            msg: "Password must be at least 6 characters",
          },
        },
      },
      fullname_admin: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Fullname cannot be empty",
          },
        },
      },
      image_admin: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: {
            msg: "Image must be a valid url",
          }
        },
      },
    },
    {
      sequelize,
      modelName: "Administrator",
    }
  );
  return Administrator;
};
