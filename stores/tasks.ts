import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '~/types/Task'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const api = useApi()

  const fetchTasks = async () => {
    tasks.value = await api.task.getAll()
  }

  const addTask = async (taskData: Partial<Task>) => {
    const newTask = await api.task.post(taskData)
    tasks.value.push(newTask)
  }

  const updateTask = async (task: Task) => {
    const updatedTask = await api.task.put(task)
    const index = tasks.value.findIndex(t => t.id === task.id)
    if (index !== -1) {
      tasks.value[index] = updatedTask
    }
  }

  const deleteTask = async (taskId: number) => {
    await api.task.delete(taskId)
    tasks.value = tasks.value.filter(task => task.id !== taskId)
  }

  const toggleTaskComplete = async (task: Task) => {
    const updatedTask = await api.task.put({ ...task, completed: !task.completed })
    const index = tasks.value.findIndex(t => t.id === task.id)
    if (index !== -1) {
      tasks.value[index] = updatedTask
    }
  }

  return {
    tasks,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete
  }
})
