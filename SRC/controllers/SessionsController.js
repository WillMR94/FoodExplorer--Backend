const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")


class SessionsController {
  async create(request,response){
    const {email, pass} = request.body;

    const user = await knex("users").where({ email }).first();

    if(!user){
      throw new AppError("E-mail e/ou senha incorretos",401)
    }

    const passwordMatched = await compare(pass, user.password);

    if(!passwordMatched){
      throw new AppError("E-mail e/ou senha incorretos",401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),expiresIn,      
    })
    const access = user.access
    
      return response.json({user, token, access});
  }
}

module.exports = SessionsController;
