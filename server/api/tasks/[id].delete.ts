import type { Task } from "~/types/Task";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const tasks: Task[] = (await useStorage().getItem("tasks")) || [];

  if (!tasks.length) {
    return null;
  }

  const task = tasks.find((task) => task.id === Number(id));

  if (task) {
    tasks.splice(tasks.indexOf(task), 1);
    await useStorage().setItem("tasks", tasks);
  }

  return task?.id;
});
