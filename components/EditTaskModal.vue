<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">
        Modifier la tâche
      </h2>

      <label class="block text-sm font-medium text-gray-700">Titre</label>
      <input
        v-model="editedTask.title"
        class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      >

      <label class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        v-model="editedTask.description"
        class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      />

      <label class="block text-sm font-medium text-gray-700">Catégorie</label>
      <select
        v-model="editedTask.category"
        class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      >
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>

      <div class="flex justify-between mt-4">
        <button
          class="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
          @click="$emit('close')"
        >
          Annuler
        </button>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          @click="saveChanges"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import type { Task } from '~/types/Task'
import { useApi } from '~/composables/useApi.composable'

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['close', 'save'])
const api = useApi()

const editedTask = ref({ ...props.task })
const categories = ref<{ id: number, name: string }[]>([])

const fetchCategories = async () => {
  categories.value = await api.categories.getAll()
}

const saveChanges = () => {
  emit('save', {
    id: editedTask.value.id,
    title: editedTask.value.title,
    description: editedTask.value.description,
    categories: [editedTask.value.category],
  })
  emit('close')
}

onMounted(fetchCategories)
</script>
