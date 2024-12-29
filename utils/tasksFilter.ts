import type { Task } from '~/types/Task'
import { type Filters, SortBy, Status } from '~/types/Filters'

export function filterTasks(tasks: Task[], filters: Filters): Task[] {
  let filteredTasks = tasks

  if (filters.query) {
    filteredTasks = filterByQuery(filteredTasks, filters.query)
  }

  if (filters.category !== '') {
    filteredTasks = filterByCategory(filteredTasks, filters.category)
  }

  if (filters.status !== '') {
    filteredTasks = filterByStatus(filteredTasks, filters.status)
  }

  if (filters.priority !== '') {
    filteredTasks = filterByPriority(filteredTasks, filters.priority)
  }

  filteredTasks = sort(filteredTasks, filters.sortBy)

  return filteredTasks
}

function filterByQuery(tasks: Task[], query: string): Task[] {
  return tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()))
}

function filterByCategory(tasks: Task[], categoryId: number): Task[] {
  return tasks.filter(task => task.categories.includes(categoryId))
}

function filterByStatus(tasks: Task[], status: Filters['status']): Task[] {
  return tasks.filter(task => task.completed === (status === Status.Completed))
}

function filterByPriority(tasks: Task[], priority: Filters['priority']): Task[] {
  return tasks.filter(task => task.priority === priority)
}

function sort(tasks: Task[], sortBy: Filters['sortBy']): Task[] {
  if (sortBy === SortBy.Title) {
    return tasks.sort((a, b) => a.title.localeCompare(b.title))
  }
  if (sortBy === SortBy.Date) {
    return tasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }
  if (sortBy === SortBy.Category) {
    return tasks.sort((a, b) => a.categories[0] - b.categories[0])
  }
  if (sortBy === SortBy.Status) {
    return tasks.sort((a, b) => Number(a.completed) - Number(b.completed))
  }
  if (sortBy === SortBy.Priority) {
    return tasks.sort((a, b) => a.priority.localeCompare(b.priority))
  }

  return tasks
}
