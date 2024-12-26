<template>
  <div class="max-w-sm animate-pulse">

  <tr v-for="n in 10" :key="n" class="hover:bg-gray-50">
    <td class="border border-gray-300 px-4 py-2 w-auto">
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-18 mb-2.5"></div>
    </td>
    <td class="border border-gray-300 px-4 py-2 w-auto">
      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </td>
    <td class="border border-gray-300 px-4 py-2 w-auto">
      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </td>
    <td class="border border-gray-300 px-4 py-2 text-center">
      <button class="text-green-500 hover:text-green-700 px-2" @click="completeAction">
        Complete
      </button>
      <button class="text-blue-500 hover:text-blue-700 px-2" @click="showUpdateAction">
        Edit
      </button>
      <button class="text-red-500 hover:text-red-700 px-2" @click="showDeleteAction">
        Delete
      </button>
    </td>
  </tr>
</div>

</template>

<script lang="ts" setup name="TaskTableBodySkeleton">

</script>
