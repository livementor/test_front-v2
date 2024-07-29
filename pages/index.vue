<template>
  <div class="max-w-screen-lg mx-auto p-5">
    <h1 class="text-3xl font-bold text-center pb-5 border-b">{{ texts.todoList }}</h1>
    <AddTaskForm @add-task="addTask" />
    <SearchBar @update-query="updateQuery" />
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <TaskList
        :title="texts.pendingTasks"
        :tasks="filteredPendingTasks"
        :formatDate="formatDate"
        :toggleComplete="toggleComplete"
        :deleteTask="deleteTask"
        :saveTask="saveTask"
        @update="fetchTasks"
      />
      <TaskList
        :title="texts.completedTasks"
        :tasks="filteredCompletedTasks"
        :formatDate="formatDate"
        :toggleComplete="toggleComplete"
        :deleteTask="deleteTask"
        :saveTask="saveTask"
        @update="fetchTasks"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types/Task';

const { task } = useApi();
const tasks = ref<Task[]>([]);
const searchQuery = ref<string>('');

const texts = {
  todoList: 'To-do List',
  pendingTasks: 'Tâches en cours',
  completedTasks: 'Tâches terminées',
};

const fetchTasks = async () => {
  tasks.value = await task.getAll();
};

const addTask = async (newTask: { title: string; description: string }) => {
  await task.post(newTask);
  await fetchTasks();
};

const formatDate = (date: Date | string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(undefined, options);
};

const deleteTask = async (id: number) => {
  await task.delete(id);
  await fetchTasks();
};

const toggleComplete = async (taskToToggle: Task) => {
  const updatedTask = {
    ...taskToToggle,
    completed: !taskToToggle.completed
  };
  await task.put(updatedTask);
  await fetchTasks();
};

const saveTask = async (taskToSave: Task) => {
  const updatedTask = { ...taskToSave, title: taskToSave.title, description: taskToSave.description };
  await task.put(updatedTask);
  await fetchTasks();
};

const filteredTasks = computed(() => {
  if (!searchQuery.value) {
    return tasks.value;
  }
  const lowercasedQuery = searchQuery.value.toLowerCase();
  return tasks.value.filter(task => 
    task.title.toLowerCase().includes(lowercasedQuery) ||
    task.description?.toLowerCase().includes(lowercasedQuery)
  );
});

const pendingTasks = computed(() => filteredTasks.value.filter(task => !task.completed));
const completedTasks = computed(() => filteredTasks.value.filter(task => task.completed));

const filteredPendingTasks = computed(() => pendingTasks.value);
const filteredCompletedTasks = computed(() => completedTasks.value);

const updateQuery = (query: string) => {
  searchQuery.value = query;
};

onMounted(fetchTasks);
</script>
