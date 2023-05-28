const { Router } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/usersController.js");
const MealsImageController = require("../controllers/mealsImageController");
const ensureAuthenticated = require("../middlewares/ensureAuth.js");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const mealsImageController = new MealsImageController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/image/:id", ensureAuthenticated, upload.single("image"), mealsImageController.update);

module.exports = usersRoutes;