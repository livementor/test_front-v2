export default defineEventHandler((_event) => {
  return useStorage().getItem('tasks')
})
