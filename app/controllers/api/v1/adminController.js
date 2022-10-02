const { Administrator } = require("../../../models");
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
      const { fullname_admin, email_admin, password } = req.body;

      if (!email_admin || !password || !fullname_admin) {
        throw {
          name: "badRequest",
          message: "All field must be filled",
        };
      }

      const hash = await hashPassword(password);
      const user = await Administrator.findOne({
        where: {
          email_admin,
        },
      });

      if (user) {
        throw {
          name: "badRequest",
          message: "Email already exist",
        };
      } else if (!user) {
        const newUser = await Administrator.create({
          fullname_admin,
          email_admin,
          password: hash,
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
      const { email_admin, password } = req.body;

      if (!email_admin || !password) {
        throw {
          name: "badRequest",
          message: "All field must be filled",
        };
      }
      const user = await Administrator.findOne({
        where: {
          email_admin,
        },
      });
      if (email_admin === null) {
        throw {
          name: "badRequest",
          message: "Email is required",
        };
      }

      if (password === null) {
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
      const isPasswordValid = await checkPassword(user.password, password);

      if (!isPasswordValid) {
        throw {
          name: "wrongEmailPassword",
          message: "Wrong email or password",
        };
      }

      const token = createToken({
        id: user.id,
        email_admin: user.email_admin,
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
      } else if (err.name === "badRequest") {
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
      const { fullname_admin, email_admin } = req.body;
      const id = req.params.id;

      const user = await Administrator.findByPk(id);
      if (!user) {
        throw {
          name: "badRequest",
          message: "User not found",
        };
      }

      if (user.email_admin === email_admin) {
        throw {
          name: "badRequest",
          message: "Email already exist",
        };
      }

      const updatedUser = await Administrator.update(
        {
          fullname_admin,
          email_admin,
        },
        {
          where: { id },
        }
      );

      res.status(201).json({
        message: "success",
        data: {
          fullname_admin,
          email_admin,
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

      const user = await Administrator.findByPk(id);
      if (!user) {
        throw {
          name: "badRequest",
          message: "User not found",
        };
      }

      const isPasswordValid = await checkPassword(user.password, oldPassword);

      if (!isPasswordValid) {
        throw {
          name: "wrongPassword",
          message: "Wrong password",
        };
      }

      const hashedPassword = await hashPassword(newPassword);

      await Administrator.update({ password: hashedPassword }, { where: { id } });
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      if (err.name === "wrongPassword") {
        return res.status(401).json({
          name: err.name,
          message: err.message,
        });
      } else if (err.name === "badRequest") {
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
