const express = require("express");
const controllers = require("../app/controllers");
const validations = require("../app/validations");
const middlewares = require("../app/middlewares");
const uploadOnMemory = require("../app/utils/multer");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
appRouter.get("/", controllers.main.index);
apiRouter.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/**
 * TODO: Implement your own API
 *       implementations
 */

// auth-user
apiRouter.get("/api/v1/auth/whoami",middlewares.authMiddleware.authUser, controllers.api.v1.userController.getCurrentUser);
apiRouter.get("/api/v1/auth/:id",middlewares.authMiddleware.authUser, controllers.api.v1.userController.getUserById);
apiRouter.post("/api/v1/auth/register", controllers.api.v1.userController.register);
apiRouter.post("/api/v1/auth/login", controllers.api.v1.userController.login);
apiRouter.patch("/api/v1/auth/update/:id", middlewares.authMiddleware.authUser, uploadOnMemory.single("image_user"), controllers.api.v1.userController.update);
apiRouter.patch("/api/v1/auth/change-password/:id", middlewares.authMiddleware.authUser, controllers.api.v1.userController.changePassword);

// auth-admin
apiRouter.get("/api/v1/auth/admin", 
(req, res) => {
  res.status(200).json({
    message: "please auth!!",
  });
});
apiRouter.get("/api/v1/auth/admin/whoami",middlewares.authMiddleware.authAdmin, controllers.api.v1.adminController.getCurrentAdmin);
apiRouter.get('/api/v1/auth/admin/:id', middlewares.authMiddleware.authAdmin, controllers.api.v1.adminController.getAdminById);
// apiRouter.post("/api/v1/auth/admin/register", uploadOnMemory.single("image_admin"), controllers.api.v1.adminController.register);
apiRouter.get("/api/v1/auth/admin/", controllers.api.v1.adminController.index);
apiRouter.post("/api/v1/auth/admin/register",middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_admin"), controllers.api.v1.adminController.register);
apiRouter.post("/api/v1/auth/admin/login", controllers.api.v1.adminController.login);
apiRouter.patch("/api/v1/auth/admin/update/:id", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_admin"), controllers.api.v1.adminController.update);
apiRouter.patch("/api/v1/auth/admin/change-password/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.adminController.changePassword); //error

// auth-courier
apiRouter.get("/api/v1/auth/courier/whoami", middlewares.authMiddleware.authCourier,controllers.api.v1.courierController.getCurrentCourier);
apiRouter.get("/api/v1/auth/courier/:id", middlewares.authMiddleware.authCourier,controllers.api.v1.courierController.getCourierById);
apiRouter.post("/api/v1/auth/courier/register", uploadOnMemory.single("image_courier"), controllers.api.v1.courierController.register);
apiRouter.post("/api/v1/auth/courier/login", controllers.api.v1.courierController.login);
apiRouter.patch("/api/v1/auth/courier/update/:id", uploadOnMemory.single("image_courier"), controllers.api.v1.courierController.update);
apiRouter.patch("/api/v1/auth/courier/change-password/:id", controllers.api.v1.courierController.changePassword);

// manage courier untuk admin
apiRouter.get("/api/v1/admin/courier", middlewares.authMiddleware.authAdmin, controllers.api.v1.courierController.getAllCourier);
apiRouter.post("/api/v1/admin/courier/register", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_courier"), controllers.api.v1.courierController.register);
apiRouter.patch("/api/v1/admin/courier/update/:id", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_courier"), controllers.api.v1.courierController.update);
apiRouter.get("/api/v1/admin/admin/",middlewares.authMiddleware.authAdmin, controllers.api.v1.adminController.getAllAdmin);
apiRouter.post("/api/v1/admin/admin/register",middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_admin"), controllers.api.v1.adminController.register);
apiRouter.put("/api/v1/admin/admin/update/:id", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_admin"), controllers.api.v1.adminController.update);
apiRouter.get("/api/v1/admin/user/",middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_admin"), controllers.api.v1.userController.getAllUser);
apiRouter.post("/api/v1/admin/user/register",middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_admin"), controllers.api.v1.userController.register);
apiRouter.put("/api/v1/admin/user/update/:id", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_user"), controllers.api.v1.userController.update);

// news
apiRouter.get("/api/v1/news", middlewares.authMiddleware.authUser, controllers.api.v1.newsController.findAllNews);
apiRouter.get("/api/v1/news/:id", middlewares.authMiddleware.authUser, controllers.api.v1.newsController.findNewsById);
//news-admin
apiRouter.get("/api/v1/admin/news", middlewares.authMiddleware.authAdmin, controllers.api.v1.newsController.findAllNews);
apiRouter.get("/api/v1/admin/news/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.newsController.findNewsById);
apiRouter.post("/api/v1/admin/news", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_news"), validations.bodyValidation.createNewsValidate, validations.checkValidate, controllers.api.v1.newsController.createNews);
apiRouter.put("/api/v1/admin/news/:id", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_news"), controllers.api.v1.newsController.updateNews);
apiRouter.delete("/api/v1/admin/news/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.newsController.deleteNews);

// category waste
apiRouter.get("/api/v1/categoryWaste", middlewares.authMiddleware.authUser, controllers.api.v1.categoryWasteController.findAllCategoryWaste);
apiRouter.get("/api/v1/categoryWaste/:id", middlewares.authMiddleware.authUser, controllers.api.v1.categoryWasteController.findCategoryWasteById);
//category waste admin
apiRouter.get("/api/v1/admin/categoryWaste", middlewares.authMiddleware.authAdmin, controllers.api.v1.categoryWasteController.findAllCategoryWaste);
apiRouter.get("/api/v1/admin/categoryWaste/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.categoryWasteController.findCategoryWasteById);
apiRouter.post("/api/v1/admin/categoryWaste", middlewares.authMiddleware.authAdmin, validations.bodyValidation.createCategoryWasteValidate, validations.checkValidate, controllers.api.v1.categoryWasteController.createCategoryWaste);
apiRouter.put("/api/v1/admin/categoryWaste/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.categoryWasteController.updateCategoryWaste); //error
apiRouter.delete("/api/v1/admin/categoryWaste/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.categoryWasteController.deleteCategoryWaste);

// waste
apiRouter.get("/api/v1/waste", middlewares.authMiddleware.authUser, controllers.api.v1.wasteController.findAllWaste);
apiRouter.get("/api/v1/waste/:id", middlewares.authMiddleware.authUser, controllers.api.v1.wasteController.findWasteById);
//waste admin
apiRouter.get("/api/v1/admin/waste", middlewares.authMiddleware.authAdmin, controllers.api.v1.wasteController.findAllWaste);
apiRouter.get("/api/v1/admin/waste/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.wasteController.findWasteById);
apiRouter.post("/api/v1/admin/waste", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_waste"), validations.bodyValidation.createWasteValidate, validations.checkValidate, controllers.api.v1.wasteController.createWaste);
apiRouter.put("/api/v1/admin/waste/:id", middlewares.authMiddleware.authAdmin, uploadOnMemory.single("image_waste"), controllers.api.v1.wasteController.updateWaste);
apiRouter.delete("/api/v1/admin/waste/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.wasteController.deleteWaste);

// pickup
apiRouter.get("/api/v1/pickup", middlewares.authMiddleware.authCourier, controllers.api.v1.pickupController.findAllPickup);
apiRouter.get("/api/v1/pickup/:id", middlewares.authMiddleware.authUser, controllers.api.v1.pickupController.findPickupById);
apiRouter.get("/api/v1/pickup/courier/:id", controllers.api.v1.pickupController.findPickupByCourierId);
// pickup admin
apiRouter.get("/api/v1/admin/pickup", middlewares.authMiddleware.authAdmin, controllers.api.v1.pickupController.findAllPickup);
apiRouter.post("/api/v1/pickup", middlewares.authMiddleware.authAdmin, validations.bodyValidation.createPickupValidate, validations.checkValidate,controllers.api.v1.pickupController.createPickup);
apiRouter.put("/api/v1/pickup/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.pickupController.updatePickup);
apiRouter.delete("/api/v1/pickup/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.pickupController.deletePickup);

// cart
apiRouter.get("/api/v1/user/cart/:id", middlewares.authMiddleware.authUser, controllers.api.v1.cartController.findCartById);
apiRouter.post("/api/v1/user/cart", middlewares.authMiddleware.authUser, validations.bodyValidation.createCartValidate, validations.checkValidate, controllers.api.v1.cartController.createCart);
apiRouter.put("/api/v1/user/cart/:id", middlewares.authMiddleware.authUser, controllers.api.v1.cartController.updateCart);
apiRouter.delete("/api/v1/user/cart/:id", middlewares.authMiddleware.authUser, controllers.api.v1.cartController.deleteCart);
apiRouter.get("/api/v1/cart/user/:id", middlewares.authMiddleware.authUser, controllers.api.v1.cartController.findCartByUserId);
apiRouter.get("/api/v1/cart/user/:id/pending", middlewares.authMiddleware.authUser, controllers.api.v1.cartController.findCartPendingByUserId);
apiRouter.get("/api/v1/cart/user/:id/:status", middlewares.authMiddleware.authUser,controllers.api.v1.cartController.findCartStatusByUserId);

// cart-admin
apiRouter.get("/api/v1/admin/cart", middlewares.authMiddleware.authAdmin, controllers.api.v1.cartController.findAllCart);
apiRouter.post("/api/v1/admin/cart", middlewares.authMiddleware.authAdmin, validations.bodyValidation.createCartValidate, validations.checkValidate, controllers.api.v1.cartController.createCart);
apiRouter.get("/api/v1/admin/cart/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.cartController.findCartById);
apiRouter.put("/api/v1/admin/cart/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.cartController.updateCart);
apiRouter.delete("/api/v1/admin/cart/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.cartController.deleteCart);

// dropbox
apiRouter.get("/api/v1/admin/dropbox", middlewares.authMiddleware.authAdmin, controllers.api.v1.dropboxController.findAllDropbox)
apiRouter.post("/api/v1/admin/dropbox", middlewares.authMiddleware.authAdmin, controllers.api.v1.dropboxController.createDropbox);
apiRouter.put("/api/v1/admin/dropbox/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.dropboxController.updateDropbox);
apiRouter.delete("/api/v1/admin/dropbox/:id", middlewares.authMiddleware.authAdmin, controllers.api.v1.dropboxController.deleteDropbox);

// transaction
apiRouter.post("/api/v1/transaction", middlewares.authMiddleware.authUser, validations.bodyValidation.createTransactionValidate, validations.checkValidate, controllers.api.v1.transactionController.createTransaction);
apiRouter.put("/api/v1/transaction/:id", middlewares.authMiddleware.authUser, controllers.api.v1.transactionController.updateTransaction);
apiRouter.delete("/api/v1/transaction/:id", middlewares.authMiddleware.authUser, controllers.api.v1.transactionController.deleteTransaction);
apiRouter.get("/api/v1/transaction/cart/:id", middlewares.authMiddleware.authUser, controllers.api.v1.transactionController.findTransactionByCartId);
apiRouter.get("/api/v1/transaction/:id", middlewares.authMiddleware.authUser, controllers.api.v1.transactionController.findTransactionById);

// transaction-admin
apiRouter.get("/api/v1/admin/transaction", middlewares.authMiddleware.authAdmin, controllers.api.v1.transactionController.findAllTransaction);
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
