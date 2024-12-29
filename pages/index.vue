<script setup lang="ts">
import { MkrApp } from '@livementor/mikado_reborn/src/components/App'
import TodoList from '~/components/_tasks/TodoList.vue'

const taskStore = useTasksStore()
await taskStore.init()
</script>

<template>
  <mkr-app>
    <div class="p-8">
      <nav-bar />

      <todo-list />

      <debug-bar />
    </div>
  </mkr-app>
</template>
