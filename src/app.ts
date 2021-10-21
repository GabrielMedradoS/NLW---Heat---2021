import "dotenv/config"; // para usar o process.env eu preciso importar o dotenv
import express from "express";
import { router } from "./router";
import cors from "cors";

//http vai subir o servidor para poder usar o websocket
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const servetHttp = http.createServer(app);
const io = new Server(servetHttp, {
  cors: {
    origin: "*", //qualquer origin
  },
}); // assim tem acesso a io do cliente
//consigo tanto emitir um evento quanto ficar escutando algum evento no websocket
io.on("connection", (socket) => {
  console.log(`Usuario conectado no socket ${socket.id}`);
});

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

export { servetHttp, io };
