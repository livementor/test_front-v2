import type { Priority } from '~/types/Filters'

export interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  createdAt: Date
  categories: number[]
  priority: Priority
}
