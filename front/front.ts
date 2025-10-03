import Fastify from "fastify";
import { dirname, join } from "path";

const fastify = Fastify({
  logger: true,
});

const port: number = parseInt(process.env.FASTIFY_PORT || "3000");
const host: string = "::";

const rootDir = dirname(process.argv[1]);

try {
  await fastify.listen({ host, port });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
