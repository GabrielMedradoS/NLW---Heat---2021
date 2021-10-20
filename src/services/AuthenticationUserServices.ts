import axios from "axios";
import { response } from "express";
/*
 * Receber o code(string)
 * Recuperar o access_token no github
 * Recuperar infos do user no github
 * Verificar se o usuario existe no DB
 * --- SIM = Gera um token
 * --- NAO = Cria no DB, gera um token
 * Retornar o token com as infos do user
 */

//para pegar somente o necessario
interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    //chamada do tipo post. Ele espera uma URL, DATA, ALGUNS PARAMETROS
    const { data: AccessTokenResponse } =
      /* <IAccessTokenResponse> passando o tipo do meu retorno */
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "aplication/json",
        },
      });

    /* <IUserResponse> passando o tipo do meu retorno */
    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${AccessTokenResponse.access_token}`,
        },
      }
    );

    //no axios toda informaçao q eu estou usando é enviada por esse data
    /* ele esta sendo enviado via destructuring  */
    return response.data;
  }
}

export { AuthenticateUserService };
