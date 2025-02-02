<template>
    <EditModal :isOpen="isEditOpen" :task="task" @closeModal="isEditOpen = !isEditOpen" />
    <div class="flex px-5 py-4 border border-neutral-l rounded-xl max-w-xl justify-between items-center">
        <div class="flex gap-x-4 flex-grow">
            <input class="hover:cursor-pointer w-4" type="checkbox" v-model="task.completed" />
            <div class="flex flex-col">
                <span :class="{ lineThrough: task.completed }">
                    {{ task.title }}
                </span>
                <span :class="{ lineThrough: task.completed }" class="text-sm text-neutral italic">
                    {{ task.description }}
                </span>
            </div>
        </div>
        <div class="flex gap-x-4">
            <button><font-awesome-icon icon="fa-solid fa-edit" @click="isEditOpen = !isEditOpen" /></button>
            <button> <font-awesome-icon class="text-danger" icon="fa-solid fa-trash"
                    @click="() => deleteTask(task.id)" /></button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Task } from '~/types/Task';
import EditModal from './EditModal.vue';

defineProps<{
    task: Task
}>()

const { deleteTask } = useTasksStore()
const isEditOpen = ref(false)

</script>

<style>
.lineThrough {
    text-decoration: line-through;
}
</style>