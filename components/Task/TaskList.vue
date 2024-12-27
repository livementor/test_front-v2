<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Mes tâches</h1>
      <button @click="showNewTaskModal = true" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Nouvelle tâche
      </button>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher une tâche..."
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <select
        v-model="statusFilter"
        class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">Toutes les tâches</option>
        <option value="completed">Tâches terminées</option>
        <option value="active">Tâches en cours</option>
      </select>
      <select
        v-model="selectedCategory"
        class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Toutes les catégories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div v-if="filteredTasks.length" class="space-y-2">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        :categories="categories"
        @update="updateTask"
        @delete="deleteTask"
        @toggle-complete="toggleTaskComplete"
      />
    </div>
    <p v-else class="text-gray-500 text-center py-4">Aucune tâche trouvée</p>

    <TaskModal
      v-if="showNewTaskModal"
      @close="showNewTaskModal = false"
      @save="createTask"
      :task="{ title: '', description: '', completed: false, categories: [] }"
      :categories="categories"
      mode="create"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { Category } from '~/types/Category'
import type { Task } from '~/types/Task'
import TaskItem from './TaskItem.vue'
import TaskModal from './TaskModal.vue'
import { useTasksStore } from '~/stores/tasks'

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const api = useApi()

const categories = ref<Category[]>([])
const showNewTaskModal = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')
const selectedCategory = ref('')

const loadCategories = async () => {
  categories.value = await api.categories.get()
}

const filteredTasks = computed(() => {
  return tasks.value
    .filter(task => {
      // Filtre par statut
      if (statusFilter.value === 'completed') return task.completed
      if (statusFilter.value === 'active') return !task.completed
      return true
    })
    .filter(task => {
      // Filtre par catégorie
      if (!selectedCategory.value) return true
      return task.categories.includes(Number(selectedCategory.value))
    })
    .filter(task => {
      // Filtre par recherche
      if (!searchQuery.value) return true
      const query = searchQuery.value.toLowerCase()
      return (
        task.title.toLowerCase().includes(query) ||
        (task.description?.toLowerCase() || '').includes(query)
      )
    })
})

const createTask = async (taskData: Partial<Task>) => {
  await tasksStore.addTask(taskData)
  showNewTaskModal.value = false
}

const updateTask = async (task: Task) => {
  await tasksStore.updateTask(task)
}

const deleteTask = async (taskId: number) => {
  await tasksStore.deleteTask(taskId)
}

const toggleTaskComplete = async (task: Task) => {
  await tasksStore.toggleTaskComplete(task)
}

onMounted(async () => {
  await Promise.all([tasksStore.fetchTasks(), loadCategories()])
})
</script>