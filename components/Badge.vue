<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'black',
  },
  background: {
    type: String,
    default: 'rgba(0, 0, 0, 0.1)',
  },
})
</script>

<template>
  <span
    class="bg-black/5 rounded-full py-2 px-5 text-xl font-bold align-middle"
    :style="{ color: color, backgroundColor: background }"
  >
    {{ label }}
  </span>
</template>

<style scoped>

</style>
