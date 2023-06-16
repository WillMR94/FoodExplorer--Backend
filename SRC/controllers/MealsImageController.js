const DiskStorage = require("../providers/DiskStorage");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

 class MealsImageController{
  async update(request, response) {
  const diskStorage = new DiskStorage();

    const{ id } = request.params;
    const imageFilename = request.file.filename;

    const meal = await knex("Meals").where("id", id).first();

    if(!meal){
      throw new AppError("Refeição não encontrada",401)
    }

   if(meal.imgUrl) {
   await diskStorage.deleteFile(meal.imgUrl);
   }


try{
const filename = await diskStorage.saveFile(imageFilename);
meal.image = filename;
await knex("Meals").update("imgUrl",filename).where("id", id);
}catch(e){
  // console.log(e)
}
 return response.json();

  }
 }

 module.exports = MealsImageController;
