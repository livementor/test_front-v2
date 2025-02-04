<template>
  <div class="absolute top-4 left-4">
    <button @click="toggleMenu" class="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
      ➕ Ajouter une tâche
    </button>

    <div v-if="isOpen" class="absolute left-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
      <h2 class="text-lg font-bold mb-3">Nouvelle tâche</h2>

      <input
        v-model="title"
        placeholder="Titre"
        class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      >
      <textarea
        v-model="description"
        placeholder="Description"
        class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      ></textarea>

      <select v-model="selectedCategory" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>

      <button @click="addTask" class="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
        Ajouter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import { useApi } from '~/composables/useApi.composable'

const isOpen = ref(false)
const title = ref('')
const description = ref('')
const selectedCategory = ref<number | null>(null)
const categories = ref<{ id: number; name: string }[]>([])

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const tasksStore = useTasksStore()
const api = useApi()

const fetchCategories = async () => {
  categories.value = await api.categories.getAll()
}

const addTask = () => {
  if (!title.value.trim()) return

  tasksStore.addTask({
    title: title.value.trim(),
    description: description.value.trim(),
    completed: false,
    categories: selectedCategory.value ? [selectedCategory.value] : [],
  })

  title.value = ''
  description.value = ''
  selectedCategory.value = null
  isOpen.value = false
}

onMounted(fetchCategories)
</script>
