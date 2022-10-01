"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Courier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Courier.hasMany(models.Pickup, {
        foreignKey: "courier_id",
      });
    }
  }
  Courier.init(
    {
      email_courier: {
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
      password_courier: {
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
      fullname_courier: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Fullname cannot be empty",
          },
        },
      },
      image_courier: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: {
            msg: "Image must be a valid url",
          }
        },
      },
      transportationType_courier: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Transportation Type cannot be empty",
          },
        },
      },
      maxLoad_courier: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Max Load cannot be empty",
          },
          isNumeric: {
            msg: "Max Load must be a number",
          },
        },
      },
      nopol_courier: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nopol cannot be empty",
          },
        },
      },
      nomor_courier: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nomor cannot be empty",
          },
          isNumeric: {
            msg: "Nomor must be a number",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Courier",
    }
  );
  return Courier;
};
