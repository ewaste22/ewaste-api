const { Waste } = require("../../../models");

module.exports = {
  async findAllWaste(req, res) {
    try {
      const wastes = await Waste.findAll();
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
      const { name_waste, description_waste, category_id, image_waste, poin_waste, weight_waste } = req.body;
      const waste = await Waste.create({
        name_waste,
        description_waste,
        category_id,
        image_waste,
        poin_waste,
        weight_waste,
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
      const { name_waste, description_waste, category_id, image_waste, poin_waste, weight_waste } = req.body;

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
        await Waste.update(
          {
            name_waste,
            description_waste,
            category_id,
            image_waste,
            poin_waste,
            weight_waste,
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
            name_waste,
            description_waste,
            category_id,
            image_waste,
            poin_waste,
            weight_waste,
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
