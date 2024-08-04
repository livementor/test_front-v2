<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "./BaseButton.vue";
import TaskRow from "./TaskRow.vue";
import type { Task } from "~/types/Task";

const tasksStore = useTasksStore();
const api = useApi();
const newTask = ref<Task | null>(null);

useAsyncData(
    "tasks",
    async ()=>{
        const tasks = await api.task.getAll();
        tasksStore.tasks = tasks;
        return tasks;
    },
);

const onNewTaskButtonClick = ()=>{
    const newT:Task = {
        id: -1,
        title: "",
        completed: false,
        createdAt: new Date(),
        categories: [],
    };
    newTask.value = newT;
};

const onNewTaskUpdate = ()=>{
    newTask.value = null;
    document.querySelector("html")?.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
    });
};
</script>

<template>
    <div class="task-list">
        <h1>Tasks list</h1>
        <BaseButton
            v-if="newTask === null"
            class="task-list__new-button"
            label="Add a new task"
            :show-label="true"
            @click="onNewTaskButtonClick"
        >
            <FontAwesomeIcon :icon="faPlus" />
        </BaseButton>
        <TaskRow
            v-if="newTask"
            :task="newTask"
            :on-new-task-update="onNewTaskUpdate"
        />
        <div class="task-list__rows">
            <TaskRow
                v-for="task in tasksStore.tasks"
                :key="task.id"
                :task="task"
            />
        </div>
    </div>
</template>

<style scoped>
    .task-list__new-button {
        margin: auto;
    }

    .task-list__rows {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
