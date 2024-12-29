import { taskList, categoryList } from '~/server/plugins/storage'

export default defineEventHandler(async (_event) => {
  const storage = useStorage()

  await storage.setItem('tasks', taskList)
  await storage.setItem('categories', categoryList)

  return true
})
