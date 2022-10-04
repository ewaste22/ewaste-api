const express = require("express");
const controllers = require("../app/controllers");
const validations = require("../app/validations");
const middlewares = require("../app/middlewares");
const uploadOnMemory = require("../app/utils/multer");

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
appRouter.get("/", controllers.main.index);

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.get("/api/v1/posts", controllers.api.v1.post.list);
apiRouter.post("/api/v1/posts", controllers.api.v1.post.create);
apiRouter.put("/api/v1/posts/:id", controllers.api.v1.post.setPost, controllers.api.v1.post.update);
apiRouter.get("/api/v1/posts/:id", controllers.api.v1.post.setPost, controllers.api.v1.post.show);
apiRouter.delete("/api/v1/posts/:id", controllers.api.v1.post.setPost, controllers.api.v1.post.destroy);

// auth-user
apiRouter.get("/api/v1/auth/", controllers.api.v1.userController.index);
apiRouter.post("/api/v1/auth/register", controllers.api.v1.userController.register);
apiRouter.post("/api/v1/auth/login", controllers.api.v1.userController.login);
apiRouter.patch("/api/v1/auth/update/:id", uploadOnMemory.single("image_user"), controllers.api.v1.userController.update);
apiRouter.patch("/api/v1/auth/change-password/:id", controllers.api.v1.userController.changePassword);

// auth-admin
apiRouter.get("/api/v1/auth/admin/", controllers.api.v1.adminController.index);
apiRouter.post("/api/v1/auth/admin/register", uploadOnMemory.single("image_admin"), controllers.api.v1.adminController.register);
apiRouter.post("/api/v1/auth/admin/login", controllers.api.v1.adminController.login);
apiRouter.patch("/api/v1/auth/admin/update/:id", uploadOnMemory.single("image_admin"), controllers.api.v1.adminController.update);
apiRouter.patch("/api/v1/auth/admin/change-password/:id", controllers.api.v1.adminController.changePassword);

// auth-courier
apiRouter.get("/api/v1/auth/courier", controllers.api.v1.courierController.index);
apiRouter.post("/api/v1/auth/courier/register", uploadOnMemory.single("image_courier"), controllers.api.v1.courierController.register);
apiRouter.post("/api/v1/auth/courier/login", controllers.api.v1.courierController.login);
apiRouter.patch("/api/v1/auth/courier/update/:id", uploadOnMemory.single("image_courier"), controllers.api.v1.courierController.update);
apiRouter.patch("/api/v1/auth/courier/change-password/:id", controllers.api.v1.courierController.changePassword);

// news
apiRouter.get("/api/v1/news", middlewares.authMiddleware.authUser, controllers.api.v1.newsController.findAllNews);
apiRouter.get("/api/v1/news/:id", middlewares.authMiddleware.authUser, controllers.api.v1.newsController.findNewsById);
apiRouter.post("/api/v1/news", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_news"), validations.bodyValidation.createNewsValidate, validations.checkValidate, controllers.api.v1.newsController.createNews);
apiRouter.put("/api/v1/news/:id", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_news"), controllers.api.v1.newsController.updateNews);
apiRouter.delete("/api/v1/news/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.newsController.deleteNews);

// category waste
apiRouter.get("/api/v1/categoryWaste", controllers.api.v1.categoryWasteController.findAllCategoryWaste);
apiRouter.get("/api/v1/categoryWaste/:id", controllers.api.v1.categoryWasteController.findCategoryWasteById);
apiRouter.post("/api/v1/categoryWaste", validations.bodyValidation.createCategoryWasteValidate, validations.checkValidate, controllers.api.v1.categoryWasteController.createCategoryWaste);
apiRouter.put("/api/v1/categoryWaste/:id", controllers.api.v1.categoryWasteController.updateCategoryWaste);
apiRouter.delete("/api/v1/categoryWaste/:id", controllers.api.v1.categoryWasteController.deleteCategoryWaste);

// waste
apiRouter.get("/api/v1/waste", controllers.api.v1.wasteController.findAllWaste);
apiRouter.get("/api/v1/waste/:id", controllers.api.v1.wasteController.findWasteById);
apiRouter.post("/api/v1/waste", validations.bodyValidation.createWasteValidate, validations.checkValidate, controllers.api.v1.wasteController.createWaste);
apiRouter.put("/api/v1/waste/:id", controllers.api.v1.wasteController.updateWaste);
apiRouter.delete("/api/v1/waste/:id", controllers.api.v1.wasteController.deleteWaste);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error("The Industrial Revolution and its consequences have been a disaster for the human race.");
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
appRouter.get("/errors", () => {
  throw new Error("The Industrial Revolution and its consequences have been a disaster for the human race.");
});

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;
