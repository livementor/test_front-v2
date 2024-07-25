<template>
  <div class="max-w-screen-md mx-auto p-5">
    <div class="text-3xl font-bold mb-3">Todo List</div>
    <div class="flex flex-col gap-5">
      <TaskForm
        v-model:title="newTaskTitle"
        v-model:description="newTaskDescription"
        v-model:categories="newTaskCategories"
        @submit="addTask"
      />
      <Separator v-if="tasksStore.tasks.length" />
      <TaskList
        :tasks="tasksStore.tasks"
        @toggle="toggleTask"
        @delete="deleteTask"
        @edit="openEditDialog"
      />
    </div>
    <EditTaskDialog
      v-if="isEditDialogOpen && editingTask"
      :task="editingTask"
      @close="closeEditDialog"
      @save="saveEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useApi } from "~/composables/useApi.composable";
import { useTasksStore } from "~/stores/tasks";
import TaskForm from "@/components/shared/TaskForm.vue";
import TaskList from "@/components/shared/TaskList.vue";
import EditTaskDialog from "@/components/shared/EditTaskDialog.vue";
import { Separator } from "@/components/ui/separator";
import type { Task } from "~/types/Task";

const api = useApi();
const tasksStore = useTasksStore();

const newTaskTitle = ref("");
const newTaskDescription = ref("");
const newTaskCategories = ref("");

const isEditDialogOpen = ref(false);
const editingTaskId = ref<number | null>(null);

const editingTask = computed(() =>
  tasksStore.tasks.find((task) => task.id === editingTaskId.value)
);

const addTask = async () => {
  if (
    newTaskTitle.value.trim() &&
    newTaskDescription.value.trim() &&
    newTaskCategories.value.trim()
  ) {
    const task = await api.task.post({
      title: newTaskTitle.value,
      description: newTaskDescription.value,
      completed: false,
      createdAt: new Date(),
      categories: newTaskCategories.value.split(",").map((cat) => cat.trim()),
    });

    tasksStore.addTask(task);

    newTaskTitle.value = "";
    newTaskDescription.value = "";
    newTaskCategories.value = "";
  }
};

const deleteTask = async (task: Task) => {
  await api.task.delete(task.id);
  tasksStore.deleteTask(task);
};

const toggleTask = async (task: Task) => {
  const updatedTask = { ...task, completed: !task.completed };
  await api.task.put(updatedTask);
  tasksStore.editTask(updatedTask);
};

const openEditDialog = (task: Task) => {
  editingTaskId.value = task.id;
  isEditDialogOpen.value = true;
};

const closeEditDialog = () => {
  isEditDialogOpen.value = false;
  editingTaskId.value = null;
};

const saveEdit = async (updatedTask: Task) => {
  await api.task.put(updatedTask);
  tasksStore.editTask(updatedTask);
  closeEditDialog();
};
</script>
