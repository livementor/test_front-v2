import { ref, watch, computed } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import { useCategories } from '~/composables/useCategories.composable'

export function useTaskForm() {
  const title = ref('')
  const description = ref('')
  const selectedCategory = ref<number | undefined>(undefined)
  const titleError = ref(false)

  const tasksStore = useTasksStore()
  const categories = useCategories()

  const selectCategory = (categoryId: number) => {
    selectedCategory.value = selectedCategory.value === categoryId ? undefined : categoryId
  }

  const resetForm = () => {
    title.value = ''
    description.value = ''
    selectedCategory.value = undefined
    titleError.value = false
  }

  const saveTask = () => {
    if (!title.value.trim()) {
      titleError.value = true
      return
    }

    const taskData = {
      title: title.value.trim(),
      description: description.value.trim(),
      category: selectedCategory.value,
    }

    if (tasksStore.editingTask) {
      tasksStore.updateTask(tasksStore.editingTask.id, taskData)
    }
    else {
      tasksStore.addTask({ ...taskData, completed: false })
    }

    tasksStore.setEditingTask(null)
    tasksStore.isSidebarOpen = false
    resetForm()
  }

  watch(
    () => tasksStore.editingTask,
    (task) => {
      if (task) {
        title.value = task.title
        description.value = task.description || ''
        selectedCategory.value = task.category
        tasksStore.isSidebarOpen = true
      }
      else {
        resetForm()
      }
    },
    { immediate: true },
  )

  const isEditing = computed(() => !!tasksStore.editingTask)

  return {
    title,
    description,
    selectedCategory,
    categories,
    titleError,
    isEditing,
    saveTask,
    selectCategory,
  }
}
