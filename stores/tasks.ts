import { defineStore } from 'pinia'
import type { Task } from '~/types/Task'
import type { Category } from '~/types/Category'

export const useTasksStore = defineStore('tasks', {
  state: (): { tasks: Task[], categories: Category[] } => ({ tasks: [], categories: [] }),
  actions: {
    // Initier le store coté client
    async init() {
      this.tasks = await useApi().task.getAll()
      this.categories = await useApi().categories.get()
    },

    /** Gestion d'une Task **/
    // updateStatus() : permet de rapidement mettre à jour le status 'complété' uniquement
    async updateStatus(taskId: number, completed: boolean) {
      await useApi().task.put({ id: taskId, completed })
        .then(task => task.completed == completed)
        .catch((err) => { return err }) // gestion des erreurs à peaufiner
    },
    async updateTask(taskId: number) {
      return await useApi().task.put(this.tasks.find(task => task.id === taskId))
        .catch((err) => { return err }) // gestion des erreurs à peaufiner
    },
    async addTask(task: Partial<Task>) { /** Partial, car sans ID : l'id est géré coté backend et retourné à la création d'une tâche **/
      return await useApi().task.post(task)
        .then((task) => {
          this.tasks.unshift(task)
          return task
        })
        .catch((err) => { return err }) // gestion des erreurs à peaufiner
    },
    async deleteTask(taskId: number) {
      await useApi().task.delete(taskId)
        .then(() => this.tasks = this.tasks.filter(task => task.id !== taskId))
        .catch((err) => { return err }) // gestion des erreurs à peaufiner
    },
  },
  getters: {
    previewTasks: state => <Pick <Task, 'id' | 'title' | 'completed'> []> state.tasks.sort((a, b) => new Date(b.createdAt.toString()).getTime() - new Date(a.createdAt.toString()).getTime()),
    task: state => (id: number): Partial<Task> => state.tasks.find(task => task.id === id) || {},
    taskCategories: state => (ids: number[]): Category[] => state.categories.filter(category => ids.indexOf(category.id) > -1),
  },
})
