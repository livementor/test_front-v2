import { defineStore } from 'pinia'
import type { Task } from '~/types/Task'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Array<Task>>([]);
  const addTask = (task:Task)=>{
    tasks.value.push(task);
  };
  const updateTask = (task:Task)=>{
    const index = tasks.value.findIndex(t=>t.id === task.id);
    if (index === -1) {
      return;
    }
    tasks.value = [...tasks.value.slice(0, index), task, ...tasks.value.slice(index + 1)];
  };
  const removeTask = (task:Task)=>{
    tasks.value = tasks.value.filter(t=>t.id !== task.id);
  }
  return {tasks, addTask, updateTask, removeTask};
})
