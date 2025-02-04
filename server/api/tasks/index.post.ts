import type { Task } from '~/types/Task'

const generateID = (): number => Math.floor(Math.random() * 10000)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const storage = useStorage()

  const tasks: Task[] = await storage.getItem('tasks') || []

  const newTask = {
    id: generateID(),
    title: body.title,
    description: body.description || '',
    completed: false,
    createdAt: new Date(),
    categories: Array.isArray(body.categories) ? body.categories : [],
  }


  tasks.push(newTask)

  await storage.setItem('tasks', tasks)

  return newTask
})
