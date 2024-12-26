<template>
  <tr class="hover:bg-gray-50">
    <td class="border border-gray-300 px-4 py-2"> {{ task.title }}</td>
    <td class="border border-gray-300 px-4 py-2">{{ task.description }}</td>
    <td class="border border-gray-300 px-4 py-2 ">
      <div class="content-center"> 
        <Icon size="2em" v-if="task.completed" name="uil:check-circle" class="text-green-500"  />
      </div>
    </td>
    <td class="border border-gray-300 px-4 py-2 text-center">
      <button class="text-green-500 hover:text-green-700 px-2" v-if="!task.completed" @click="completeAction">Complete</button>
      <button class="text-blue-500 hover:text-blue-700 px-2" v-if="!task.completed" @click="showUpdateAction">Edit</button>
      <button class="text-red-500 hover:text-red-700 px-2"  @click="showDeleteAction">Delete</button>
    </td>
  </tr>
</template>

<script setup lang="ts" name="TaskItem">
import type { Task } from '~/types/Task'
import { useTasksStore } from '~/stores/tasks'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps<{
  task: Task
}>()

const { showUpdate, showDelete, refetch } = useTasksStore()
const { task: taskRequests } = useApi()

const completeAction = () => {
  taskRequests.put({ id: props.task.id, completed: true }).then(() => {
    toast.success("Task completed successfully", {
      autoClose: 3000,
    });
  }).catch(() => {
    toast.error("An error occured, task not completed", {
      autoClose: 3000,
    });
  }).finally(() => {
    refetch()
  })
}

const showUpdateAction = () => {
  showUpdate(props.task)
}

const showDeleteAction = () => {
  showDelete(props.task)
}
</script>
