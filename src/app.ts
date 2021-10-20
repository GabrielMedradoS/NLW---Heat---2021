import "dotenv/config"; // para usar o process.env eu preciso importar o dotenv
import express from "express";
import { router } from "./router";

const app = express();
app.use(express.json());

app.use(router);

// "/" qur dizer a home da page
app.get("/", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

app.listen(4000, () => console.log(`SERVER RODANDO`));
