<script setup lang="ts">
import type { Task } from '~/types/Task'

const openSlideOver = ref(false)
const loader = ref()

const store = useTasksStore()
const task = ref<Partial<Task>>({})

const save = async () => {
  loader.value = true
  task.value.completed = false
  task.value.createdAt = new Date()
  await Promise.all([
    store.addTask(task.value),
    new Promise(resolve => setTimeout(resolve, 1000)), // ux purpose
  ]).then(values => console.log(values))
  loader.value = false
  openSlideOver.value = false
}
</script>

<template>
  <div class="max-w-screen-md mx-auto p-5 flex justify-between items-center flex-wrap">
    <div class="text-3xl font-bold mb-3">
      Todo List
    </div>
    <!-- Nouvelle tâche -->
    <UButton
      size="md"
      trailing-icon="i-bx-plus"
      label="Nouvelle tâche"
      @click="openSlideOver = true"
    />
    <USlideover
      v-model="openSlideOver"
      prevent-close
    >
      <UCard
        class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
      >
        <template #header>
          <h2>Nouvelle Tâche</h2>
        </template>

        <TaskForm @task-updated="task = $event" />

        <template #footer>
          <div class="flex justify-between">
            <UButton
              label="Annuler"
              trailing-icon="i-bx-x"
              variant="ghost"
              color="red"
              @click="openSlideOver = false"
            />
            <UButton
              v-if="!loader"
              :disabled="!task.title || !task.description || !task.categories || task.categories.length == 0"
              label="Créer la tâche"
              trailing-icon="i-bx-plus"
              @click="save"
            />
            <UButton
              v-else
              disabled
              label="Création..."
              trailing-icon="i-bx-loader-alt"
            />
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>

<style scoped>

</style>
