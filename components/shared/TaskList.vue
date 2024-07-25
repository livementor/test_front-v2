<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="flex flex-col gap-3 border-b pb-3"
    >
      <div class="flex flex-row justify-between items-center">
        <div>
          <p class="text-xl font-bold">{{ task.title }}</p>
          <p class="text-sm text-gray-600">{{ task.description }}</p>
          <div class="flex flex-row gap-1 flex-wrap">
            <Badge
              v-for="category in task.categories"
              :key="category"
              class="flex flex-row gap-1 items-center mt-3"
            >
              {{ category }}
            </Badge>
          </div>
        </div>
        <div class="flex flex-row gap-3 items-center">
          <Button
            :variant="task.completed ? 'outline' : 'success'"
            size="xs"
            @click="$emit('toggle', task)"
          >
            {{ task.completed ? "Mark as incomplete" : "Mark as complete" }}
          </Button>
          <Button
            size="xs"
            @click="$emit('delete', task)"
            variant="destructive"
          >
            Delete
          </Button>
          <Button size="xs" @click="$emit('edit', task)"> Edit </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Task } from "~/types/Task";

defineProps<{
  tasks: Task[];
}>();

const emits = defineEmits(["toggle", "delete", "edit"]);
</script>
