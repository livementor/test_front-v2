import type { Category } from '~/types/Category'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const categories: Category[] = await useStorage().getItem('categories') || []
  if (!categories.length) {
    return null
  }
  const category = categories.find(category => category.id === Number(id))
  return category
})
