import {
  Type,
  type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { authPerson } from "../../services/personas.ts";
import type { SignOptions } from "@fastify/jwt";
import { Persona } from "../../model/persona.ts";
import { ErrorSchema } from "../../model/errors.ts";

const authRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
  fastify.post(
    "/",
    {
      schema: {
        tags: ["auth"],
        body: Type.Object(
          {
            username: Type.String(),
            password: Type.String(),
          },
          {
            examples: [
              {
                username: "admin1",
                password: "contraseña",
              },
              {
                username: "admin2",
                password: "contraseña",
              },
              {
                username: "normal3",
                password: "contraseña",
              },
              {
                username: "normal4",
                password: "contraseña",
              },
            ],
          }
        ),
        response: {
          200: Type.Object({ token: Type.String() }),
          401: ErrorSchema,
        },
      },
    },
    async function (req, rep) {
      const persona = await authPerson(req.body.username, req.body.password);
      const signOptions: SignOptions = {
        expiresIn: "8h", //Valido por 8h
        notBefore: 0, // Valido despues de 100ms
      };
      return { token: fastify.jwt.sign(persona, signOptions) };
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        tags: ["auth"],
        response: {
          200: Persona,
          401: ErrorSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.checkToken],
    },
    async function (req) {
      return req.user;
    }
  );
};

export default authRoutes;
