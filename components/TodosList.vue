<template>
    <div class="border-r border-neutral-light col-start-2 col-span-1 px-5 py-4">
        <CreateModal :isOpen="false"/>
        <div class="w-full flex items-center gap-x-5 mb-5">
            <font-awesome-icon icon="fa-solid fa-list" />
            <h1 class="text-3xl font-bold">Tous</h1>
        </div>
        <button class="px-10 py-4 bg-primary rounded-lg hover:opacity-90">+ Nouvelle tâche</button>

        <div class="mt-10">
            <div class="flex px-5 py-4 border border-neutral-l rounded-xl max-w-xl justify-between items-center">
                <div class="flex gap-x-4 flex-grow">
                    <input class="hover:cursor-pointer" type="checkbox" />
                    <span>Commencer à apprendre à conduire</span>
                </div>
                <div class="flex gap-x-4">
                    <button><font-awesome-icon icon="fa-solid fa-edit" /></button>
                    <button> <font-awesome-icon class="text-danger" icon="fa-solid fa-trash" /></button>
                </div>
            </div>
        </div>


    </div>
</template>

<script lang="ts" setup>
</script>