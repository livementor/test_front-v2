import { defineStore } from "pinia";
import type { Task } from "~/types/Task";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);

  const addTask = (task: Task) => {
    tasks.value.push(task);
  };

  const deleteTask = (task: Task) => {
    const index = tasks.value.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      tasks.value.splice(index, 1);
    }
  };

  const editTask = (updatedTask: Task) => {
    const index = tasks.value.findIndex((t) => t.id === updatedTask.id);

    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
  };

  return {
    tasks,
    addTask,
    deleteTask,
    editTask,
  };
});
