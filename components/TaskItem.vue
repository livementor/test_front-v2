<template>
  <article
    class="relative task-item flex justify-between p-4 rounded-lg shadow-sm transition-all bg-gray-100 overflow-hidden"
    :class="{ 'border-l-8': task.category !== undefined }"
    :style="task.category !== undefined ? { borderLeftColor: getCategoryColor(task.category) } : {}"
  >
    <div class="flex-1 flex flex-col overflow-hidden pr-4">
      <div class="flex items-center space-x-3">
        <input
          type="checkbox"
          :checked="task.completed"
          class="w-8 h-8 text-green-500 flex-shrink-0 rounded-lg border-gray-400 bg-white cursor-pointer"
          @change.stop="toggleCompletion"
        >

        <div class="flex-1 overflow-hidden leading-none relative">
          <div
            class="text-lg font-medium w-full cursor-text whitespace-pre-wrap break-all overflow-hidden pr-8"
            :class="{ 'line-through text-gray-500': task.completed }"
          >
            {{ task.title }}
          </div>

          <span class="text-xs text-gray-500 mt-1 block">
            Créée le {{ formattedDate }}
          </span>
        </div>
      </div>

      <div class="mt-2">
        <div
          v-if="task.description"
          class="text-sm text-gray-600 whitespace-pre-wrap break-all overflow-hidden"
        >
          {{ task.description }}
        </div>
      </div>
    </div>

    <div class="absolute top-2 right-2 flex space-x-2">
      <button
        class="w-6 h-6 flex items-center justify-center bg-blue-400 text-white rounded-lg opacity-40 hover:opacity-80 hover:scale-105 backdrop-blur-sm transition-all"
        @click="openSidebarEdit"
      >
        ✏️
      </button>
      <button
        class="w-6 h-6 flex items-center justify-center bg-red-400 text-white rounded-lg opacity-40 hover:opacity-80 hover:scale-105 backdrop-blur-sm transition-all"
        @click="$emit('delete', task.id)"
      >
        ❌
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, onMounted } from 'vue'
import type { Task } from '~/types/Task'
import { useApi } from '~/composables/useApi.composable'
import { useTasksStore } from '~/stores/tasks'

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['edit', 'delete'])
const api = useApi()
const tasksStore = useTasksStore()
const categories = ref<{ id: number, name: string, color: string }[]>([])

const fetchCategories = async () => {
  categories.value = (await api.categories.getAll()).map(category => ({
    id: category.id,
    name: category.name,
    color: category.color ?? '#D3D3D3',
  }))
}

const getCategoryColor = (categoryId: number) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.color : '#D3D3D3'
}

const formattedDate = computed(() => {
  const date = new Date(props.task.createdAt)
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
})

const toggleCompletion = () => {
  emit('edit', { id: props.task.id, completed: !props.task.completed })
}

const openSidebarEdit = () => {
  tasksStore.setEditingTask(props.task)
  tasksStore.isSidebarOpen = true
}

onMounted(fetchCategories)
</script>
