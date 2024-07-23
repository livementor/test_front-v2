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
const tasks = await useApi().task.getAll()
</script>
