import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi.composable'

export function useCategories() {
  const api = useApi()
  const categories = ref<{ id: number, name: string, color: string }[]>([])

  const fetchCategories = async () => {
    try {
      const response = await api.categories.getAll()
      categories.value = response.map(category => ({
        id: category.id,
        name: category.name,
        color: category.color ?? '#D3D3D3',
      }))
    }
    catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  onMounted(fetchCategories)

  const getCategoryColor = (categoryId: number) => {
    return categories.value.find(cat => cat.id === categoryId)?.color ?? '#D3D3D3'
  }

  return { categories, fetchCategories, getCategoryColor }
}
