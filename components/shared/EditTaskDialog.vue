<template>
  <Dialog :open="true" @update:open="close">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription
          >Edit the task title, description, and categories.</DialogDescription
        >
      </DialogHeader>
      <div class="flex flex-col gap-3">
        <Input type="text" v-model="taskTitle" placeholder="Edit title..." />
        <Textarea v-model="taskDescription" placeholder="Edit description..." />
        <Input
          type="text"
          v-model="taskCategories"
          placeholder="Edit categories (comma separated)..."
        />
      </div>
      <DialogFooter>
        <Button @click="save">Save</Button>
        <Button variant="outline" @click="close">Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Task } from "~/types/Task";

const props = defineProps<{
  task: Task;
}>();

const emits = defineEmits(["close", "save"]);

const taskTitle = ref(props.task.title);
const taskDescription = ref(props.task.description || "");
const taskCategories = ref(props.task.categories.join(", "));

watch(
  () => props.task,
  (newTask) => {
    taskTitle.value = newTask.title;
    taskDescription.value = newTask.description || "";
    taskCategories.value = newTask.categories.join(", ");
  }
);

const save = () => {
  const updatedTask = {
    ...props.task,
    title: taskTitle.value,
    description: taskDescription.value,
    categories: taskCategories.value.split(",").map((cat) => cat.trim()),
  };
  emits("save", updatedTask);
};

const close = () => {
  emits("close");
};
</script>
