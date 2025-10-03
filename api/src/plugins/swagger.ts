import swagger from "@fastify/swagger";
import type { FastifySwaggerOptions } from "@fastify/swagger";
import swaggerui from "@fastify/swagger-ui";
import fp from "fastify-plugin";

//En vez de exportar la función la encapsulamos con fastify plugin.
export default fp<FastifySwaggerOptions>(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      servers: [
        {
          url: `http://localhost:${process.env.FASTIFY_PORT || "3000"}`,
          description: "Development server",
        },
      ],
      tags: [
        { name: "root", description: "Root endpoints." },
        { name: "personas", description: "Endpoints para recurso personas" },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
    },
  });

  await fastify.register(swaggerui, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: true,
    transformSpecificationClone: true,
  });
});
