<template>
  <div :class="['border border-gray-400 p-4 rounded-lg', { 'bg-gray-200 line-through': task.completed }]">
    <div v-if="isEditing" class="flex justify-between gap-2">
      <div class="flex flex-col gap-1">
        <input
          v-model="editData.title"
          :placeholder="texts.editTitle"
          class="input border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
        >
        <input
          v-model="editData.description"
          :placeholder="texts.editDescription"
          class="input border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
        >
      </div>
      <div class="flex flex-col justify-between">
        <button @click="cancelEdit" class="bg-red-500 text-white rounded-full p-2 transition-colors duration-300 hover:bg-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <button @click="saveTask" class="bg-green-500 text-white rounded-full p-2 transition-colors duration-300 hover:bg-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
        </button>
      </div>
    </div>
    <div v-else class="flex justify-between items-start">
      <div>
        <p v-if="task.title" class="font-semibold text-lg">{{ task.title }}</p>
        <p v-if="task.createdAt" class="text-gray-500 text-xs">{{ formatDate(task.createdAt) }}</p>
        <p v-if="task.description" class="mt-4">{{ task.description }}</p>
      </div>
      <div class="flex flex-col space-y-1">
        <button @click="deleteTask" class="bg-red-500 text-white rounded-full p-2 transition-colors duration-300 hover:bg-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
        <button @click="startEdit" class="bg-yellow-500 text-white rounded-full p-2 transition-colors duration-300 hover:bg-yellow-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </button>
        <button @click="toggleComplete" class="bg-green-500 text-white font-bold rounded-full p-2 transition-colors duration-300 hover:bg-green-600">
          <svg v-if="task.completed" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="1 4 1 10 7 10"></polyline>
            <polyline points="23 20 23 14 17 14"></polyline>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types/Task';

interface Props {
  task: Task;
  formatDate: (date: Date | string) => string;
  toggleComplete: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  saveTask: (task: Task) => Promise<void>;
}

const props = defineProps<Props>();
const emit = defineEmits(['update']);

const texts = {
  editTitle: 'Modifier le titre',
  editDescription: 'Modifier la description',
};

const isEditing = ref(false);
const editData = ref({ title: props.task.title, description: props.task.description || '' });

const startEdit = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  editData.value = { title: props.task.title, description: props.task.description || '' };
};

const saveTask = async () => {
  await props.saveTask({ ...props.task, ...editData.value });
  isEditing.value = false;
  emit('update');
};

const toggleComplete = async () => {
  await props.toggleComplete(props.task);
  emit('update');
};

const deleteTask = async () => {
  await props.deleteTask(props.task.id);
  emit('update');
};
</script>
