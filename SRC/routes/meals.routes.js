const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);
const MealsController = require('../controllers/MealsController');
const MealsImageController = require("../controllers/mealsImageController");
const ensureAuthenticated = require("../middlewares/ensureAuth.js");

const mealsRoutes = Router();

const mealsController = new MealsController();
const mealsImageController = new MealsImageController();
mealsRoutes.use(ensureAuthenticated);
mealsRoutes.post("/create", mealsController.create);
mealsRoutes.delete("/:id", mealsController.delete);
mealsRoutes.get("/",mealsController.index);
mealsRoutes.get("/search/:search",mealsController.search);
mealsRoutes.get("/:id",mealsController.show);
mealsRoutes.patch("/image/:id", ensureAuthenticated, upload.single("image"), mealsImageController.update);


module.exports = mealsRoutes;