<template>
    <div class="border-r border-neutral-light col-start-1 col-span-1 flex flex-col pt-5 px-2 h-full">
        <div class="group flex items-center rounded px-2 py-3 hover:bg-primary hover:cursor-pointer" :key="-1"
            @click="() => updateFilter(-1)">
            <div class="w-[5px] h-full bg-primary rounded-sm mr-2 group-hover:hidden"></div>
            <span>{{ categoriesStore.$state.nameForAll }}</span>
        </div>
        <div v-for="c in categoriesStore.categoriesList" :key="c.id" @click="() => updateFilter(c.id)"
            class="group flex items-center rounded px-2 py-3 hover:bg-primary hover:cursor-pointer">
            <div class="w-[5px] h-full rounded-sm mr-2 group-hover:hidden" :style="{ backgroundColor: c.color }" ></div>
            <span>{{ c.name }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
const categoriesStore = useCategoriesStore()
const { updateFilter } = useTasksStore()
</script>