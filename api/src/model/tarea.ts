import { Type } from "@fastify/type-provider-typebox";
import type { Static } from "@fastify/type-provider-typebox";

export const Tarea = Type.Object({
  id_persona: Type.Integer(),
  id_tarea: Type.Integer(),
  titulo: Type.String({ maxLength: 20 }),
});

export type Tarea = Static<typeof Tarea>;
