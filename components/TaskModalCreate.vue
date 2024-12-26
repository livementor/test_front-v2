<template>
  <div 
    v-if="state.create" 
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Create Task</h2>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            v-model="title"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Title"
          />
        </div>

        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            id="description"
            v-model="description"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Description"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3">
          <button 
            type="button" 
            @click="state.hideCreate" 
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script lang="ts" setup name="TaskModalCreate">
  import { useTasksStore } from '~/stores/tasks'
  
  const state = useTasksStore()
  const { task: taskRequests } = useApi()
  
  const title = ref("")
  const description = ref("")
  
  const submitForm = () => {
    taskRequests.post({ title: title.value, description: description.value, completed: false }).then((task) => {
      // Success toast
    }).catch(() => {
      // error toast
    }).finally(() => {
      state.hideCreate()
      state.refetch()
    })
  }
  </script>
  