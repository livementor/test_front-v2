<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faArrowRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "./BaseButton.vue";
import ConfirmationDialog from "./ConfirmationDialog.vue";
import { useTaskController } from "~/composables/useTaskController.composable";
import type { Task } from "~/types/Task.js";
import Color from "~/types/Color.js";
import { ToastMessageType } from "~/types/ToastMessage";

const props = defineProps<{
    task:Task
    onNewTaskUpdate?:(task:Task | false)=>void
}>();

const tasksStore = useTasksStore();
const taskController = useTaskController();
const toastMessageStore = useToastMessagesStore();

const isTaskCreation = props.task.id === -1;

const editMode = ref(isTaskCreation);
const showLoader = ref(false);
const isCompleted = ref(props.task.completed);
const title = ref(props.task.title);
const description = ref(props.task.description);
const showDeletionConfirmationDialog = ref(false);

const onChangeTaskCheckbox = async (checked:boolean)=>{
    showLoader.value = true;
    const updatedTask = await taskController.toggleTaskCompletion(props.task, checked);
    isCompleted.value = checked;
    tasksStore.updateTask(updatedTask);
    showLoader.value = false;
};

const activeEditMode = ()=>{
    editMode.value = true;
};

const cancelEdition = ()=>{
    title.value = props.task.title;
    description.value = props.task.description;
    editMode.value = false;
    if (isTaskCreation && props.onNewTaskUpdate) {
        props.onNewTaskUpdate(false);
    }
};

const confirmEdition = async ()=>{
    const newTitle = title.value !== props.task.title ? title.value : undefined;
    let newDescription:string | null | undefined = undefined;
    if (description.value !== props.task.description) {
        newDescription = description.value && description.value.length > 0 ? description.value : null;
    }

    if (isTaskCreation && (!newTitle || newTitle.length === 0)) {
        toastMessageStore.addToastMessage("The task title is required", ToastMessageType.alert);
        return;
    }

    showLoader.value = true;
    if (newTitle || newDescription !== undefined) {
        if (isTaskCreation) {
            let newTask = { ...props.task };
            newTask.title = newTitle!;
            newTask.description = newDescription ?? undefined;
            newTask = await taskController.createTask(newTask);
            tasksStore.addTask(newTask);
            if (props.onNewTaskUpdate) {
                props.onNewTaskUpdate(newTask);
            }
        }
        else {
            const newTask = await taskController.editTask(props.task, newTitle, newDescription);
            tasksStore.updateTask(newTask);
        }
    }
    showLoader.value = false;
    editMode.value = false;
};

const onClickDeleteButton = async ()=>{
    showDeletionConfirmationDialog.value = true;
};

const onButtonClickDeleteConfirmationDialog = async (confirmation:boolean)=>{
    showDeletionConfirmationDialog.value = false;
    if (confirmation) {
        try {
            showLoader.value = true;
            await taskController.deleteTask(props.task);
            tasksStore.removeTask(props.task);
        }
        catch (e) {
            toastMessageStore.addToastMessage("An error occured during task deletion", ToastMessageType.error);
            console.error("An error occured during task deletion", e);
            return;
        }
        showLoader.value = false;
    }
};

const classObject = reactive({
    "task-row--edit": editMode,
    "task-row--completed": isCompleted,
});
</script>

<template>
    <BaseCard>
        <div
            class="task-row"
            :class="classObject"
        >
            <div
                v-if="showLoader"
                class="task-row__loader"
            ></div>
            <template v-if="editMode">
                <div class="task-row__edit-indicator">
                    <IconButton
                        label="editModeActive"
                        :non-interactable="true"
                    >
                        <FontAwesomeIcon :icon="faPenToSquare" />
                    </IconButton>
                </div>
                <div class="task-row__title">
                    <input
                        v-model="title"
                        type="text"
                        required
                        placeholder="Task title"
                    >
                </div>
                <div class="task-row__description">
                    <textarea
                        v-model="description"
                        type="text"
                        placeholder="Task description"
                    ></textarea>
                </div>
                <div class="task-row__buttons">
                    <BaseButton
                        label="Cancel"
                        :color="Color.red"
                        @click="cancelEdition"
                    >
                        <FontAwesomeIcon :icon="faArrowRotateLeft" />
                    </BaseButton>
                    <BaseButton
                        label="Confirm"
                        :color="Color.green"
                        @click="confirmEdition"
                    >
                        <FontAwesomeIcon :icon="faCheck" />
                    </BaseButton>
                </div>
            </template>
            <template v-else>
                <div class="task-row__checkbox">
                    <input
                        type="checkbox"
                        :checked="isCompleted"
                        @change="(e:Event) => onChangeTaskCheckbox((e.target as HTMLInputElement).checked)"
                    >
                </div>
                <div class="task-row__title">
                    <span>{{ task.title }}</span>
                </div>
                <div class="task-row__description">
                    <span>{{ task.description ?? "No description" }}</span>
                </div>
                <div class="task-row__buttons">
                    <BaseButton
                        label="Edit task"
                        @click="activeEditMode"
                    >
                        <FontAwesomeIcon :icon="faPenToSquare" />
                    </BaseButton>
                    <BaseButton
                        label="Delete task"
                        :color="Color.red"
                        @click="onClickDeleteButton"
                    >
                        <FontAwesomeIcon :icon="faTrashCan" />
                    </BaseButton>
                </div>
            </template>
            <ConfirmationDialog
                title="Delete task"
                :confirmation-text="'Do you really wish to delete the task &quot;' + props.task.title + '&quot; ?'"
                :open="showDeletionConfirmationDialog"
                :on-button-click="onButtonClickDeleteConfirmationDialog"
            />
        </div>
    </BaseCard>
</template>

<style scoped lang="scss">
    .task-row {
        position: relative;
        display: grid;
        grid-template-columns: min-content 1fr min-content;
        column-gap: 0.5rem;
        overflow: hidden;
    }

    .task-row--completed {
        text-decoration: line-through;
    }

    .task-row__checkbox, .task-row__edit-indicator {
        grid-column: 1;
        grid-row: span 2;
        display: flex;
        align-items: center;
    }
    .task-row__checkbox {
        margin: 0.5rem;

        & input {
            cursor: pointer;
        }
    }

    .task-row__title {
        grid-column: 2;
        grid-row: 1;
        margin-bottom: 0.5rem;
    }

    .task-row__description {
        grid-column: 2;
        grid-row: 2;
    }

    .task-row__title, .task-row__description {
        & input, & textarea {
            width: 100%;
        }
        & textarea {
            min-height: 2rem;
        }
    }

    .task-row__buttons {
        grid-column: 3;
        grid-row: span 2;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .task-row--edit {
        & .task-row__checkbox {
            opacity: 0;
            pointer-events: none;
        }
    }

    .task-row__loader {
        position: absolute;
        background: rgba(255,255,255,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        animation: task-row-loader-anim 1s linear forwards;

        &::before {
            display: block;
            content: "";
            height: 2rem;
            width: 2rem;
            border: 0.5rem solid var(--base-interactive);
            border-top-color: transparent;
            animation: task-row-loader-before-anim 2.5s linear infinite;
            border-radius: 100%;
        }
    }

    @keyframes task-row-loader-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes task-row-loader-before-anim {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
