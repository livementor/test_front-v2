import { defineStore } from "pinia";
import type { Task } from "~/types/Task";

interface TasksState {
  tasks: Task[];
  categoryFilter: number;
}

export const useTasksStore = defineStore("tasks", {
  state: (): TasksState => ({
    tasks: [],
    categoryFilter: -1,
  }),
  getters: {
    tasksList(state: TasksState) {
      return state.tasks;
    },
    filteredTasksList(state: TasksState): Task[] {
      if (state.categoryFilter === -1) {
        return state.tasks;
      }
      return state.tasks.filter((t) =>
        t.categories.includes(state.categoryFilter)
      );
    },
  },
  actions: {
    updateFilter(filter: number) {
      this.categoryFilter = filter;
    },
    async fetchTasks() {
      const {
        task: { getAll },
      } = useApi();
      const tasks = await getAll();
      this.tasks = tasks;
      //todo catch errors
    },
    async createTask(newTask: Partial<Task>) {
      const {
        task: { post },
      } = useApi();
      const createdTask = await post(newTask);
      this.tasks.unshift(createdTask);
      //todo catch errors
    },
    async deleteTask(taskId: number) {
      const {
        task: { delete: deleteTask },
      } = useApi();
      const deletedTaskId = await deleteTask(taskId);
      this.tasks = this.tasks.filter((t) => t.id !== deletedTaskId);
      //todo catch errors
    },
    async updateTask(taskId: number, updatedContent: Partial<Task>) {
      const {
        task: { put },
      } = useApi();
      const taskIndex = this.tasks.findIndex((t) => t.id === taskId);
      const oldTask = this.tasks[taskIndex];
      const updatedTask = await put({
        ...oldTask,
        ...updatedContent,
      });
      this.tasks[taskIndex] = updatedTask;
      //todo catch errors
    },
  },
});
