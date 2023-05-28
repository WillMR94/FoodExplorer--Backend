const { request } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError.js");
class mealsController{

async create(request, response){
    const {imgUrl,title, text, price, ingredients, type} = request.body

    const movieNotes = await knex("Meals").insert({
      imgUrl,
      title,
      text,
      price,
      ingredients,
      type
    });

response.json();
};

async index(request, response){
  const showAll = await knex("Meals");
  response.json(showAll)}

async show(request, response){
  const { id } = request.params;
  const showById = await knex("Meals").where("id", id).select(["imgUrl","id","title","text","price","ingredients","type"]);
  response.json(showById)}


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
  }}}


module.exports = mealsController;
