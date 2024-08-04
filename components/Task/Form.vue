<script setup lang="ts">
import type { Task } from '~/types/Task'

const props = defineProps({ disabled: { type: Boolean }, taskId: { type: Number } })
const emits = defineEmits(['TaskUpdated'])
const store = useTasksStore()
const categories = store.categories
const selectedCategories = ref([])

let task = reactive<Partial<Task>>({})
if (props.taskId) {
  console.log(props.taskId)
  task = store.task(props.taskId)
  selectedCategories.value = store.taskCategories(task.categories || [])
}

// gestion des catégorie de la tâche
const remove = (id: number) => {
  selectedCategories.value = selectedCategories.value.filter(seletedCategory => seletedCategory.id !== id)
}
watch(selectedCategories, async (newSelections) => {
  task.categories = newSelections.map(selectedCategory => selectedCategory.id)
  emits('TaskUpdated', task)
})
</script>

<template>
  <div class="p-6">
    <!-- Par soucis de temps il n'y aura pas de validation de formulaire à partir d'un schema mais simplement à partir du type Task -->
    <!-- Titre -->
    <UFormGroup
      label="Titre de la tâche"
      class="mt-10"
    >
      <UInput
        v-model="task.title"
        :disabled="disabled"
        placeholder="..."
        @input="emits('TaskUpdated', task)"
      />
    </UFormGroup>

    <!-- Description -->
    <UFormGroup
      label="Description"
      class="mt-10"
    >
      <UTextarea
        v-model="task.description"
        :disabled="disabled"
        placeholder="..."
        @input="emits('TaskUpdated', task)"
      />
    </UFormGroup>

    <!-- Catégories -->
    <UFormGroup
      label="Catégorie(s)"
      class="mt-10"
    >
      <USelectMenu
        v-if="!disabled"
        v-model="selectedCategories"
        :options="categories"
        multiple
        placeholder="Choix multiple..."
        option-attribute="name"
      />
    </UFormGroup>
    <div class="w-full flex gap-2 flex-wrap mt-5">
      <UBadge
        v-for="category in selectedCategories"
        variant="subtle"
        :color="category.color != 'brown' ? (category.color || 'blue') : 'blue'"
        :ui="{ rounded: 'rounded-full' }"
      >
        <div
          class="flex gap-1 items-center"
          :class="!disabled ? 'cursor-pointer' : null"
          @click="!disabled ? remove(category.id) : null"
        >
          <span>{{ category.name }}</span>
          <UIcon
            v-if="!disabled"
            name="i-bx-x"
          />
        </div>
      </UBadge>
    </div>
  </div>
</template>

<style scoped>

</style>
