import type { Task } from '~/types/Task'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const storage = useStorage()

  const tasks: Task[] = await storage.getItem('tasks') || []
  const task = tasks.find(task => task.id === Number(id))

  if (!tasks.length || !task) {
    return null
  }

  const { title, description, completed, category } = body

  task.title = title || task.title
  task.description = description || task.description
  task.completed = completed !== undefined ? completed : task.completed
  task.category = category

  await storage.setItem('tasks', tasks)
  return task
})
