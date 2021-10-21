import axios from "axios";
import prismaClient from "../prisma/index";
import { sign } from "jsonwebtoken"; //para criar o token

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
    //pegando o axios token do github
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
        //pegando infos do usario do github
        headers: {
          authorization: `Bearer ${AccessTokenResponse.access_token}`,
        },
      }
    );
    //pegando infos do usario do github e tendo acesso aqui
    const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });
    //se o usuario nao existir
    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }
    // dois parametros. infos do user e o secret
    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d", //token expira em 1 dia
      }
    );

    //no axios toda informaçao q eu estou usando é enviada por esse data
    /* ele esta sendo enviado via destructuring  */
    return { token, user };
  }
}

export { AuthenticateUserService };
