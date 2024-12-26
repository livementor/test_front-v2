<template>
  <div 
    v-if="state.delete" 
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Delete Task</h2>

      <form @submit.prevent="submitForm">
        <div class="flex justify-end space-x-3">
          <button 
            type="button" 
            @click="state.hideDelete" 
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup name="TaskModalDelete">
import { useTasksStore } from '~/stores/tasks'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const state = useTasksStore()
const { task: taskRequests } = useApi()

const submitForm = () => {
  taskRequests.delete(state.item.id).then((task) => {
    toast.success("New task deleted successfully", {
        autoClose: 3000,
      });
  }).catch(() => {
    toast.error("An error occured, task not deleted", {
      autoClose: 3000,
    });
  }).finally(() => {
    state.hideDelete()
    state.refetch()
  })
}
</script>
