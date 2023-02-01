const { Waste } = require("../../../models");
const { Category_waste } = require("../../../models");
const cloudinary = require("../../../utils/cloudinary");

module.exports = {
  async findAllWaste(req, res) {
    try {
      const wastes = await Waste.findAll({
        include: [
          {
            model: Category_waste,
            attributes: ["id", "name_category"],
          },
        ],
      });
      res.status(200).json({
        status: "success",
        message: "Wastes found successfully",
        result: wastes.length,
        data: {
          wastes,
        },
      });
    } catch (err) {
      res.status(422).json({
        status: "failed",
        name: "Unprocessable Entity",
        message: err.message || "Unprocessable Entity",
      });
    }
  },
  async findWasteById(req, res) {
    try {
      const { id } = req.params;
      const waste = await Waste.findOne({
        where: {
          id,
        },
      });
      if (!waste) {
        res.status(404).json({
          status: "failed",
          name: "Not Found",
          message: "Waste not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Waste found successfully",
          data: {
            waste,
          },
        });
      }
    } catch (err) {
      res.status(422).json({
        status: "failed",
        name: "Unprocessable Entity",
        message: err.message || "Unprocessable Entity",
      });
    }
  },
  async createWaste(req, res) {
    try {
      const fileBase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;

      const image_waste = await cloudinary.uploader.upload(file, { folder: "wastes" }, function (error, result) {
        if (error) {
          return error;
        } else {
          console.log("success upload", result);
        }
      });

      const waste = await Waste.create({
        ...req.body,
        image_waste: image_waste.url,
      });
      res.status(201).json({
        status: "success",
        message: "Waste created successfully",
        data: {
          waste,
        },
      });
    } catch (err) {
      res.status(422).json({
        status: "failed",
        name: "Unprocessable Entity",
        message: err.message || "Unprocessable Entity",
      });
    }
  },
  async updateWaste(req, res) {
    try {
      const { id } = req.params;

      const waste = await Waste.findOne({
        where: {
          id,
        },
      });

      if (!waste) {
        res.status(404).json({
          status: "failed",
          name: "Not Found",
          message: "Waste not found",
        });
      } else {
        if (req.file) {
          const public_id = waste.image_waste.replace(/(.*)([\/](\w+))(\.(jpg|png|jpeg|webp))/gm, "$3");

          await cloudinary.uploader.destroy(`wastes/${public_id}`);

          const fileBase64 = req.file.buffer.toString("base64");
          const file = `data:${req.file.mimetype};base64,${fileBase64}`;
          cloudinary.uploader.upload(file, { folder: "wastes" }, async function (error, result) {
            if (error) {
              return error;
            } else {
              await Waste.update(
                {
                  ...req.body,
                  image_waste: result.url,
                },
                {
                  where: {
                    id,
                  },
                }
              );
              res.status(200).json({
                status: "success",
                message: "Waste updated successfully",
                data: {
                  ...req.body,
                  image_waste: result.url,
                },
              });
            }
          });
        } else {
          await Waste.update(
            {
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
            message: "Waste updated successfully",
            data: {
              ...req.body,
            },
          });
        }
      }
    } catch (err) {
      res.status(422).json({
        status: "failed",
        name: "Unprocessable Entity",
        message: err.message || "Unprocessable Entity",
      });
    }
  },
  async deleteWaste(req, res) {
    try {
      const { id } = req.params;

      const waste = await Waste.findOne({
        where: {
          id,
        },
      });

      if (!waste) {
        res.status(404).json({
          status: "failed",
          name: "Not Found",
          message: "Waste not found",
        });
      } else {
        const public_id = waste.image_waste.replace(/(.*)([\/](\w+))(\.(jpg|png|jpeg|webp))/gm, "$3");

        await cloudinary.uploader.destroy(`wastes/${public_id}`);

        await Waste.destroy({
          where: {
            id,
          },
        });
        res.status(200).json({
          status: "success",
          message: "Waste deleted successfully",
        });
      }
    } catch (err) {
      res.status(422).json({
        status: "failed",
        name: "Unprocessable Entity",
        message: err.message || "Unprocessable Entity",
      });
    }
  },
};
