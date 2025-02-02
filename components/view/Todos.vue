<template>
    <div class="w-full h-full grid grid-cols-[300px_1fr]">
        <CategoriesList v-if="categoriesList.length" />
        <TodosList v-if="tasksList.length" />
    </div>
</template>

<script lang="ts" setup>
const { categoriesList, fetchCategories } = useCategoriesStore()
const { tasksList, fetchTasks } = useTasksStore()

await fetchTasks();
await fetchCategories();

</script>