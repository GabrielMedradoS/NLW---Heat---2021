import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

//Já instaciei o controller e chamei o metodo handle
/* este metodo recebe o req, res mas como estou usando ele dentro da minha rota ele vai 
funcionar como um MIDDLEWARE, por isso nao preciso passar req, res porq o express consegue fazer automatico*/
router.post("/Authenticate", new AuthenticateUserController().handle);

router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

//nao precisa de autenticaçao
router.get("/messages/last3", new GetLast3MessagesController().handle);

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };
