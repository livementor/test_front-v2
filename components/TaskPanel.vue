<template>
  <div>
    <button
      class="absolute top-4 left-4 px-4 py-2 text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-100 transition shadow-sm"
      @click="toggleSidebar"
    >
      {{ tasksStore.editingTask ? "Modifier la tâche" : "➕ Ajouter une tâche" }}
    </button>

    <Transition name="slide">
      <div
        v-if="tasksStore.isSidebarOpen"
        class="task-panel z-50"
      >
        <h2 class="text-lg font-semibold text-gray-900 mb-3">
          {{ tasksStore.editingTask ? "Modifier la tâche" : "Nouvelle tâche" }}
        </h2>

        <input
          v-model="title"
          placeholder="Titre (obligatoire)"
          class="w-full p-3 border rounded-lg shadow-sm bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-500 mb-2"
          :class="{ 'border-red-500': titleError }"
        >
        <p
          v-if="titleError"
          class="text-red-500 text-sm mt-1"
        >
          Le titre est obligatoire.
        </p>

        <textarea
          v-model="description"
          placeholder="Description"
          class="w-full p-3 border rounded-lg shadow-sm bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-500 mb-2"
        />

        <h3 class="text-md font-semibold text-gray-900 mb-2">
          Catégorie correspondante :
        </h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category.id"
            class="px-3 py-2 rounded-lg shadow-md font-semibold focus:outline-none"
            :class="{ 'border-2 border-gray-400': selectedCategory === category.id }"
            :style="{ backgroundColor: category.color, color: 'white' }"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>

        <div class="flex justify-between mt-4">
          <button
            class="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
            @click="cancelEdit"
          >
            Annuler
          </button>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            :disabled="!title.trim()"
            :class="{ 'opacity-50 cursor-not-allowed': !title.trim() }"
            @click="saveTask"
          >
            {{ tasksStore.editingTask ? "Enregistrer" : "Ajouter" }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import { useApi } from '~/composables/useApi.composable'

const title = ref('')
const description = ref('')
const selectedCategory = ref<number | undefined>(undefined)
const categories = ref<{ id: number, name: string, color: string }[]>([])
const titleError = ref(false)

const tasksStore = useTasksStore()
const api = useApi()

const fetchCategories = async () => {
  categories.value = (await api.categories.getAll()).map(category => ({
    id: category.id,
    name: category.name,
    color: category.color ?? '#D3D3D3',
  }))
}

const selectCategory = (categoryId: number) => {
  selectedCategory.value = selectedCategory.value === categoryId ? undefined : categoryId
}

const saveTask = () => {
  if (!title.value.trim()) {
    titleError.value = true
    return
  }
  if (tasksStore.editingTask) {
    tasksStore.updateTask(tasksStore.editingTask.id, {
      title: title.value.trim(),
      description: description.value.trim(),
      category: selectedCategory.value,
    })
  }
  else {
    tasksStore.addTask({
      title: title.value.trim(),
      description: description.value.trim(),
      completed: false,
      category: selectedCategory.value,
    })
  }

  closeSidebar()
}

const toggleSidebar = () => {
  tasksStore.isSidebarOpen = !tasksStore.isSidebarOpen
  if (!tasksStore.isSidebarOpen) {
    resetForm()
  }
}

const closeSidebar = () => {
  tasksStore.isSidebarOpen = false
  resetForm()
}

const cancelEdit = () => {
  closeSidebar()
}

const resetForm = () => {
  title.value = ''
  description.value = ''
  selectedCategory.value = undefined
  tasksStore.setEditingTask(null)
}

watch(() => tasksStore.editingTask, (task) => {
  if (task) {
    title.value = task.title
    description.value = task.description || ''
    selectedCategory.value = task.category
    tasksStore.isSidebarOpen = true
  }
})

onMounted(fetchCategories)
</script>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.2s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.task-panel {
  position: absolute;
  top: 70px;
  left: 10px;
  width: 95%;
  max-width: 500px;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .task-panel {
    width: 90%;
    max-width: 400px;
    top: 15%;
    left: 10px;
  }
}
</style>
