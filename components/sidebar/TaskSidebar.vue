<template>
  <div>
    <button
      class="absolute top-4 left-4 px-4 py-2 text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-100 transition shadow-sm"
      @click="toggleSidebar"
    >
      {{ tasksStore.editingTask ? "Modifier la tâche" : "➕ Ajouter une tâche" }}
    </button>

    <Transition name="slide">
      <div
        v-if="tasksStore.isSidebarOpen"
        class="task-panel z-50"
      >
        <TaskForm @cancel="closeSidebar" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import TaskForm from './TaskForm.vue'
import { useTasksStore } from '~/stores/tasks'

const tasksStore = useTasksStore()

const toggleSidebar = () => {
  tasksStore.isSidebarOpen = !tasksStore.isSidebarOpen
  if (!tasksStore.isSidebarOpen) tasksStore.setEditingTask(null)
}

const closeSidebar = () => {
  tasksStore.isSidebarOpen = false
  tasksStore.setEditingTask(null)
}
</script>

<style scoped>
.task-panel {
  position: absolute;
  top: 70px;
  left: 10px;
  width: 95%;
  max-width: 500px;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.task-panel:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}
</style>
