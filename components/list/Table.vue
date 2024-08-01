<template>
  <div class="m-10 container mx-auto bg-white border-solid border-2 border-gray-100 rounded-xl p-2">
    <div class="divide-y">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="p-4"
      >
        <div class="flex justify-between p-2">
          <div>
            <div class="flex mb-2">
              <div
                :class="['text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 ', { 'bg-green-100 text-green-800': task.completed, 'bg-red-100 text-red-800': !task.completed }]"
              >
                {{ task.completed ? "Fait" : "À faire" }}
              </div>
              <div class="text-indigo-600 text-sm">
                {{ task.title }}
              </div>
            </div>
            <div class="text-gray-500 text-sm mb-2">
              {{ task.description }}
            </div>
            <div class="flex flex-col md:flex-row gap-2 text-xs text-gray-500">
              <div>
                {{ getDate(task.createdAt) }}
              </div>
            </div>
          </div>
          <div class="grid justify-items-end">
            <div class="flex gap-2 cursor-pointer">
              <NuxtLink :to="`edit/${task.id}`">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </NuxtLink>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                @click="$emit('deleteTask', task)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
            <input
              type="checkbox"
              class="accent-primary-100 w-5"
              :checked="task.completed"
              @click="$emit('updateTask', task.id)"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang=ts setup>
import moment from 'moment'
import type { Task } from '../../types/Task'

defineProps<{
  tasks: Task[]
}>()

defineEmits(['deleteTask', 'updateTask'])

const getDate = (date: moment.MomentInput) => {
  return moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY - h:mm:ss')
}
</script>
