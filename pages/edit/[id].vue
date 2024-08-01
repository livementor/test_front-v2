<template>
  <div class="m-10 md:w-1/4 md:mx-auto">
    <h1 class="font-extrabold  text-center text-3xl my-6">
      Editer une tâche
    </h1>
    <Form
      v-if="task"
      :task="task"
      @form-update="editTask"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '../../types/Task'

const route = useRoute()

const task = ref()

const api = useApi()

const fetchTasks = async () => {
  try {
    const tasks = await api.task.getAll()
    task.value = tasks.find(task => task.id === Number(route.params.id))
  }
  catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

const editTask = (event: Task) => {
  try {
    api.task.put(event)
  }
  catch (error) {
    console.error('Error posting task:', error)
  }
}

onMounted(() => {
  fetchTasks()
})
</script>
