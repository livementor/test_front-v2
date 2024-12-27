<template>
  <div class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3 flex-1">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle-complete', task)"
          class="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        >
        <div class="flex-1">
          <h3 :class="['font-medium', task.completed ? 'line-through text-gray-500' : '']">
            {{ task.title }}
          </h3>
          <p v-if="task.description" class="text-sm text-gray-600">
            {{ task.description }}
          </p>

          <div v-if="task.categories.length" class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="categoryId in task.categories"
              :key="categoryId"
              class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
            >
              {{ getCategoryName(categoryId) }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <button
          @click="showEditModal = true"
          class="text-gray-500 hover:text-blue-500"
        >
          <span>Modifier</span>
        </button>
        <button
          @click="$emit('delete', task.id)"
          class="text-gray-500 hover:text-red-500"
        >
          <span>Supprimer</span>
        </button>
      </div>
    </div>

    <TaskModal
      v-if="showEditModal"
      :task="task"
      :categories="categories"
      mode="edit"
      @close="showEditModal = false"
      @save="updateTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '~/types/Task'
import type { Category } from '~/types/Category'

const props = defineProps<{
  task: Task
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'update', task: Task): void
  (e: 'delete', id: number): void
  (e: 'toggle-complete', task: Task): void
}>()

const showEditModal = ref(false)

const updateTask = (updatedTask: Task) => {
  emit('update', { ...props.task, ...updatedTask })
  showEditModal.value = false
}

const getCategoryName = (categoryId: number) => {
  const category = props.categories.find(c => c.id === categoryId)
  return category?.name
}
</script>