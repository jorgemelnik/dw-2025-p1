import Fastify from "fastify";
import { dirname, join } from "path";
import fastifyAutoload from "@fastify/autoload";
import fastifyStatic from "@fastify/static"

const fastify = Fastify({
  logger: true,
});

const port: number = parseInt(process.env.FASTIFY_PORT || "3000");
const host: string = "::";

const rootDir = join(dirname(process.argv[1]), "public");

await fastify.register(fastifyStatic,{
  root: rootDir,
  prefix:"/"
})

await fastify.register(fastifyAutoload,{
  dir: join(rootDir,"scripts", "services")
})

try {
  await fastify.listen({ host, port });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
