import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '~/types/Task'
import { useApi } from '~/composables/useApi.composable'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const api = useApi()

  const fetchTasks = async () => {
    try {
      tasks.value = await api.tasks.getAll()
    }
    catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask = await api.tasks.create(task)
      tasks.value.unshift(newTask)
    }
    catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const updateTask = async (taskId: number, updates: Partial<Task>) => {
    try {
      const updatedTask = await api.tasks.update(taskId, updates)
      tasks.value = tasks.value.map(task => (task.id === taskId ? updatedTask : task))
    }
    catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (taskId: number) => {
    try {
      await api.tasks.remove(taskId)
      tasks.value = tasks.value.filter(task => task.id !== taskId)
    }
    catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return { tasks, fetchTasks, addTask, updateTask, deleteTask }
})
