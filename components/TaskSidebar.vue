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

        <div class="grid grid-cols-4 gap-2 mb-8">
          <button
            v-for="category in categories"
            :key="category.id"
            class="w-full h-8 flex items-center justify-center rounded-lg shadow-md focus:outline-none text-gray-700 text-center"
            :class="{ 'border-2 border-gray-400': selectedCategory === category.id }"
            :style="{ backgroundColor: category.color }"
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
.slide-enter-active {
  animation: slide-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), fade-in 0.3s ease-in-out;
}

.slide-leave-active {
  animation: slide-out 0.4s ease-in-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(-50px) scale(0.95);
  }
  to {
    transform: translateX(0) scale(1);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateX(-50px) scale(0.98);
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.task-panel {
  position: absolute;
  top: 70px;
  left: 10px;
  width: 95%;
  max-width: 500px;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.task-panel:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}
</style>
