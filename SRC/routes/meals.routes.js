const { Router } = require("express");
const MealsController = require('../controllers/MealsController');
const ensureAuthenticated = require("../middlewares/ensureAuth.js");
const mealsRoutes = Router();




const mealsController = new MealsController();
mealsRoutes.use(ensureAuthenticated);
mealsRoutes.post("/create", mealsController.create);
mealsRoutes.delete("/:id", mealsController.delete);
mealsRoutes.get("/",mealsController.index);
mealsRoutes.get("/search/:search",mealsController.search);
mealsRoutes.get("/:id",mealsController.show);

module.exports = mealsRoutes;