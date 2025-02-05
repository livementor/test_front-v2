<template>
  <div>
    <h2 class="text-lg font-semibold text-gray-900 mb-3">
      {{ isEditing ? "Modifier la tâche" : "Nouvelle tâche" }}
    </h2>

    <input
      v-model="title"
      placeholder="Titre (obligatoire)"
      class="w-full p-3 border rounded-lg shadow-sm bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-500 mb-2"
      :class="{ 'border-red-500': titleError }"
    >
    <p
      v-if="titleError"
      class="text-red-500 text-sm mt-1"
    >
      Le titre est obligatoire.
    </p>

    <textarea
      v-model="description"
      placeholder="Description"
      class="w-full p-3 border rounded-lg shadow-sm bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-500 mb-2"
    />

    <div class="grid grid-cols-4 gap-2 mb-8">
      <button
        v-for="category in categories"
        :key="category.id"
        class="w-full h-8 flex items-center justify-center rounded-lg shadow-md focus:outline-none text-gray-700 text-center"
        :class="{ 'border-2 border-gray-400': selectedCategory === category.id }"
        :style="{ backgroundColor: category.color }"
        @click="selectCategory(category.id)"
      >
        {{ category.name }}
      </button>
    </div>

    <div class="flex justify-between mt-4">
      <button
        class="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
        @click="$emit('cancel')"
      >
        Annuler
      </button>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        :disabled="!title.trim()"
        :class="{ 'opacity-50 cursor-not-allowed': !title.trim() }"
        @click="saveTask"
      >
        {{ isEditing ? "Enregistrer" : "Ajouter" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { useTaskForm } from '~/composables/useTaskForm.composable'
import { useCategories } from '~/composables/useCategories.composable'

const { categories } = useCategories()
const { title, description, selectedCategory, titleError, isEditing, selectCategory, saveTask } = useTaskForm()

defineEmits(['cancel'])
</script>
