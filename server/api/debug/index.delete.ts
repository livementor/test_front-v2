export default defineEventHandler(async (_event) => {
  await useStorage().setItem('tasks', [])

  return true
})
