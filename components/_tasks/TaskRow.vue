<script setup lang="ts">
import { MkrExpansionPanel } from '@livementor/mikado_reborn/src/components/ExpansionPanel'
import { MkrOutlinedButton } from '@livementor/mikado_reborn/src/components/Button'
import type { PropType } from 'vue'
import type { Task } from '~/types/Task'
import TaskForm from '~/components/_tasks/TaskForm.vue'
import TaskPriority from '~/components/_tasks/TaskPriority.vue'

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
})

const store = useTasksStore()

const categories = store.getCategories
const tasksCategories = computed(() => {
  if (!props.task.categories) return []
  return categories.filter((category) => {
    return props.task.categories.includes(category.id)
  })
})
</script>

<template>
  <mkr-expansion-panel :default-expanded="false">
    <template #header>
      <div class="flex flex-col md:flex-row align-middle md:items-center justify-between gap-4">
        <div class="flex flex-col md:flex-row gap-4">
          <h3 :class="{ 'task-complete': task.completed }">
            {{ task.title }}
          </h3>

          <div class="flex gap-4">
            <template v-if="tasksCategories.length">
              <template
                v-for="category in tasksCategories"
                :key="`${task.id}-${category.name}`"
              >
                <span
                  class="category-badge"
                  :style="{ color: category.color }"
                >
                  {{ category.name }}
                </span>
              </template>
            </template>

            <task-priority :priority="task.priority" />
          </div>
        </div>

        <div>
          <div class="flex gap-4">
            <task-form :task="task" />
            <mkr-outlined-button
              :disabled="task.completed"
              size="small"
              icon="check"
              @click="store.complete(task.id)"
            />
            <mkr-outlined-button
              size="small"
              icon="trash"
              @click="store.remove(task.id)"
            />
          </div>
        </div>
      </div>
    </template>
    <template #content>
      <div>
        <i>{{ task.description }}</i>
      </div>
    </template>
  </mkr-expansion-panel>
</template>

<style scoped>
.task-complete {
  text-decoration: line-through;
}
.category-badge {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5rem;
  padding: 0 10px;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
