import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticationUserServices";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code } = request.body;

    const service = new AuthenticateUserService();

    //service.execute()
    const result = await service.execute(code);

    return response.json(result);
  }
}

export { AuthenticateUserController };
