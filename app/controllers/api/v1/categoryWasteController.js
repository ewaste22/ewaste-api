const { Category_waste } = require("../../../models");

module.exports = {
  async findAllCategoryWaste(req, res) {
    try {
      const categoryWaste = await Category_waste.findAll();
      res.status(200).json({
        status: "success",
        message: "Category waste found successfully",
        result: categoryWaste.length,
        data: {
          categoryWaste,
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
  async findCategoryWasteById(req, res) {
    try {
      const categoryWaste = await Category_waste.findByPk(req.params.id);
      if (!categoryWaste) {
        res.status(404).json({
          status: "failed",
          name: "Not Found",
          message: "Category waste not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Category waste found successfully",
          data: {
            categoryWaste,
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
  async createCategoryWaste(req, res) {
    try {
      const categoryWaste = await Category_waste.create(req.body);
      res.status(201).json({
        status: "success",
        message: "Category Waste created successfully",
        data: {
          categoryWaste,
        },
      });
    } catch (err) {
      err.name === "SequelizeValidationError"
        ? res.status(400).json({
            status: "failed",
            name: "Bad Request",
            message: err.message,
          })
        : res.status(422).json({
            status: "failed",
            name: "Unprocessable Entity",
            message: err.message || "Unprocessable Entity",
          });
    }
  },
  async updateCategoryWaste(req, res) {
    try {
      const categoryWaste = await Category_waste.findByPk(req.params.id);
      if (!categoryWaste) {
        res.status(404).json({
          status: "failed",
          name: "Not Found",
          message: "Category Waste not found",
        });
      } else {
        const { name_category, typeOf_weight } = req.body;
        await Category_waste.update(
          {
            name_category,
            typeOf_weight,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        res.status(200).json({
          status: "success",
          message: "Category Waste updated successfully",
          data: {
            name_category,
            typeOf_weight,
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
  async deleteCategoryWaste(req, res) {
    try {
      const categoryWaste = await Category_waste.findByPk(req.params.id);
      if (!categoryWaste) {
        res.status(404).json({
          status: "failed",
          name: "Not Found",
          message: "Category Waste not found",
        });
      } else {
        await Category_waste.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({
          status: "success",
          message: "Category Waste deleted successfully",
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
