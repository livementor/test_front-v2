<template>
  <div class="flex items-center space-x-3">
    <input
      type="checkbox"
      :checked="task.completed"
      class="w-8 h-8 text-green-500 flex-shrink-0 rounded-lg border-gray-400 bg-white cursor-pointer"
      @change.stop="$emit('toggleCompletion')"
    >
    <div class="flex-1 overflow-hidden leading-none relative">
      <p
        class="text-lg font-medium"
        :class="{ 'line-through text-gray-500': task.completed }"
      >
        {{ task.title }}
      </p>
      <small class="text-gray-500">Créée le {{ formattedDate }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue'
import type { Task } from '~/types/Task'

const props = defineProps<{ task: Task }>()
const formattedDate = computed(() => new Date(props.task.createdAt).toLocaleDateString('fr-FR'))

defineEmits(['toggleCompletion'])
</script>
