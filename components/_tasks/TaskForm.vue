<script setup lang="ts">
import { MkrModal } from '@livementor/mikado_reborn/src/components/Modal'
import { MkrContainedButton, MkrOutlinedButton } from '@livementor/mikado_reborn/src/components/Button'
import { MkrDropdown } from '@livementor/mikado_reborn/src/components/Dropdown'
import { MkrTextfield } from '@livementor/mikado_reborn/src/components/Textfield'
import { MkrTextarea } from '@livementor/mikado_reborn/src/components/Textarea'
import type { PropType } from 'vue'
import { Priority } from '~/types/Filters'
import type { Task } from '~/types/Task'
import { enumToDropdownItems } from '~/utils/enumToDropdown'

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: false,
  },
  triggerSize: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
})

const store = useTasksStore()
const showModal = ref(false)
const payloadTask = reactive<Partial<Task>>({
  title: props.task?.title || '',
  description: props.task?.description || '',
  priority: props.task?.priority || Priority.Medium,
})

function submitTask() {
  if (props.task) {
    store.update(props.task.id, payloadTask)
  }
  else {
    store.add(payloadTask)
  }

  showModal.value = false
  payloadTask.title = ''
  payloadTask.description = ''
  payloadTask.priority = Priority.Medium
}
</script>

<template>
  <mkr-modal v-model="showModal">
    <div class="flex flex-col gap-4">
      <h1 class="text-5xl font-bold text-center mb-4 uppercase">
        Ajouter une tâche
      </h1>

      <mkr-textfield
        v-model="payloadTask.title"
        placeholder="Titre"
        type="text"
      />

      <mkr-textarea
        v-model="payloadTask.description"
        placeholder="Description"
        type="text"
        :rows="5"
      />

      <mkr-dropdown
        v-model="payloadTask.priority"
        :items="enumToDropdownItems(Priority)"
        placeholder="Priorité"
        class="w-full"
      />

      <mkr-contained-button @click="submitTask">
        Sauvegarder
      </mkr-contained-button>
    </div>
  </mkr-modal>
  <mkr-outlined-button
    theme="neutral"
    :icon="props.task ? 'pencil' : 'plus'"
    :size="props.triggerSize"
    @click="showModal = true"
  />
</template>
