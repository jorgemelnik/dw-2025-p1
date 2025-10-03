import { Type } from "@fastify/type-provider-typebox";
import type { Static } from "@fastify/type-provider-typebox";

export const Persona = Type.Object({
  id_persona: Type.Integer(),
  username: Type.String({ maxLength: 15 }),
  roles: Type.Array(Type.String({ enum: ["admin", "normal"] })),
});

export type Persona = Static<typeof Persona>;
