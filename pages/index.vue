<template>
  <div class="max-w-screen-md mx-auto p-5">
    <div class="text-3xl font-bold mb-3">
      Todo List
    </div>
    <NuxtLink to="/add">
      <button
        class="hover:bg-indigo-600 bg-white text-indigo-600 font-semibold hover:text-white py-2 px-4 border rounded-md"
      >
        Ajouter une tâche
      </button>
    </NuxtLink>
    <FormSelect
      class="mt-5"
      name="filterStatus"
      :model-value="statusOptions[0].value"
      :options="statusOptions"
      @update:model-value="filter"
    />
    <ListTable
      :tasks="tasks"
      @delete-task="deleteTask"
      @update-task="updateTask"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../types/Task'
import type { Category } from '../types/Category'
import type { Status } from '../types/Status'

const api = useApi()

const statusOptions: Status[] = [
  { label: 'Tout', value: 'tout' },
  { label: 'À faire', value: 'à faire' },
  { label: 'Fait', value: 'fait' },
]
const categories = ref<Category[]>([])
const tasks = ref<Task[]>([])

const deleteTask = (task: Task) => {
  api.task.delete(task.id)
  tasks.value = tasks.value.filter(oneTask => oneTask.id !== task.id)
}
const updateTask = (id: number) => {
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed }
    }
    api.task.put(task)
    return task
  })
}
const fetchCategories = async () => {
  try {
    categories.value = await api.categories.get()
  }
  catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const fetchTasks = async (status: string) => {
  try {
    tasks.value = await api.task.getAll()
    if (status !== 'tout') {
      tasks.value = tasks.value.filter(task => task.completed === (status === 'fait'))
    }
    else {
      tasks.value.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1)
    }
  }
  catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

const filter = (status: string) => {
  fetchTasks(status)
}

onMounted(() => {
  fetchCategories()
  fetchTasks('tout')
})
</script>
