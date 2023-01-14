const { Courier } = require("../../../models");
const cloudinary = require("../../../utils/cloudinary");
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

      if (!email_courier || !password_courier || !fullname_courier || !transportationType_courier || !maxLoad_courier || !nopol_courier || !nomor_courier || !req.file) {
        throw {
          name: "badRequest",
          message: "All field must be filled",
        };
      }

      const fileBase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;

      const image_courier = await cloudinary.uploader.upload(file, { folder: "couriers" }, function (error, result) {
        if (error) {
          return error;
        } else {
          console.log("success upload", result);
        }
      });

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
          image_courier: image_courier.url,
          transportationType_courier,
          maxLoad_courier,
          nopol_courier,
          nomor_courier,
          password_courier: hash,
        });

        res.status(201).json({
          status: "success",
          message: "Register success",
          data: {
            newUser,
          },
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
        email_courier: user.email_courier,
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
      const id = req.params.id;

      const user = await Courier.findByPk(id);
      if (!user) {
        throw {
          name: "badRequest",
          message: "User not found",
        };
      }

      const email = await Courier.findOne({
        where: {
          email_courier: req.body.email_courier,
        },
      });

      if (req.body.email_courier === email.email_courier && user.id !== email.id) {
        throw {
          name: "badRequest",
          message: "Email already exist",
        };
      }

      if (req.file) {
        const public_id = user.image_courier.replace(/(.*)([\/](\w+))(\.(jpg|png|jpeg|webp))/gm, "$3");

        await cloudinary.uploader.destroy(`couriers/${public_id}`);

        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;
        cloudinary.uploader.upload(file, { folder: "couriers" }, async function (error, result) {
          if (error) {
            return error;
          } else {
            await Courier.update(
              {
                image_courier: result.url,
                ...req.body,
              },
              {
                where: {
                  id,
                },
              }
            );

            res.status(200).json({
              status: "success",
              message: "Update success",
              data: {
                ...req.body,
                image_courier: result.url,
              },
            });
          }
        });
      } else {
        await Courier.update(
          {
            email_courier: req.body.email_courier,
            fullname_courier: req.body.fullname_courier,
            transportationType_courier: req.body.transportationType_courier,
            maxLoad_courier: req.body.maxLoad_courier,
            nopol_courier: req.body.nopol_courier,
            nomor_courier: req.body.nomor_courier,
          },
          {
            where: {
              id,
            },
          }
        );

        res.status(200).json({
          status: "success",
          message: "Update success",
          data: {
            ...req.body,
          },
        });
      }
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
  async getCurrentCourier(req, res) {
    try{
      res.status(200).json({
        status: "success",
        message: "Get current courier success",
        data: {
          courier: req.courier,
        },
      })
    }catch(err){
      return res.status(500).json({
        name: err.name || "InternalServerError",
        message: err.message || "Internal Server Error",
      });
    }
  },
  async getCourierById(req, res) {
    try{
      const id = req.params.id;
      const courier = await Courier.findByPk(id);
      if(!courier){
        throw {
          name: "badRequest",
          message: "Courier not found",
        };
      }
      res.status(200).json({
        status: "success",
        message: "Get courier by id success",
        data: {
          courier,
        },
      })
    }catch(err){
      if (err.name === "badRequest") {
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
  async getAllCourier(req, res) {
    try {
      const courier = await Courier.findAll();
      res.status(200).json({
        status: "success",
        message: "courier found successfully",
        result: courier.length,
        data: {
          courier,
        },
      });
    } catch (err) {
      res.status(422).json({
        status: "failed",
        name: "Unprocessable Entity",
        message: err.message || "Unprocessable Entity",
      });
    }
  }
};
