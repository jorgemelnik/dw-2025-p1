import { UcuNoEncontrado } from "../model/errors.ts";
import type { Tarea } from "../model/tarea.ts";

const tareas: Tarea[] = [
  {
    id_persona: 3,
    id_tarea: 1,
    titulo: "Pasear perro",
  },
  {
    id_persona: 3,
    id_tarea: 2,
    titulo: "Cocinar",
  },
  {
    id_persona: 4,
    id_tarea: 3,
    titulo: "Ir al gim",
  },
  {
    id_persona: 4,
    id_tarea: 4,
    titulo: "Bañarse",
  },
];

let ultimoId = 4;

export async function getAllTasks(id_persona: number): Promise<Tarea[]> {
  return tareas.filter((t) => t.id_persona === id_persona);
}

export async function createTask(
  id_persona: number,
  titulo: string
): Promise<Tarea> {
  const tarea = {
    id_persona,
    titulo,
    id_tarea: ultimoId++,
  };
  tareas.push(tarea);
  return tarea;
}

export async function deleteTask(
  id_persona: number,
  id_tarea: number
): Promise<void> {
  const indice = tareas.findIndex(
    (t) => t.id_persona === id_persona && t.id_tarea === id_tarea
  );
  if (indice < 0) throw new UcuNoEncontrado("");
  tareas.splice(indice, 1);
}
