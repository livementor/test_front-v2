<template>
  <div class="flex items-center gap-2 mb-5 pt-5 border-t">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="texts.searchTasks"
      class="input border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
    >
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update-query']);
const searchQuery = ref('');

const texts = {
  searchTasks: 'Rechercher des tâches...',
};

watch(searchQuery, (newValue) => {
  emit('update-query', newValue);
});
</script>
