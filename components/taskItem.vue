<template>
  <article 
    class="relative task-item flex justify-between p-4 border-l-8 rounded-lg shadow-sm transition-all bg-gray-100 overflow-hidden"
    :style="{ borderLeftColor: getCategoryColor(task.categories[0]) }"
  >
    <div class="flex-1 flex flex-col overflow-hidden pr-4">
      <div class="flex items-center space-x-3">
        <input
          type="checkbox"
          :checked="task.completed"
          class="w-8 h-8 text-green-500 flex-shrink-0 rounded-lg border-gray-400 bg-white cursor-pointer"
          @change.stop="toggleCompletion"
        >

        <div class="flex-1 overflow-hidden leading-none">
          <div
            class="text-lg font-medium w-full cursor-text whitespace-pre-wrap break-all overflow-hidden"
            :class="{ 'line-through text-gray-500': task.completed }"
          >
            {{ task.title }}
          </div>

          <span class="text-xs text-gray-500 mt-1 block">
            Créée le {{ formattedDate }}
          </span>
        </div>
      </div>

      <div class="mt-2 ml-10"> 
        <div
          v-if="task.description"
          class="text-sm text-gray-600 whitespace-pre-wrap break-all overflow-hidden"
        >
          {{ task.description }}
        </div>
      </div>
    </div>

    <button
      class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-400 text-white rounded-lg opacity-40 hover:opacity-80 hover:scale-105 backdrop-blur-sm transition-all"
      @click="$emit('delete', task.id)"
    >
      <span class="text-sm">❌</span> 
    </button>
  </article>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, onMounted } from 'vue'
import type { Task } from '~/types/Task'
import { useApi } from '~/composables/useApi.composable'

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['edit', 'delete'])
const api = useApi()
const categories = ref<{ id: number; name: string; color: string }[]>([])

const fetchCategories = async () => {
  categories.value = (await api.categories.getAll()).map(category => ({
    id: category.id,
    name: category.name,
    color: category.color ?? '#D3D3D3'
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

onMounted(fetchCategories)
</script>
