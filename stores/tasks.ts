import { defineStore } from 'pinia'
import type { Task } from '~/types/Task'

type State = {
  item: Task | null
  create: boolean
  update: boolean
  delete: boolean
  refetch: number
}

export const useTasksStore = defineStore('tasks', {
  state: (): State => ({ create: false, update: false, delete: false, item: null, refetch: 0 }),
  getters: {
    item: state => state.item,
    create: state => state.create,
    update: state => state.update,
    delete: state => state.delete,
  },
  actions: {
    showCreate() {
      this.create = true
    },
    hideCreate() {
      this.create = true
      this.item = null
    },

    showUpdate(task: Task) {
      this.item = task
      this.update = true
    },
    hideUpdate() {
      this.update = true
      this.item = null
    },

    showDelete(task: Task) {
      this.item = task
      this.delete = true
    },
    hideDelete() {
      this.delete = true
      this.item = null
    },

    refetch() {
      this.refetch++
    },
  },
})
