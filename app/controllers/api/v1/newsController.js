const { News } = require("../../../models");

module.exports = {
  async findAllNews(req, res) {
    try {
      const news = await News.findAll();
      res.status(200).json({
        status: "success",
        result: news.length,
        data: {
          news,
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

  async createNews(req, res) {
    try {
      const news = await News.create(req.body);
      res.status(201).json({
        status: "success",
        message: "News created successfully",
        data: {
          news,
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

  async updateNews(req, res) {
    try {
      const news = await News.findByPk(req.params.id);
      if (!news) {
        res.status(404).json({
          status: "failed",
          name: "Not Found",
          message: "News not found",
        });
      } else {
        const { title_news, image_news, body_news, admin_id } = req.body;
        await News.update(
          {
            title_news,
            image_news,
            body_news,
            admin_id,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        res.status(200).json({
          status: "success",
          message: "News updated successfully",
          data: {
            title_news,
            image_news,
            body_news,
            admin_id,
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

  async deleteNews(req, res) {
    try {
      const news = await News.findByPk(req.params.id);
      if (!news) {
        res.status(404).json({
          status: "failed",
          name: "Not Found",
          message: "News not found",
        });
      } else {
        await News.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({
          status: "success",
          message: "News deleted successfully",
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
