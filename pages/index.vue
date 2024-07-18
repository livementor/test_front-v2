<template>
  <div class="max-w-screen-md mx-auto p-5">
    <div class="text-3xl font-bold mb-3">
      Todo List
    </div>
    <TaskList :tasks="tasks" />
  </div>
</template>

<script setup lang="ts">
import TaskList from "~/components/TaskList.vue";

const tasks = ref([{
  id: 1,
  title: "Task 1",
  description: "Description 1",
  completed: false,
  createdAt: new Date(),
},
{
  id: 2,
  title: "Task 2",
  description: "Description 2",
  completed: true,
  createdAt: new Date(),
},
{
  id: 3,
  title: "Task 3",
  description: "Description 3",
  completed: false,
  createdAt: new Date(),
},
])
</script>