import fastifyAutoload from "@fastify/autoload";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Fastify, { type FastifyInstance } from "fastify";
import { dirname, join } from "node:path";

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

const port: number = parseInt(process.env.FASTIFY_PORT || "3000");
const host: string = "::";
const rootDir = dirname(process.argv[1]);

await fastify.register(fastifyAutoload, {
  dir: join(rootDir, "plugins"),
});

await fastify.register(fastifyAutoload, {
  dir: join(rootDir, "routes"),
  dirNameRoutePrefix: true,
  routeParams: true,
});

try {
  await fastify.listen({ host, port });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
