import {
  Type,
  type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import type { FastifyReply, FastifyRequest } from "fastify";

const rutaRaiz = "/";

const RootResponseSchema = Type.Object({
  root: Type.Boolean(),
});

const PingSchema = Type.Object({
  ping: Type.Boolean(),
});

const rootRoute = async function () {
  return { root: true };
};

const pingRoute = async function (request: FastifyRequest) {
  return request.body;
};

const rootRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
  fastify.get(
    rutaRaiz,
    {
      schema: {
        tags: ["root"],
        response: {
          200: RootResponseSchema,
        },
      },
    },
    rootRoute
  );

  fastify.post(
    rutaRaiz,
    {
      schema: {
        tags: ["root"],
        body: PingSchema,
        response: {
          200: PingSchema,
        },
      },
    },
    pingRoute
  );
};

export default rootRoutes;
