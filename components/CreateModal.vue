<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md min-w-[400px]">
            <h1 class="text-lg font-bold mb-4">Créer une nouvelle tâche</h1>
            <div class="flex flex-col w-full gap-y-6">
                <div class="flex flex-col">
                    <label class="mb-1 text-gray-700 font-medium">Titre</label>
                    <input type="text" placeholder="titre"
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                </div>
                <div class="flex flex-col">
                    <label class="mb-1 text-gray-700 font-medium">Description</label>
                    <textarea placeholder="description"
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />

                </div>
                <select
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    <option>Catégorie 1</option>
                    <option>Catégorie 2</option>
                </select>
            </div>
            <div class="flex gap-x-10 justify-center mt-10">
                <button class="mt-4 px-4 py-2 bg-primary rounded hover:opacity-90">Créer</button>
                <button @click="closeModal"
                    class="mt-4 px-4 py-2 bg-danger text-white rounded hover:opacity-90">Fermer</button>
            </div>

        </div>
    </div>
</template>

<script setup>
defineProps(["isOpen"]);
const emit = defineEmits(["close"]);

const closeModal = () => {
    emit("close");
};
</script>