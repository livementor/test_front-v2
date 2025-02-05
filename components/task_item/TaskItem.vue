<template>
  <article
    class="relative flex justify-between p-4 rounded-lg shadow-sm transition-all bg-gray-100 overflow-hidden"
    :class="{ 'border-l-8': hasCategory }"
    :style="categoryStyle"
  >
    <div class="flex-1 flex flex-col overflow-hidden pr-4">
      <TaskHeader
        :task="task"
        @toggle-completion="toggleCompletion"
      />
      <TaskDescription :description="task.description" />
    </div>
    <TaskActions
      :task-id="task.id"
      @edit="openSidebarEdit"
      @delete="$emit('delete', task.id)"
    />
  </article>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import TaskHeader from './TaskHeader.vue'
import TaskDescription from './TaskDescription.vue'
import TaskActions from './TaskActions.vue'
import type { Task } from '~/types/Task'
import { useTasksStore } from '~/stores/tasks'
import { useCategories } from '~/composables/useCategories.composable'

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['delete', 'edit'])
const tasksStore = useTasksStore()
const { getCategoryColor } = useCategories()

const hasCategory = computed(() => props.task.category !== undefined)
const categoryStyle = computed(() => (hasCategory.value && props.task.category ? { borderLeftColor: getCategoryColor(props.task.category) } : {}))

const toggleCompletion = () => {
  emit('edit', { id: props.task.id, completed: !props.task.completed })
  tasksStore.updateTask(props.task.id, { completed: !props.task.completed })
}

const openSidebarEdit = () => {
  tasksStore.setEditingTask(props.task)
  tasksStore.isSidebarOpen = true
}
</script>
