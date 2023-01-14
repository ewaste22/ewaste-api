const { User } = require("../../../models");
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
      const { fullname, email, address, phone_number, password } = req.body;
      if (!email || !password || !fullname || !address || !phone_number) {
        throw {
          name: "badRequest",
          message: "All field must be filled",
        };
      }

      const hash = await hashPassword(password);

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        throw {
          name: "badRequest",
          message: "Email already exist",
        };
      } else if (!user) {
        const newUser = await User.create({
          fullname,
          email,
          address,
          phone_number,
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
      const { email, password } = req.body;

      if (!email || !password) {
        throw {
          name: "badRequest",
          message: "All field must be filled",
        };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (email === null) {
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
        email: user.email,
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
      const { fullname, email, address, phone_number } = req.body;
      const id = req.params.id;

      const user = await User.findByPk(id);

      const userEmail = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      console.log(userEmail, "userEmail");
      if (!user) {
        throw {
          name: "badRequest",
          message: "User not found",
        };
      }

      if (req.body.email === userEmail.email && user.id !== userEmail.id) {
        throw {
          name: "badRequest",
          message: "Email already exist",
        };
      }

      if (req.file) {
        if (user.image_user !== null) {
          const public_id = user.image_user.replace(/(.*)([\/](\w+))(\.(jpg|png|jpeg|webp))/gm, "$3");

          await cloudinary.uploader.destroy(`users/${public_id}`);
        }

        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;
        cloudinary.uploader.upload(file, { folder: "users" }, async function (error, result) {
          if (error) {
            return error;
          } else {
            await User.update(
              {
                fullname,
                email,
                address,
                phone_number,
                image_user: result.url,
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
                image_user: result.url,
              },
            });
          }
        });
      } else {
        await User.update(
          {
            ...req.body,
          },
          {
            where: { id },
          }
        );

        res.status(201).json({
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

      const user = await User.findByPk(id);
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

      await User.update({ password: hashedPassword }, { where: { id } });
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
  async getCurrentUser(req, res) {
    try{
      res.status(200).json({
        status: "success",
        message: "Get current user success",
        data: {
          user: req.user,
        },
      })
    }catch(err){
      return res.status(500).json({
        name: err.name || "InternalServerError",
        message: err.message || "Internal Server Error",
      });
    }
  },
  async getUserById(req, res) {
    try{
      const id = req.params.id;
      const user = await User.findByPk(id);

      if(!user){
        throw {
          name: "badRequest",
          message: "User not found",
        };
      }

      res.status(200).json({
        status: "success",
        message: "Get user by id success",
        data: {
          user,
        },
      })
    }catch(err){
      if(err.name === "badRequest"){
        return res.status(400).json({
          name: err.name,
          message: err.message,
        });
      }else{
        return res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }
    }
  },
  async getAllUser(req, res) {
    try{
      const users = await User.findAll();

      res.status(200).json({
        status: "success",
        message: "Get all user success",
        data: {
          users,
        },
      })
    }catch(err){
      return res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
};
