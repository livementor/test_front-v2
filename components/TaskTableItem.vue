<template>
  <tr class="hover:bg-gray-50">
    <td class="border border-gray-300 px-4 py-2"> {{ task.title }}</td>
    <td class="border border-gray-300 px-4 py-2">{{ description }}</td>
    <td class="border border-gray-300 px-4 py-2 text-center">
      <button class="text-green-500 hover:text-green-700 px-2" @click="completeAction">Complete</button>
      <button class="text-blue-500 hover:text-blue-700 px-2" @click="showUpdateAction">Edit</button>
      <button class="text-red-500 hover:text-red-700 px-2" @click="showDeleteAction">Delete</button>
    </td>
  </tr>
</template>

<script setup lang="ts" name="TaskItem">
import type { Task } from '~/types/Task'
import { useTasksStore } from '~/stores/tasks'

const props = defineProps<{
  task: Task
}>()

const { showUpdate, showDelete } = useTasksStore()

const completeAction = () => { }

const showUpdateAction = () => {
  showUpdate(props.task)
}

const showDeleteAction = () => {
  showDelete(props.task)
}
</script>
