<template>
  <form @submit.prevent="addTask" class="flex flex-col sm:flex-row items-end gap-5 my-5 w-full">
    <div class="flex flex-col flex-1 space-y-2 w-full">
      <input
        v-model="newTask.title"
        :placeholder="texts.addNewTaskTitle"
        class="input border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
      >
      <input
        v-model="newTask.description"
        :placeholder="texts.addNewTaskDescription"
        class="input border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
      >
    </div>
    <button
      type="submit"
      class="flex items-center gap-2 px-4 py-2 bg-blue-400 font-bold text-white rounded-md transition-colors duration-300 hover:bg-blue-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      {{ texts.addTask }}
    </button>
  </form>
</template>

<script setup lang="ts">
const newTask = ref({ title: '', description: '' });
const emit = defineEmits(['add-task']);

const texts = {
  addNewTaskTitle: 'Titre',
  addNewTaskDescription: 'Description',
  addTask: 'Créer une tâche',
};

const addTask = () => {
  emit('add-task', { ...newTask.value });
  newTask.value = { title: '', description: '' };
};
</script>
