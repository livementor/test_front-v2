<template>
    <div
        class="border-r border-neutral-light col-start-2 col-span-1 px-5 py-4 grid grid-rows-[auto_1fr] grid-cols-1 w-full h-full">
        <CreateModal :isOpen="isOpen" @closeModal="isOpen = !isOpen" />
        <div class="row-start-1 row-span-1">
            <div class="w-full flex items-center gap-x-5 mb-5">
                <font-awesome-icon icon="fa-solid fa-list" />
                <h1 class="text-3xl font-bold">{{ categoriesStore.currentCategory.name }}</h1>
            </div>
            <button class="px-10 py-4 bg-primary rounded-lg hover:opacity-90" @click="isOpen = !isOpen">+ Nouvelle
                tâche</button>
        </div>
        <div class="mt-10 flex flex-col gap-y-4 row-start-2 row-span-2 overflow-y-auto h-full">
            <TodoListElement v-for="t in taskStore.filteredTasksList" :task="t" />
        </div>


    </div>
</template>

<script lang="ts" setup>
const categoriesStore = useCategoriesStore()
const taskStore = useTasksStore()
const isOpen = ref(false)
</script>