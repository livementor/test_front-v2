<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">
      Task Table
    </h1>
    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4" @click="refetch">
      Refresh
    </button>
    <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-2" @click="showCreate">
      Create
    </button>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left">
            Title
          </th>
          <th class="border border-gray-300 px-4 py-2 text-left">
            Description
          </th>
          <th class="border border-gray-300 px-4 py-2 text-left">
            Status
          </th>
          <th class="border border-gray-300 px-4 py-2 text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <TaskTableBodySkeleton v-if="props.isLoading" />

        <template v-else>
          <TaskTableItem v-for="task in props.tasks" :key="task.id" :task="task" />
        </template>

      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" name="TaskTable">
import type { Task } from '~/types/Task'
import { useTasksStore } from '~/stores/tasks'

const props = defineProps<{
  tasks: Task[]
  isLoading: boolean
}>()

const { refetch, showCreate } = useTasksStore()
</script>