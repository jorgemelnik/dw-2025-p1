import {
  Type,
  type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import * as tareaService from "../../../../services/tareas.ts";
import { Tarea } from "../../../../model/tarea.ts";

const personasRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["tareas"],
        params: Type.Pick(Tarea, ["id_persona"]),
        response: {
          200: Type.Array(Tarea),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.checkToken],
    },
    async function (request, reply) {
      return tareaService.getAllTasks(request.params.id_persona);
    }
  );

  fastify.post(
    "/",
    {
      schema: {
        tags: ["tareas"],
        params: Type.Pick(Tarea, ["id_persona"]),
        body: Type.Omit(Tarea, ["id_tarea"]),
        response: {
          201: Tarea,
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.checkToken],
      preHandler: [fastify.checkEsMio],
    },
    async function (request, reply) {
      reply.code(201);
      return tareaService.createTask(
        request.params.id_persona,
        request.body.titulo
      );
    }
  );

  fastify.delete(
    "/:id_tarea",
    {
      schema: {
        tags: ["tareas"],
        params: Type.Pick(Tarea, ["id_persona", "id_tarea"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
        onRequest: [fastify.checkToken],
        preHandler: [fastify.checkEsMio],
      },
    },
    async function (request, reply) {
      reply.code(204);
      return tareaService.deleteTask(
        request.params.id_persona,
        request.params.id_tarea
      );
    }
  );
};

export default personasRoutes;
