<template>
  <div class="max-w-screen-md mx-auto p-5 flex justify-between items-center flex-wrap">
    <Header class="w-full"/>
    <TaskList />
  </div>
</template>

<script setup lang="ts">
const store = useTasksStore()
await store.init() // permet d'initier les données en début de session
</script>
