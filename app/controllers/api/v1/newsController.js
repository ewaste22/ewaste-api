const { News } = require("../../../models");
const cloudinary = require("../../../utils/cloudinary");

module.exports = {
  async findAllNews(req, res) {
    try {
      const news = await News.findAll();
      res.status(200).json({
        status: "success",
        message: "News found successfully",
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
  async findNewsById(req, res) {
    try {
      const news = await News.findByPk(req.params.id);
      if (!news) {
        res.status(404).json({
          status: "failed",
          name: "Not Found",
          message: "News not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "News found successfully",
          data: {
            news,
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
  async createNews(req, res) {
    try {
      const fileBase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;

      const image_news = await cloudinary.uploader.upload(file, { folder: "news" }, function (error, result) {
        if (error) {
          return error;
        } else {
          console.log("success upload", result);
        }
      });

      const news = await News.create({
        ...req.body,
        image_news: image_news.url,
      });
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
        if (req.file) {
          const public_id = news.image_news.replace(/(.*)([\/](\w+))(\.(jpg|png|jpeg|webp))/gm, "$3");

          await cloudinary.uploader.destroy(`news/${public_id}`);

          const fileBase64 = req.file.buffer.toString("base64");
          const file = `data:${req.file.mimetype};base64,${fileBase64}`;
          cloudinary.uploader.upload(file, { folder: "news" }, async function (error, result) {
            if (error) {
              return error;
            } else {
              await News.update(
                {
                  image_news: result.url,
                  ...req.body,
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
                  ...req.body,
                  image_news: result.url,
                },
              });
            }
          });
        } else {
          await News.update(
            {
              ...req.body,
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
        const public_id = news.image_news.replace(/(.*)([\/](\w+))(\.(jpg|png|jpeg|webp))/gm, "$3");

        await cloudinary.uploader.destroy(`news/${public_id}`);

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
