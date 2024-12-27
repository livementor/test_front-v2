<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">
        {{ mode === 'create' ? 'Nouvelle tâche' : 'Modifier la tâche' }}
      </h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Catégories</label>
          <div class="mt-2 space-y-2">
            <div v-for="category in categories" :key="category.id" class="flex items-center">
              <input
                type="checkbox"
                :id="'category-' + category.id"
                :value="category.id"
                v-model="formData.categories"
                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              >
              <label :for="'category-' + category.id" class="ml-2 block text-sm text-gray-900">
                {{ category.name }}
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {{ mode === 'create' ? 'Créer' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '~/types/Task'
import type { Category } from '~/types/Category'

const props = defineProps<{
  task: Partial<Task>
  categories: Category[]
  mode: 'create' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'save', task: Partial<Task>): void
  (e: 'close'): void
}>()

const formData = ref({
  title: props.task.title || '',
  description: props.task.description || '',
  categories: props.task.categories || []
})

const handleSubmit = () => {
  emit('save', {
    ...props.task,
    title: formData.value.title,
    description: formData.value.description,
    categories: formData.value.categories
  })
}
</script>
