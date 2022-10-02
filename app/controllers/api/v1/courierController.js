const { Courier } = require("../../../models");
const { hashPassword, checkPassword, createToken } = require("../../../utils/authUtil");

module.exports = {
  async index(req, res) {
    try {
      res.status(200).json({
        message: "please auth!!",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  async register(req, res) {
    try {
      const { email_courier, password_courier, fullname_courier, transportationType_courier, maxLoad_courier, nopol_courier, nomor_courier } = req.body;

      if (!email_courier || !password_courier || !fullname_courier || !transportationType_courier || !maxLoad_courier || !nopol_courier || !nomor_courier) {
        throw {
          name: "badRequest",
          message: "All field must be filled",
        };
      }
      const hash = await hashPassword(password_courier);
      const user = await Courier.findOne({
        where: {
          email_courier,
        },
      });

      if (user) {
        throw {
          name: "badRequest",
          message: "Email already exist",
        };
      } else if (!user) {
        const newUser = await Courier.create({
          email_courier,
          fullname_courier,
          transportationType_courier,
          maxLoad_courier,
          nopol_courier,
          nomor_courier,
          password_courier: hash,
        });

        res.status(201).json({
          name: "success",
          message: "Register success",
          data: newUser,
        });
      }
    } catch (err) {
      if (err.name === "badRequest" || err.name === "SequelizeValidationError") {
        return res.status(400).json({
          name: err.name,
          message: err.message,
        });
      } else {
        return res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }
    }
  },

  async login(req, res) {
    try {
      const { email_courier, password_courier } = req.body;

      if (!email_courier || !password_courier) {
        throw {
          name: "badRequest",
          message: "All field must be filled",
        };
      }
      const user = await Courier.findOne({
        where: {
          email_courier,
        },
      });
      if (email_courier === null) {
        throw {
          name: "badRequest",
          message: "Email is required",
        };
      }

      if (password_courier === null) {
        throw {
          name: "badRequest",
          message: "Password is required",
        };
      }

      if (!user) {
        throw {
          name: "wrongEmailPassword",
          message: "Wrong email or password",
        };
      }
      const isPasswordValid = await checkPassword(user.password_courier, password_courier);

      if (!isPasswordValid) {
        throw {
          name: "wrongEmailPassword",
          message: "Wrong email or password",
        };
      }

      const token = createToken({
        id: user.id,
        email: user.email_courier,
      });

      return res.status(200).json({
        message: "success",
        id: user.id,
        token,
      });
    } catch (err) {
      if (err.name === "wrongEmailPassword") {
        return res.status(401).json({
          name: err.name,
          message: err.message,
        });
      } else if (err.name === "badRequest" || err.name === "SequelizeValidationError") {
        return res.status(400).json({
          name: err.name,
          message: err.message,
        });
      } else {
        return res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }
    }
  },

  async update(req, res) {
    try {
      const { email_courier, fullname_courier, transportationType_courier, maxLoad_courier, nopol_courier, nomor_courier } = req.body;
      const id = req.params.id;

      const user = await Courier.findByPk(id);

      if (user.email_courier === email_courier) {
        throw {
          name: "badRequest",
          message: "Email already exist",
        };
      }
      if (!user) {
        throw {
          name: "badRequest",
          message: "User not found",
        };
      }

      const updatedUser = await Courier.update(
        {
          email_courier,
          fullname_courier,
          transportationType_courier,
          maxLoad_courier,
          nopol_courier,
          nomor_courier,
        },
        {
          where: { id },
        }
      );

      res.status(201).json({
        message: "success",
        data: {
          email_courier,
          fullname_courier,
          transportationType_courier,
          maxLoad_courier,
          nopol_courier,
          nomor_courier,
        },
      });
    } catch (err) {
      if (err.name === "wrongEmailPassword") {
        return res.status(401).json({
          name: err.name,
          message: err.message,
        });
      } else if (err.name === "badRequest" || err.name === "SequelizeValidationError") {
        return res.status(400).json({
          name: err.name,
          message: err.message,
        });
      } else {
        return res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }
    }
  },

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const id = req.params.id;

      const user = await Courier.findByPk(id);
      if (!user) {
        throw {
          name: "badRequest",
          message: "User not found",
        };
      }

      const isPasswordValid = await checkPassword(user.password_courier, oldPassword);

      if (!isPasswordValid) {
        throw {
          name: "wrongPassword",
          message: "Wrong password",
        };
      }

      const hashedPassword = await hashPassword(newPassword);

      await Courier.update({ password_courier: hashedPassword }, { where: { id } });
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      if (err.name === "wrongPassword") {
        return res.status(401).json({
          name: err.name,
          message: err.message,
        });
      } else if (err.name === "badRequest" || err.name === "SequelizeValidationError") {
        return res.status(400).json({
          name: err.name,
          message: err.message,
        });
      } else {
        return res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }
    }
  },
};
