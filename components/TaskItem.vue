<template>
  <div
    class="border border-gray-300 rounded-lg p-2 flex-1 mr-2 hover:bg-gray-100 transition-colors flex flex-row justify-between items-center"
  >
    <div class="flex flex-row items-center flex-1 px-2">
      <input
        type="checkbox"
        class="mr-2"
        :checked="task.completed"
        @click="tasksStore.updateTask({ id: task.id, completed: !task.completed })"
      >

      <div
        v-if="editedTask?.id !== task.id"
        class="flex flex-col"
      >
        <h4>
          {{ task.title }}
        </h4>

        <h5>
          {{ task.description }}
        </h5>
      </div>

      <div
        v-else
        class="flex flex-col flex-1 gap-2 px-2"
      >
        <input
          type="text"
          class="border border-gray-300 rounded-lg p-1 max-w-xs"
          :value="editedTask.title"
          @input="onEditTask({ ...editedTask, title: ($event.target as HTMLInputElement).value || '' })"
        >
        <input
          type="text"
          class="border border-gray-300 rounded-lg p-1 full-width"
          :value="editedTask.description"
          @input="onEditTask({ ...editedTask, description: ($event.target as HTMLInputElement).value || '' })"
        >
      </div>
    </div>

    <div class="flex flex-row gap-2">
      <button
        v-if="editedTask?.id !== task.id"
        class="border border-blue-500 text-blue-500 px-3 py-2 rounded-lg"
        @click="onEditTask(task)"
      >
        Edit
      </button>

      <button
        v-else
        class="border border-blue-500 text-blue-500 px-3 py-2 rounded-lg"
        @click="onConfirmEditTask"
      >
        Save
      </button>

      <button
        class="border border-red-500 text-red-500 px-3 py-2 rounded-lg"
        @click="onRemoveTask"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" name="TaskItem">
import type { Task } from '~/types/Task'
import { useTasksStore } from '~/stores/tasks'

const props = defineProps<{
  task: Task
}>()

const editedTask = useState<Task | null>('editedTask', () => null)

const onEditTask = (task: Task) => {
  editedTask.value = task
}

const onConfirmEditTask = () => {
  tasksStore.updateTask(editedTask.value as Task)
  editedTask.value = null
}

const onRemoveTask = () => {
  tasksStore.removeTask(props.task.id)
}

const tasksStore = useTasksStore()
</script>
