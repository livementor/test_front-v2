import { defineStore } from 'pinia'
import type { Task } from '~/types/Task'

export const useTasksStore = defineStore('tasks', () => {
  {
    const { task: taskRequests } = useApi()

    const tasksRef = ref<Array<Task>>([])

    const tasks = computed(() => tasksRef.value)
    const completedTasks = computed(() => tasksRef.value.filter(task => task.completed))
    const pendingTasks = computed(() => tasksRef.value.filter(task => !task.completed))

    const hydrate = () => {
      return taskRequests.getAll().then((tasks) => {
        tasksRef.value = tasks
      })
    }

    const getAll = () => {
      return tasksRef.value
    }

    const addTask = (taskInput: Partial<Task>) => {
      return taskRequests.post(taskInput).then((task) => {
        tasks.value.splice(0, 0, task)
      })
    }

    const updateTask = (taskInput: Partial<Task>) => {
      return taskRequests.put(taskInput).then((task) => {
        const taskIndex = tasks.value.findIndex(otherTask => task.id === otherTask.id)

        if (taskIndex !== -1) {
          tasks.value.splice(taskIndex, 1, task)
        }
      })
    }

    const removeTask = (id: number) => {
      return taskRequests.delete(id).then((taskId) => {
        const taskIndex = tasks.value.findIndex(otherTask => taskId === otherTask.id)

        if (taskIndex !== -1) {
          tasks.value.splice(taskIndex, 1)
        }
      })
    }

    return {
      completedTasks,
      pendingTasks,
      hydrate,
      getAll,
      addTask,
      updateTask,
      removeTask,
    }
  }
})
