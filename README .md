
# [Food Explorer - Cardápio Digital ]

Link: https://foodexplorer-rocketseat.netlify.app/ 

Credenciais de acesso:

Para administrador: admin@admin.com / admin123

Para usuário: user@user.com / user123

Ou sinta-se a vontade para criar um novo usuário






## Instalação


```bash
  npm install 
```



    
## Demonstração

https://youtu.be/-YQZoYgY7Qg 
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/WillMR94/FoodExplorer--Frontend
  git clone https://github.com/WillMR94/FoodExplorer--Backend

```

Entre no diretório do projeto


Instale as dependências

```bash
  npm install
```


```bash
  altere em "/src/services/api.js"
  
  export const api = axios.create({ baseURL:"https://foodexplorer-api-mi7k.onrender.com" };

  para:

  export const api = axios.create({ baseURL:"http://localhost:3333" };
```

```bash
  Inicie o servidor com:
  npm run start
```

