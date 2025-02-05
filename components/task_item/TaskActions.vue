<template>
  <div class="absolute top-2 right-2 flex space-x-2">
    <button
      class="w-6 h-6 flex items-center justify-center bg-blue-400 text-white rounded-lg opacity-40 hover:opacity-80 hover:scale-105 backdrop-blur-sm transition-all"
      @click="$emit('edit')"
    >
      ✏️
    </button>
    <button
      class="w-6 h-6 flex items-center justify-center bg-red-400 text-white rounded-lg opacity-40 hover:opacity-80 hover:scale-105 backdrop-blur-sm transition-all"
      @click="$emit('delete')"
    >
      ❌
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

defineProps<{ taskId: number }>()
defineEmits(['edit', 'delete'])
</script>
