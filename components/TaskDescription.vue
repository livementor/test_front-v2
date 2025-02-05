<template>
  <div
    v-if="description"
    class="mt-2 text-sm text-gray-600 whitespace-pre-wrap break-all overflow-hidden"
  >
    {{ description }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ description?: string }>()
</script>
