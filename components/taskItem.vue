<template>
  <article class="task-item flex justify-between items-center p-3 border rounded-lg shadow-md transition-all bg-white dark:bg-gray-800">
    <div
      class="flex items-center space-x-3 flex-1 overflow-hidden"
      @click.self="startEdit"
    >
      <input
        type="checkbox"
        :checked="task.completed"
        class="h-4 w-4 text-green-500"
        @change.stop="toggleCompletion"
      >
      <input
        v-if="isEditing"
        ref="taskInput"
        v-model="editableTitle"
        class="text-lg font-medium bg-transparent border-b focus:outline-none w-full truncate"
        @keydown.enter="saveEdit"
        @blur="saveEdit"
      >
      <span
        v-else
        class="text-lg font-medium truncate w-full cursor-text overflow-hidden text-ellipsis whitespace-nowrap"
        :class="{ 'line-through text-gray-500': task.completed }"
        @click="startEdit"
      >{{ editableTitle }}</span>
    </div>
    <button
      class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all"
      @click="$emit('delete', task.id)"
    >
      ❌
    </button>
  </article>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, nextTick, watch } from 'vue'
import type { Task } from '~/types/Task'

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['edit', 'delete'])

const isEditing = ref(false)
const editableTitle = ref(props.task.title)
const taskInput = ref<HTMLInputElement | null>(null)

watch(() => props.task.title, (newTitle) => {
  if (!isEditing.value) {
    editableTitle.value = newTitle
  }
})

const startEdit = async () => {
  isEditing.value = true
  await nextTick()
  taskInput.value?.focus()
}

const saveEdit = () => {
  if (editableTitle.value.trim()) {
    emit('edit', { id: props.task.id, title: editableTitle.value.trim() })
  }
  isEditing.value = false
}

const toggleCompletion = () => {
  emit('edit', { id: props.task.id, completed: !props.task.completed })
}
</script>
