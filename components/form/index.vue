<template>
  <div
    class="border-solid border-2 border-gray-100 rounded-xl bg-white py-4 flex flex-col p-8"
  >
    <FormInput
      label="Titre"
      name="title"
      :model-value="title"
      @update:model-value="$event => (title = $event)"
    />
    <span
      v-if="errors.title"
      class="text-xs text-red-600"
    >{{ errors.title }}</span>
    <FormInputTextArea
      class="mt-4"
      label="Description"
      name="description"
      :model-value="description"
      @update:model-value="$event => (description = $event)"
    />
    <div class="flex gap-2">
      <!-- <FormInput
        type="date"
        label="Date"
        name="date"
        :value="dateFormatted"
        @input="update('date')"
      />
      -->
      <div
        v-if="task"
        class="mt-4"
      >
        <label
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Statut :
        </label>
        <div
          :class="['text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 ', { 'bg-green-100 text-green-800': task.completed, 'bg-red-100 text-red-800': !task.completed }]"
        >
          {{ task?.completed ? "Fait" : "À faire" }}
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button
        class="bg-indigo-500 w-full text-sm text-white py-2 px-4 rounded"
        @click="submitTask"
      >
        Valider
      </button>
      <button
        class="bg-gray-50 mt-4 w-full text-sm py-2 px-4 rounded"
        @click="goBack"
      >
        Annuler
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '../../types/Task'

const route = useRoute()
const router = useRouter()
const props = defineProps<{
  task?: Task
}>()

const emits = defineEmits(['formUpdate'])

const title = ref(props.task?.title || '')
const description = ref(props.task?.description || '')

const errors = ref<{ title?: string }>({
  title: '',
})

const validateForm = () => {
  errors.value = {}
  if (!title.value) {
    errors.value.title = 'Le titre est requis.'
  }
  return Object.keys(errors.value).length === 0
}

const submitTask = () => {
  if (!validateForm()) {
    return
  }
  const taskUpdated = {
    id: route.params.id,
    // date: date.value ? moment(date.value).format() : undefined,
    title: title.value,
    description: description.value,
  }
  emits('formUpdate', taskUpdated)
  router.push('/')
}
const goBack = () => {
  router.push('/')
}
</script>
