<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form @submit.prevent=handleSubmit class="bg-white p-6 rounded-lg shadow-lg max-w-md min-w-[400px]">
            <h1 class="text-lg font-bold mb-4">Créer une nouvelle tâche</h1>
            <div class="flex flex-col w-full gap-y-6">
                <div class="flex flex-col">
                    <label class="mb-1 text-gray-700 font-medium">Titre</label>
                    <input type="text" placeholder="titre" v-model="title"
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                </div>
                <div class="flex flex-col">
                    <label class="mb-1 text-gray-700 font-medium">Description</label>
                    <textarea placeholder="description" v-model="description"
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                </div>

                <div class="flex flex-col">
                    <label class="text-gray-700 font-medium mb-1">Choisir une / plusieurs catégories</label>
                    <div class="max-h-[200px] overflow-y-auto py-3 flex flex-col gap-y-2">
                        <div v-for="c in categoryStore.categoriesList" class="flex items-center gap-x-5 ">
                            <input type="checkbox" :id="c.id.toString()" :value="c.id" v-model="categories"
                                class="form-checkbox text-blue-500 hover:cursor-pointer">
                            <label :for="c.id.toString()" class="mr-2 hover:cursor-pointer">{{ c.name }}</label>
                        </div>
                    </div>
                </div>


            </div>
            <div class="flex gap-x-10 justify-center mt-10">
                <button class="mt-4 px-4 py-2 bg-primary rounded hover:opacity-90">Modifier</button>
                <button @click="emit('closeModal')"
                    class="mt-4 px-4 py-2 bg-danger text-white rounded hover:opacity-90">Fermer</button>
            </div>

        </form>
    </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types/Task";

const props = defineProps<{ isOpen: boolean, task: Task }>();

const emit = defineEmits<{
    (e: "closeModal"): void;
}>();

const tasksStore = useTasksStore()
const categoryStore = useCategoriesStore()

const title = ref<string>(props.task.title)
const description = ref<string>(props.task.description ?? "")
const categories = ref<number[]>(props.task.categories)

const handleSubmit = async () => {
    //todo validation (using zod for instance)
    const content = {
        title: title.value,
        description: description.value,
        categories: categories.value,
    }
    await tasksStore.updateTask(props.task.id, content)
    emit("closeModal")
    //todo catch errors
}
</script>
