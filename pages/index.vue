<template>
  <main class="max-w-screen-md mx-auto p-6 space-y-4">
    <TaskSidebar />

    <header class="text-center">
      <h2 class="text-5xl font-extrabold text-gray-900 tracking-wide border-b-4 border-gray-300 pb-2 mt-8">
        ✅ Todo List
      </h2>
    </header>

    <section class="bg-white p-4 shadow-lg rounded-lg">
      <template v-if="tasksStore.tasks.length > 0">
        <ul class="space-y-2">
          <TransitionGroup
            tag="div"
            name="task-list"
            class="space-y-4"
          >
            <TaskItem
              v-for="task in tasksStore.tasks"
              :key="task.id"
              :task="task"
              @edit="updateTask"
              @delete="deleteTask"
            />
          </TransitionGroup>
        </ul>
      </template>
      <p
        v-else
        class="text-gray-500 text-center"
      >
        Aucune tâche pour l’instant.
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import TaskItem from '~/components/task_item/TaskItem.vue'
import TaskSidebar from '~/components/TaskSidebar.vue'
import type { Task } from '~/types/Task'

const tasksStore = useTasksStore()
const updateTask = (updates: Partial<Task>) => tasksStore.updateTask(updates.id!, updates)
const deleteTask = (id: number) => tasksStore.deleteTask(id)

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>

<style>
.task-list-enter-active {
  animation: slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), fade-in 0.3s ease-in-out;
}

.task-list-leave-active {
  animation: shrink-out 0.3s ease-in-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes shrink-out {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(-10px) scale(0.8);
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
