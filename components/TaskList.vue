<template>
  <div>
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
defineProps({
  tasks: {
    type: Array as () => Task[],
    default: () => [],
  },
});
</script>
