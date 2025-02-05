import type { Task } from '~/types/Task'
import type { Category } from '~/types/Category'

export const useApi = () => {
  return {
    categories: {
      getAll: () => $fetch<Category[]>('/api/categories', { method: 'GET' }),
    },
    tasks: {
      create: (payload: Omit<Task, 'id' | 'createdAt'>) =>
        $fetch<Task>('/api/tasks', { method: 'POST', body: payload }),
      update: (taskId: number, payload: Partial<Task>) =>
        $fetch<Task>(`/api/tasks/${taskId}`, { method: 'PUT', body: payload }),
      remove: (taskId: number) =>
        $fetch(`/api/tasks/${taskId}`, { method: 'DELETE' }),
      getAll: async () => {
        const tasks = await $fetch<Task[]>('/api/tasks', { method: 'GET' })
        return tasks.map(t => ({ ...t, createdAt: new Date(t.createdAt) }))
      },
    },
  }
}
