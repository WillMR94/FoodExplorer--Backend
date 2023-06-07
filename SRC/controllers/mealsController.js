const { request } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError.js");
class mealsController{

async create(request, response){
    const {imgUrl,title, text, price, ingredients, type} = request.body

    const meal = await knex("Meals").insert({
      imgUrl,
      title,
      text,
      price,
      ingredients,
      type
    });
    const id = meal[0]
      response.json({id});
};

async update(request, response) {
  const{ id } = request.params;
  const { title, text, price, type, ingredients } = request.body
  const meal = await knex("Meals").where("id", id).first();
  if(!meal){
    throw new AppError("Refeição não encontrada",401)
  }else{
    try{
  await knex("Meals").update("title",title).where("id", id);
  await knex("Meals").update("text",text).where("id", id);
  await knex("Meals").update("price",price).where("id", id);
  await knex("Meals").update("type",type).where("id", id);
  await knex("Meals").update("ingredients",ingredients).where("id", id);
  }catch(e){
alert(e)
  }
}
response.json();
}

async index(request, response){
  const showAll = await knex("Meals");
  response.json(showAll)}

async show(request, response){
  const { id } = request.params;
  const showById = await knex("Meals").where("id", id).select(["imgUrl","id","title","text","price","ingredients","type"]);
  return response.json({showById,id})
}

async delete(request, response){
  const { id } = request.params
  const idDelete = await knex ("Meals").where({id}).delete()
  response.json();};

async search(request, response){
  const {search} = request.params;
  let showIndexTitle;
  let showIndexIngredients;

  showIndexTitle = await knex("Meals").whereLike("title", `%${search}%`).select(["id","title","text","price","ingredients","type"]);
  showIndexIngredients = await knex("Meals").whereLike("ingredients", `%${search}%`).select(["id","title","text","price","ingredients","type"])

  if(showIndexTitle.length <= 0 && showIndexIngredients.length <= 0 ){
    response.json('Nada encontrado')
  }
  else{
    if(showIndexTitle.length <= 0){
      response.json(showIndexIngredients)}
      else
        if(showIndexIngredients.length <= 0){
          response.json(showIndexTitle)}
  }
}
};


module.exports = mealsController;
