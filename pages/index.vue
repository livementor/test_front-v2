<template>
  <main class="max-w-screen-md mx-auto p-6 space-y-4">
    <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
      Todo List
    </h1>
    <section class="flex items-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-lg">
      <input
        v-model="newTaskTitle"
        placeholder="Add new task..."
        class="flex-1 p-3 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        @keydown.enter="addTask"
      >
      <button
        class="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
        @click="addTask"
      >
        ➕
      </button>
    </section>
    <TransitionGroup
      name="task-list"
      tag="section"
      class="space-y-2"
    >
      <TaskItem
        v-for="task in tasksStore.tasks"
        :key="task.id"
        :task="task"
        @edit="updateTask"
        @delete="deleteTask"
      />
    </TransitionGroup>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import TaskItem from '~/components/taskItem.vue'

const tasksStore = useTasksStore()
const newTaskTitle = ref('')

const addTask = () => {
  if (!newTaskTitle.value.trim()) return
  tasksStore.addTask({ title: newTaskTitle.value.trim(), completed: false, categories: [] })
  newTaskTitle.value = ''
}

const updateTask = (updates: Partial<Task>) => tasksStore.updateTask(updates.id!, updates)
const deleteTask = (id: number) => tasksStore.deleteTask(id)

onMounted(() => tasksStore.fetchTasks())
</script>
