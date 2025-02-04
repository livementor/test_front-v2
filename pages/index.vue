<template>
  <main class="max-w-screen-md mx-auto p-6 space-y-4">
    <TaskPanel />

    <h1 class="text-5xl font-extrabold text-gray-900 text-center tracking-wide border-b-4 border-gray-300 pb-2 mt-8">
      ✅ Mes tâches
    </h1>

    <div class="bg-white p-4 shadow-lg rounded-lg">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Liste des tâches</h2>
      
      <section v-if="tasksStore.tasks.length > 0" class="space-y-2">
        <TaskItem
          v-for="task in tasksStore.tasks"
          :key="task.id"
          :task="task"
          @edit="updateTask"
          @delete="deleteTask"
        />
      </section>
      <p v-else class="text-gray-500 text-center">Aucune tâche pour l’instant.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import TaskItem from '~/components/taskItem.vue'
import TaskPanel from '~/components/taskPanel.vue'
import type { Task } from '~/types/Task'

const tasksStore = useTasksStore()

const updateTask = (updates: Partial<Task>) => tasksStore.updateTask(updates.id!, updates)
const deleteTask = (id: number) => tasksStore.deleteTask(id)

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>
