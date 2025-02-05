import { ref } from 'vue'
import { useApi } from '~/composables/useApi.composable'

export default function useCategoryColorComposable() {
  const api = useApi()
  const categories = ref<{ id: number, name: string, color: string }[]>([])

  const fetchCategories = async () => {
    categories.value = (await api.categories.getAll()).map(category => ({
      id: category.id,
      name: category.name,
      color: category.color ?? '#D3D3D3',
    }))
  }

  fetchCategories()

  const getCategoryColor = (categoryId: number) => {
    const category = categories.value.find(cat => cat.id === categoryId)
    return category ? category.color : '#D3D3D3'
  }

  return { getCategoryColor }
}
