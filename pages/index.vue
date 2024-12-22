<template>
  <div class="max-w-screen-md mx-auto p-5">
    <div class="flex justify-between items-center mb-5">
      <h1 class="text-3xl font-bold mb-3">
        Task List
      </h1>

      <button
        class="bg-blue-500 text-white px-3 py-2 rounded-lg"
        @click="tasksStore.addTask({ title: 'New Task' })"
      >
        Add Task
      </button>
    </div>

    <div class="flex flex-col gap-5">
      <div>
        <h2 class="text-2xl font-bold mb-3">
          Pending Tasks
        </h2>

        <ul class="flex flex-col gap-2">
          <li
            v-for="task in tasksStore.pendingTasks"
            :key="task.id"
          >
            <TaskItem :task="task" />
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-3">
          Completed Tasks
        </h2>

        <ul class="flex flex-col gap-2">
          <li
            v-for="task in tasksStore.completedTasks"
            :key="task.id"
          >
            <TaskItem
              :task="task"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks'

const tasksStore = useTasksStore()

onBeforeMount(() => {
  tasksStore.hydrate()
})
</script>
