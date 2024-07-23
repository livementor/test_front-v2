<template>
  <div class="max-w-screen-md mx-auto p-5">
    <div class="text-3xl font-bold mb-3">
      Todo List
    </div>

    <ul>
      <li
        v-for="task in tasks"
        :key="task.id"
      >
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types/Task'

// L'endpoint se trouve dans le fichier `server/api/task.ts`
const response = await useFetch<{ tasks: Task[] }>('/api/tasks')
const tasks = response.data.value?.tasks || []
</script>
