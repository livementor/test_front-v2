<template>
  <div class="max-w-screen-md mx-auto p-5">
    <div class="text-3xl font-bold mb-3">
      Todo List
    </div>
    <TaskTable :tasks="tasks" :isLoading="isLoading" />
    <TaskModalUpdate />
    <TaskModalCreate />
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks'

const { task: taskRequests } = useApi()
const state = useTasksStore()

const tasksRef = ref<Array<Task>>([])

const tasks = computed(() => tasksRef.value)
const isLoading = ref(true)

const fetchAll = () => {
  isLoading.value = true
  taskRequests.getAll().then((tasks) => {
    isLoading.value = false
    tasksRef.value = tasks
  })
}

watch(() => state.refetchTrigger, (newX) => {
  fetchAll()
})

onMounted(() => {
  fetchAll()
})
</script>