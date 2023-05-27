const { hash, compare } = require("bcryptjs");
const { application } = require("express");
const sqliteconnection = require("../database/sqlite/index.js");
const AppError = require("../utils/AppError.js");

class UsersController {
/**
 * index - GET para listar vários registros.
 * show - GET para exibir um registro específico.
 * creat - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para apagar um registro.
 * -- Se for necessário mais que 5 controles é melhor optar por criar outro controlador
 */


  async create(request, response) {
    const { name, pass, email } = request.body;

    const database = await sqliteconnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (checkUserExists){
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(pass, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [ name, email, hashedPassword]
    )

    return response.status(201).json();
  }

  async update(request, response){
    const {name, email, password, old_password} = request.body;
    const user_id = request.user.id;

    const database = await sqliteconnection();
    const user = await database.get("SELECT * FROM users WHERE id =(?)",[user_id]);

    if(!user){
      throw new AppError("Usuário não encontrado!")
    };

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)",[email]);

    if( userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Este e-mail já está em uso!")
    };

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if( password && !old_password){
      throw new AppError("Você precisa informar a senha antiga!")
    }

    if( password && old_password){
      const checkOldPass = await compare(old_password, user.password);

             if(!checkOldPass){
        throw new AppError("A senha antiga não confere!")
      }

      if(password === old_password){
        throw new AppError("As senhas digitadas são iguais")
      }

     user.password = await hash(password, 8)
    }

    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('NOW')
    WHERE id = ?`,
    [user.name, user.email, user.password, user_id]
    );

    return response.json("dados atualizados com sucesso");

    }
  }


module.exports = UsersController;