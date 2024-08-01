<template>
  <div class="m-10 md:w-1/4 md:mx-auto">
    <h1 class="font-extrabold text-center text-3xl my-6">
      Ajouter une tâche
    </h1>
    <Form @form-update="postTask" />
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '../types/Task'

const api = useApi()

const postTask = (event: Task) => {
  try {
    api.task.post(event)
  }
  catch (error) {
    console.error('Error posting task:', error)
  }
}
</script>
