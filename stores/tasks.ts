import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '~/types/Task'
import { useApi } from '~/composables/useApi.composable'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const editingTask = ref<Task | null>(null)
  const isSidebarOpen = ref(false)
  const api = useApi()

  const fetchTasks = async () => {
    try {
      tasks.value = await api.tasks.getAll()
      reorderTasks()
    }
    catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask = await api.tasks.create(task)
      tasks.value.unshift(newTask)
      reorderTasks()
    }
    catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const updateTask = async (taskId: number, updates: Partial<Task>) => {
    try {
      tasks.value = tasks.value.map(task =>
        task.id === taskId ? { ...task, ...updates } : task,
      )
      await api.tasks.update(taskId, updates)
    }
    catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (taskId: number) => {
    try {
      await api.tasks.remove(taskId)
      tasks.value = tasks.value.filter(task => task.id !== taskId)
      reorderTasks()
    }
    catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const setEditingTask = (task: Task | null) => {
    editingTask.value = task
  }

  const toggleSidebar = (task: Task | null = null) => {
    editingTask.value = task
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const reorderTasks = () => {
    tasks.value.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1)
  }

  return { tasks, fetchTasks, addTask, updateTask, deleteTask, reorderTasks, editingTask, setEditingTask, isSidebarOpen, toggleSidebar }
})
