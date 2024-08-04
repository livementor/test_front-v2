<script setup lang="ts">
import type { Task } from '~/types/Task'

const store = useTasksStore()
let tasksList: Pick<Task, 'id' | 'title' | 'completed'>[] = store.previewTasks

const openSlideOver = ref(false)
const taskToOpen = ref(-1)

const edition = ref(false)

const confirmDelete = async () => {
  if (confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
    await store.deleteTask(taskToOpen.value)
    tasksList = store.previewTasks
    taskToOpen.value = -1
    openSlideOver.value = false
  }
}

const save = async () => {
  store.updateTask(taskToOpen.value)
  taskToOpen.value = -1
  openSlideOver.value = false
}
</script>

<template>
  <div class="w-full">
    <!-- Liste des tâches -->
    <ul class="w-full flex flex-col gap-1.5">
      <li
        v-for="task in tasksList"
        class="flex gap-5 items-center w-full"
      >
        <UCheckbox
          v-model="task.completed"
          input-class="w-6 h-6 cursor-pointer rounded-full"
          @change="store.updateStatus(task.id, task.completed)"
        />
        <div
          class="flex-1 flex justify-between items-center hover:bg-neutral-200 transition duration-200 pl-4 py-2 pr-2 cursor-pointer rounded-xl"
          @click="taskToOpen = task.id; openSlideOver = true"
        >
          <span>{{ task.title }}</span>
          <UIcon
            class="w-5 h-5"
            name="i-bx-chevron-right"
          />
        </div>
      </li>
    </ul>

    <!-- Ouverture d'une tâche -->
    <USlideover
      v-model="openSlideOver"
      :prevent-close="edition"
    >
      <UCard
        class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
      >
        <template #header>
          <div class="flex justify-between">
            <h2>{{ edition ? 'Modification' : 'Détail' }} de la tâche</h2>
            <UButton
              size="2xs"
              label="Supprimer"
              trailing-icon="i-bx-trash"
              color="red"
              @click="confirmDelete"
            />
          </div>
        </template>

        <TaskForm
          :disabled="!edition"
          :task-id="taskToOpen"
        />

        <template #footer>
          <div

            class="flex justify-between"
          >
            <UButton
              v-if="!edition"
              label="Fermer"
              trailing-icon="i-bx-x"
              variant="ghost"
              color="red"
              @click="openSlideOver = false"
            />
            <UButton
              v-else
              label="Annuler"
              trailing-icon="i-bx-x"
              variant="ghost"
              color="red"
              @click="edition = false"
            />

            <UButton
              v-if="!edition"
              label="Modifier"
              trailing-icon="i-bx-edit"
              @click="edition = true"
            />
            <UButton
              v-else
              label="Enregistrer"
              trailing-icon="i-bx-edit"
              @click="save"
            />
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>

<style scoped>

</style>
