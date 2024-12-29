import { defineStore } from 'pinia'
import type { Task } from '~/types/Task'
import type { Category } from '~/types/Category'
import type { Filters } from '~/types/Filters'
import { filterTasks } from '~/utils/tasksFilter'
import { SortBy } from '~/types/Filters'

export const useTasksStore = defineStore('tasks', () => {
  /* State */
  const tasks = ref<Array<Task>>([])
  const categories = ref<Array<Category>>([])
  const filters = ref<Filters>({
    query: '',
    category: '',
    status: '',
    priority: '',
    sortBy: SortBy.Date,
  })

  /* Getters */
  const getFilteredTasks = computed(() => filterTasks(tasks.value, filters.value))
  const getCategories = computed(() => categories.value)

  /* Actions */
  async function init() {
    tasks.value = await useApi().task.getAll()
    categories.value = await useApi().categories.get()
  }

  async function add(payload: Partial<Task>) {
    return await useApi().task
      .post(payload)
      .then((task) => {
        tasks.value.push(task)
        return task
      })
      .catch(error => console.error(error))
  }

  async function complete(id: number) {
    return await update(id, { completed: true })
  }

  async function update(id: number, payload: Partial<Task>) {
    return await useApi().task
      .put({ id, ...payload })
      .then((task) => {
        const index = tasks.value.findIndex(task => task.id === id)
        tasks.value[index] = task
        return task
      })
      .catch(error => console.error(error))
  }

  async function remove(id: number) {
    return await useApi().task
      .delete(id)
      .then(() => {
        tasks.value = tasks.value.filter(task => task.id !== id)
      })
      .catch(error => console.error(error))
  }

  /** Debugging */
  async function seed() {
    return await useApi().debug
      .post()
      .then(() => {
        init()
      })
  }

  async function clear() {
    return await useApi().debug
      .delete()
      .then(() => {
        init()
      })
  }

  return {
    tasks, categories, filters,
    init,
    add, complete, update, remove,
    getFilteredTasks, getCategories,
    seed, clear,
  }
})
