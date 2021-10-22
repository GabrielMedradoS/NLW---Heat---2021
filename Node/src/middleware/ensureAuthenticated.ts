import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
/* fazendo a autenticaçao, se meu usuario nao estiver autenticado/ token invalido
eu quero que minha aplicaçao retorne um erro, mas se estiver autenticado eu quero passar a frente
por isso o uso do next  */

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  // bearer, a65s46a5s465s4as65a4s5646s54 => meu Bearer e token
  /*  [0] Bearer
        [1]  a65s46a5s465s4as65a4s5646s54 */

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ errorCode: "token.expired" });
  }
}
