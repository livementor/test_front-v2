<template>
  <div>
    <h2 class="text-2xl font-bold mb-3">{{ title }}</h2>
    <div class="flex flex-col gap-2">
      <template v-for="task in tasks" :key="task.id">
        <TaskItem
          :task="task"
          :formatDate="formatDate"
          :toggleComplete="toggleComplete"
          :deleteTask="deleteTask"
          :saveTask="saveTask"
          @update="updateList"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types/Task';

interface Props {
  title: string;
  tasks: Task[];
  formatDate: (date: Date | string) => string;
  toggleComplete: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  saveTask: (task: Task) => Promise<void>;
}

const props = defineProps<Props>();
const emit = defineEmits(['update']);

const updateList = () => {
  emit('update');
};
</script>
