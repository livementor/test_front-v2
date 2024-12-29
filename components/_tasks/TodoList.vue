<script setup lang="ts">
import TaskSearch from '~/components/_tasks/TaskSearch.vue'
import TaskForm from '~/components/_tasks/TaskForm.vue'
import TaskRow from '~/components/_tasks/TaskRow.vue'
import TaskFilter from '~/components/_tasks/TaskFilter.vue'
import TasksStats from '~/components/_tasks/TasksStats.vue'

const store = useTasksStore()
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-20rem)]">
    <div class="flex flex-col md:flex-row justify-between align-middle items-center mb-4">
      <h2 class="text-6xl font-bold mb-4">
        Mes Tâches
        <task-form />
      </h2>

      <div>
        <tasks-stats />
      </div>
    </div>

    <div>
      <task-search />
    </div>

    <div>
      <task-filter />
    </div>

    <div class="bg-[rgb(239,241,241)] px-8 rounded-lg">
      <template
        v-for="task in store.getFilteredTasks"
        :key="task.id"
      >
        <task-row :task="task" />
      </template>
    </div>
  </div>
</template>
